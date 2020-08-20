package io.ticly.mint.articleBoard;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.HashtagDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import io.ticly.mint.member.service.MemberService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.List;

@Controller
@SessionAttributes("userInfo")
@RequestMapping(value="/articleBoard/*")
public class ArticleBoardController {

    private ArticleBoardService articleBoardService;
    private MemberService memberService;

    public ArticleBoardController(ArticleBoardService articleBoardService, MemberService memberService) {
        this.articleBoardService = articleBoardService;
        this.memberService = memberService;
    }

    // TODO 관심 분야 페이지로 단순 이동
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
    public String choiceDone(Model model, HttpServletRequest req) throws SQLException {
        // 사용자의 권한과 관심 분야 세션에 등록하기
        MemberDTO dto = new MemberDTO();

        //로그인 하지 않은 회원인 경우
        if(((MemberDTO)model.getAttribute("userInfo")).getEmail()==null){
            List<String> categories = articleBoardService.getCategoriesAtParameter(model, req); //관심분야 카테고리
            int auth = ((MemberDTO)model.getAttribute("userInfo")).getAuth();//권한

            //dto에 저장
            dto = new MemberDTO(auth, categories);
        }

        //로그인한 회원인 경우
        else{
            String email = ((MemberDTO)model.getAttribute("userInfo")).getEmail(); //이메일
            String nickname = ((MemberDTO)model.getAttribute("userInfo")).getNickname();//닉네임
            List<String> categories = articleBoardService.getCategoriesAtParameter(model, req); //관심분야 카테고리
            int auth = ((MemberDTO)model.getAttribute("userInfo")).getAuth(); //권한

            //dto에 저장
            dto = new MemberDTO(email, nickname, auth, categories);

            //로그인한 사용자가 선택한 카테고리 정보를 DB에 저장
            memberService.saveUserCategories(email,categories);
        }

        //세션 정보 등록
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

        // 사용자가 입력한 검색어를 만족하는 아티클을 불러와서 리스트에 담기
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        String searchKeyword = req.getParameter("searchKeyword");
        List<ArticleInfoDTO> searchResultArticleList = articleBoardService.findArticleBySearch(categories, searchKeyword);

        return searchResultArticleList;
    }

    //  검색 결과가 0개일 경우 추천 해시태그 노출을 위한 동적 데이터 처리
    @GetMapping("getHashTag")
    @ResponseBody
    public List<HashtagDTO> getHashtagInfo(Model model, HttpServletRequest req){
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        List<HashtagDTO> hashTagList = articleBoardService.getHashtagInfo(categories);

        return hashTagList;
    }
}
