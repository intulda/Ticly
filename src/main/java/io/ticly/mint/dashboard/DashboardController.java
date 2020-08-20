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

     // 마지막으로 학습한 아티클 정보 가져오는 비동기 처리
    @GetMapping(value = "getLastLearningArticleInfo")
    @ResponseBody
    public UserArticleInfoDTO getLastLearningArticleInfo(Model model, HttpServletRequest req){
        String email = req.getParameter("email");
        UserArticleInfoDTO lastLearningArticleInfo = dashboardService.getLastLearningArticleInfo(email);
        return lastLearningArticleInfo;
    }

    // 학습중인 아티클 정보 가져오는 비동기 처리
    @GetMapping(value = "getLearningListInfo")
    @ResponseBody
    public List<UserArticleInfoDTO> getLearningListInfo(Model model, HttpServletRequest req){
        String email = req.getParameter("email");
        List<UserArticleInfoDTO> getLearningListInfo = dashboardService.getLearningListInfo(email);
        return getLearningListInfo;
    }
}