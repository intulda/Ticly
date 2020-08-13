package io.ticly.mint.articleBoard;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

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
        }
        return "articleBoard/findArticle";
    }

    // 관심 분야 선택 완료 후 세션 처리 및 이동
    @GetMapping("choiceDone")
    public String choiceDone(Model model, HttpServletRequest req){
        String[] categoriesStr = req.getParameterValues("categories");

        // 사용자의 권한과 관심 분야 세션에 등록하기
        int auth = ((MemberDTO)model.getAttribute("userInfo")).getAuth();
        List<String> categories = new ArrayList<String>();
        for(String key : categoriesStr) {
            categories.add(key);
        }
        MemberDTO dto = new MemberDTO(auth, categories);
        model.addAttribute("userInfo", dto);

        //세션에서 관심 분야 데이터 불러와 아티클 정보를 얻어서 리스트에 담기
        categories = ((MemberDTO)model.getAttribute("userInfo")).getCategories();
        List<ArticleInfoDTO> list = articleBoardService.findMyTypeArticle(categories);

        model.addAttribute("articleList", list);
        return "articleBoard/findArticle";
    }


}
