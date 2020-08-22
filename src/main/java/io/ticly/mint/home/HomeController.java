package io.ticly.mint.home;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;

@Controller
@SessionAttributes("userInfo")
public class HomeController {

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
            int auth = 1;
            List<String> categories = null;
            MemberDTO user = new MemberDTO(auth, categories);
            model.addAttribute("userInfo", user);

            path = "redirect:/articleBoard/category";
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
                if(user.getCategories() == null) {
                    path = "redirect:/articleBoard/category";
                }

                // 카테고리를 선택했다면,
                else {
                    path = "redirect:/articleBoard/findArticle";
                }
            }
        }
        return path;
    }

    @RequestMapping(value = "/service")
    public String showInfo(Model model) {
        return "intro/serviceInfo";
    }
}
