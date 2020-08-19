package io.ticly.mint.dashboard;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.dashboard.model.dto.UserArticleInfoDTO;
import io.ticly.mint.dashboard.model.service.DashboardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@SessionAttributes("userInfo")
@RequestMapping(value="/dashboard/*")
public class DashboardController {

    private DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // 내 학습 보드로 단순 이동
    @GetMapping(value ="my")
    public String goToCategoryPage(Model model){
//        List<String> titleList = dashboardService.getTitle();
//        model.addAttribute("titleList", titleList);

        // 테스트용으로 사용자 정보 세션에 저장
        int auth = 3;
        List<String> categories = new ArrayList<>();
        categories.add("디자인");
        categories.add("개발");
        String email = "test4@naver.com";
        MemberDTO dto = new MemberDTO(auth, categories, email);
        model.addAttribute("userInfo", dto);

        return "dashboard/my";
    }

    @GetMapping(value = "getLastLearningArticleInfo")
    @ResponseBody
    public UserArticleInfoDTO getLastLearningArticleInfo(Model model, HttpServletRequest req){
        String email = req.getParameter("email");
        UserArticleInfoDTO lastLearningArticleInfo = dashboardService.getLastLearningArticleInfo(email);
        System.out.println(lastLearningArticleInfo.getArticle_seq() + "\n" +
                        lastLearningArticleInfo.getLast_learning_content() + "\n" +
                        lastLearningArticleInfo.getUrl() + "\n" +
                        lastLearningArticleInfo.getTitle() + "\n" +
                        lastLearningArticleInfo.getLast_learning_date()
                );
        return lastLearningArticleInfo;
    }
}
