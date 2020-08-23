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
        MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
        model.addAttribute("userInfo", user);
        return "dashboard/my";
    }

    // 학습중인 아티클 정보 가져오는 비동기 처리
    @GetMapping(value = "getMyArticleListInfo")
    @ResponseBody
    public List<UserArticleInfoDTO> getMyArticleListInfo(Model model, HttpServletRequest req){
        String email = req.getParameter("email");
        List<UserArticleInfoDTO> getMyArticleListInfo = dashboardService.getMyArticleListInfo(email);
        return getMyArticleListInfo;
    }

    // [삭제하기]버튼 클릭시 사용자의 [학습하기] 내역 삭제하기
    @GetMapping(value = "deleteUserLearningInfo")
    public String deleteUserLearningInfo(Model model, HttpServletRequest req){
        int seq = Integer.parseInt(req.getParameter("seq"));
        dashboardService.deleteUserLearningInfo(seq);
        return "dashboard/my";
    }
}
