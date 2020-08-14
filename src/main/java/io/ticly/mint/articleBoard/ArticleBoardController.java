package io.ticly.mint.articleBoard;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
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

    // 이미 관심 분야를 선택했다면, 아티클 찾기 페이지로 단순 이동
    @GetMapping(value ="findArticle")
    public String goToFindArticlePage(Model model){
        MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
        if(user.getCategories() != null) {
            List<String> categories = user.getCategories();

            // 관심 분야 데이터를 기반으로 아티클 불러와서 리스트에 담기
            List<ArticleInfoDTO> list = articleBoardService.findMyTypeArticle(categories);
            model.addAttribute("articleList", list);
            model.addAttribute("userInfo", user);
        }
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

        //세션에서 관심 분야 데이터 불러와 아티클 정보를 얻어서 리스트에 담기
        categories = ((MemberDTO)model.getAttribute("userInfo")).getCategories();
        List<ArticleInfoDTO> list = articleBoardService.findMyTypeArticle(categories);

        model.addAttribute("articleList", list);
        return "articleBoard/findArticle";
    }

    // 아티클 찾기 페이지에서 관심 분야 탭 버튼을 누를 때 처
    @GetMapping("categoryTabEvent")
    @ResponseBody
    public List<ArticleInfoDTO> getArticleInfo(Model model, HttpServletRequest req){
        //  찾는 categories에 맞는 아티클 정보를 받아서 리스트에 넣어준다.
        System.out.println("categoryTabEvent까지 왔어");
        List<String> categories = articleBoardService.getCategoriesAtParameter(model, req);
        System.out.println("categories에 담았어");
        List<ArticleInfoDTO> list = articleBoardService.findMyTypeArticle(categories);
        System.out.println("list에 담았어");

        return list;
    }
}
