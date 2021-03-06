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

        if(user == null) {
            return "redirect:/member/login";
        }

        if(user != null) {
            if(user.getEmail() == null) {
                return "redirect:/member/login";
            }
        }

        return "dashboard/my";
    }

    // 학습중인 아티클 정보 가져오는 비동기 처리
    @GetMapping(value = "getMyArticleListInfo")
    @ResponseBody
    public List<UserArticleInfoDTO> getMyArticleListInfo(Model model){
//        String email = req.getParameter("email");
        String email = ((MemberDTO)model.getAttribute("userInfo")).getEmail();
        List<UserArticleInfoDTO> getMyArticleListInfo = dashboardService.getMyArticleListInfo(email);
        return getMyArticleListInfo;
    }

    // [숨김]버튼 클릭시 사용자의 활성화 상태 비활성화하기
    @GetMapping(value = "updateUserArticleShow")
    @ResponseBody
    public List<UserArticleInfoDTO> updateUserArticleShow(Model model, HttpServletRequest req){
        String seq = req.getParameter("seq");
        String showState = req.getParameter("showState");
        String email = ((MemberDTO)model.getAttribute("userInfo")).getEmail();
        dashboardService.updateUserArticleShow(seq, showState, email);

        List<UserArticleInfoDTO> getMyArticleListInfo = dashboardService.getMyArticleListInfo(email);
        return getMyArticleListInfo;
    }
}
