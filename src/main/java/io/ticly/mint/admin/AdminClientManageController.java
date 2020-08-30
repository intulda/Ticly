package io.ticly.mint.admin;

import io.ticly.mint.admin.model.dto.AdminClientManageDTO;
import io.ticly.mint.admin.model.dto.MemberSearchInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.mypage.model.dto.MyPageDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.List;


@Controller
@RequestMapping(value = "/admin/*")
public class AdminClientManageController {

    private io.ticly.mint.admin.model.service.AdminClientManageService adminClientManageService;

    public AdminClientManageController(io.ticly.mint.admin.model.service.AdminClientManageService adminClientManageService) {

        this.adminClientManageService = adminClientManageService;
    }

    /**
     * 마이페이지로 이동
     *
     * @return
     */
    @GetMapping("clientmanage")
    public String showMyPage() {
        return "admin/adminClientManage";
    }

    /**
     * 검색하기 버튼 클릭 후 출력
     * @return adminClientManageDTO
     */
    @PostMapping("clientSearchButton")
    @ResponseBody
    public List<AdminClientManageDTO> buttonClientSearch() {
        return adminClientManageService.buttonClientSearch();
    }


    /**
     *
     * @return
     */
    @GetMapping("findMemberBySearch")
    @ResponseBody
    public List<AdminClientManageDTO> findArticleBySearch(MemberSearchInfoDTO memberSearchInfoDTO) {
        //검색 결과 호출
        List<AdminClientManageDTO> searchResultMember = adminClientManageService.findMemberBySearch(memberSearchInfoDTO);

        return searchResultMember;
    }
}
