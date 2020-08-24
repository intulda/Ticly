package io.ticly.mint.mypage;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.mypage.model.dto.MyPageDTO;
import io.ticly.mint.mypage.model.service.MyPageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@SessionAttributes("userInfo")
@Controller
public class MyPageController {

    private io.ticly.mint.mypage.model.service.MyPageService mypageService;

    public MyPageController(io.ticly.mint.mypage.model.service.MyPageService mypageService) {

        this.mypageService = mypageService;
    }

    /**
     * 마이페이지로 이동
     * @return
     */
    @GetMapping("/mypage")
    public String showMyPage() {
        return "mypage/myPage";
    }

    /**
     * 닉네임 입력창 경고문 출력
     * @param nickname
     * @return
     */
    @PostMapping("/nicknameChangeInput")
    @ResponseBody
    public int changeNewNickname(@RequestParam("nickname") String nickname, HttpSession session) {
        /* 세션 값 불러오기 */
        MemberDTO memberDTO = (MemberDTO)session.getAttribute("userInfo");

        MyPageDTO myPageDTO = new MyPageDTO();
        myPageDTO.setEmail(memberDTO.getEmail());
        myPageDTO.setNickname(nickname);

        return mypageService.changeNewNickname(myPageDTO);
    }

    /**
     * 현재 비밀번호 입력창 경고문 출력
     * @param password
     * @return
     */
    @PostMapping("/presentPasswordChangeInput")
    @ResponseBody
    public int checkPresentPassword(@RequestParam("password") String password,  HttpSession session) {
        /* 세션 값 불러오기 */
        MemberDTO memberDTO = (MemberDTO)session.getAttribute("userInfo");

        MyPageDTO myPageDTO = new MyPageDTO();
        myPageDTO.setEmail(memberDTO.getEmail());
        myPageDTO.setPassword(password);

        return mypageService.checkPresentPassword(myPageDTO);
    }

    /**
     * 닉네임 변경 버튼 클릭 후 출력
     * @param nickname
     * @return
     */
    @PostMapping("/nicknameChangeButton")
    @ResponseBody
    public int changeButtonNickname(@RequestParam("nickname") String nickname, HttpSession session) {

        // 1단계 EMAIL받아와서 EMAIL같은 멤버 정보 가져와서 담아두기
        // 2단계 담아둔 멤버 정보에서 NICKNAME을 파라미터로받은 nickname으로 바꿔주기
        // 3단계 바꿔주는거 성공했으면 return 1 아니면 0 해서 프론트단에서 alert띄워주기

        /* 세션 값 불러오기 */
        MemberDTO memberDTO = (MemberDTO)session.getAttribute("userInfo");

        MyPageDTO myPageDTO = new MyPageDTO();
        myPageDTO.setEmail(memberDTO.getEmail());
        myPageDTO.setNickname(nickname);
        memberDTO.setNickname(nickname);

        session.setAttribute("userInfo", memberDTO);

        return mypageService.changeButtonNickname(myPageDTO);
    }

    /**
     * 비밀번호 변경 버튼 클릭 후 출력
     * @param password
     * @return
     */
    @PostMapping("/passwordChangeButton")
    @ResponseBody
    public int changeButtonPassword(@RequestParam("password") String password, HttpSession session) {
        /* 세션 값 불러오기 */
        MemberDTO memberDTO = (MemberDTO)session.getAttribute("userInfo");

        MyPageDTO myPageDTO = new MyPageDTO();
        myPageDTO.setEmail(memberDTO.getEmail());
        myPageDTO.setPassword(password);

        return mypageService.changeButtonPassword(myPageDTO);
    }

    /**
     * 탈퇴하기 버튼 클릭 후 출력
     * @return
     */
    @PostMapping("/withdrawalButton")
    @ResponseBody
    public int withdrawalButtonId(HttpSession session) {
        /* 세션 값 불러오기 */
        MemberDTO memberDTO = (MemberDTO)session.getAttribute("userInfo");

        MyPageDTO myPageDTO = new MyPageDTO();
        myPageDTO.setEmail(memberDTO.getEmail());

        return mypageService.withdrawalButtonId(myPageDTO);
    }


}