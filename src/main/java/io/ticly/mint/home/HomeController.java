package io.ticly.mint.home;

import io.ticly.mint.articleBoard.model.dao.ArticleBoardDAO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import io.ticly.mint.member.service.MemberService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;

@Controller
@SessionAttributes("userInfo")
public class HomeController {

    private ArticleBoardService articleBoardService;
    public HomeController(ArticleBoardService articleBoardService, MemberService memberService) {
        this.articleBoardService = articleBoardService;
    }

    /**
     * 사이트 진입시 세션을 확인해 이동시키는 메소드 
     * @param model 세션 활용을 위한 모델
     * @return path 이동경로
     */
    @RequestMapping(value = "/")
    public String home(Model model) {
        String path = "";

        // 세션이 비어있다면, Guest 등록
        if(model.getAttribute("userInfo") == null) {
            MemberDTO user = new MemberDTO();
            user = articleBoardService.setMember(user);
            model.addAttribute("userInfo", user);

            path = "redirect:/articleBoard/findArticle";
        }

        // 세션이 등록되어 있을 경우
        else {
            // Member일 경우
            MemberDTO user = (MemberDTO)model.getAttribute("userInfo");
            if(user.getAuth() != 1) {
                //test code
                System.out.println("이미 등록된 Member다!");
                path = "redirect:/articleBoard/findArticle";
            }

            // 한 번 이상 방문한 Guest일 경우
            else {
                // 카테고리를 선택하지 않았다면,
                    System.out.println("이미 등록된 Guest다!");
                    path = "redirect:/articleBoard/findArticle";
            }
        }
        return path;
    }

    /**
     * 서비스 소개로 이동
     * @param model
     * @return
     */
    @RequestMapping(value = "/service")
    public String showInfo(Model model) {
        return "intro/serviceInfo";
    }

    /**
     * 학습완료 뷰이동(테스트)
     * @return
     */
    @RequestMapping(value = "/complete")
    public String showlearningComplete(){
        return "learn/learningComplete";
    }

    /**
     * 학습하기 네이동(테스트)
     * @return
     */
    @RequestMapping(value = "/learningNav")
    public String showNav(){
        return "learn/learningNav";
    }
}
