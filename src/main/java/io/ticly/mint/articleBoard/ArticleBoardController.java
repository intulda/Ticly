package io.ticly.mint.articleBoard;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@SessionAttributes("userInfo")
@RequestMapping(value="/articleBoard/*")
public class ArticleBoardController {

    private ArticleBoardService articleBoardService;

    public ArticleBoardController(ArticleBoardService articleBoardService) {
        this.articleBoardService = articleBoardService;
    }

    // 관심 분야 페이지로 단순 이동
    @GetMapping(value ="category")
    public String goToCategoryPage(){
        return "articleBoard/category";
    }

    // 이미 관심 분야를 선택했다면, 아티클 찾기 페이지로 이동.
    @GetMapping(value ="findArticle")
    public String goToFindArticlePage(Model model){
        MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
        model.addAttribute("userInfo", user);

        return "articleBoard/findArticle";
    }

    // 관심 분야 선택 완료 후 세션 처리 및 이동
    @GetMapping("choiceDone")
    public String choiceDone(Model model, HttpServletRequest req){
        System.out.println("choiceDone에 왔어");
        // 사용자의 권한과 관심 분야 세션에 등록하기
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        int auth = ((MemberDTO)model.getAttribute("userInfo")).getAuth();
        MemberDTO dto = new MemberDTO(auth, categories);

        model.addAttribute("userInfo", dto);
        return "articleBoard/findArticle";
    }

    // 아티클 찾기 페이지에서 *새로운* 아티클 정보 로드를 위한 동적 데이터 처리
    @GetMapping("getNewArticleInfo")
    @ResponseBody
    public List<ArticleInfoDTO> getNewArticleInfo(Model model, HttpServletRequest req){
        // 관심 분야 데이터를 기반으로 최신 아티클 불러와서 리스트에 담기
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        List<ArticleInfoDTO> newList = articleBoardService.findNewMyTypeArticle(categories);

        return newList;
    }

    // 아티클 찾기 페이지에서 *인기* 아티클 정보 로드를 위한 동적 데이터 처리
    @GetMapping("getPopularArticleInfo")
    @ResponseBody
    public List<ArticleInfoDTO> getPopularArticleInfo(Model model, HttpServletRequest req){
        // 관심 분야 데이터를 기반으로 인기 아티클 불러와서 리스트에 담기
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        List<ArticleInfoDTO> popularList = articleBoardService.findPopularMyTypeArticle(categories);

        return popularList;
    }

    // 검색시 search 페이지로 단순 이동
    @GetMapping("goToSearchPage")
    public String goToSearchPage(Model model, HttpServletRequest req){

        // 키워드 및 사용자 정보 내보내기
        MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
        model.addAttribute("userInfo", user);

        String searchKeyword = req.getParameter("searchKeyword");
        model.addAttribute("searchKeyword", searchKeyword);
        return "articleBoard/searchResult";
    }

    // 검색 페이지에서 검색어를 만족하는 아티클 정보 로드를 위한 동적 데이터 처리
    @GetMapping("findArticleBySearch")
    @ResponseBody
    public List<ArticleInfoDTO> findArticleBySearch(Model model, HttpServletRequest req){
        System.out.println("findArticleBySearch");
        // 사용자가 입력한 검색어를 만족하는 아티클을 불러와서 리스트에 담기
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        String searchKeyword = req.getParameter("searchKeyword");
        List<ArticleInfoDTO> searchResultArticleList = articleBoardService.findArticleBySearch(categories, searchKeyword);

        return searchResultArticleList;
    }
}
