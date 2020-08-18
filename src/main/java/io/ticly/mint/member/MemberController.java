package io.ticly.mint.member;

import io.ticly.mint.member.dto.MemberDTO;
import io.ticly.mint.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
;

@Controller
public class MemberController {

    private MemberService memberService;

    public MemberController(MemberService memberService) {

        this.memberService = memberService;
    }

    /**
     * 페이지 이동
     * @return
     */
    @GetMapping("/signup")
    public String showSignup() {
        return "member/loginModal";
    }

    @GetMapping("/login")
    public String showLogin() {
        return "login/modalTest";
    }

    @GetMapping("/header")
    public String showHeader() {
        return "layout/globalNav";
    }

    /**
     * 모달 페이지로 이동
     * @return
     */
    @GetMapping("/modal")
    public String showModal() {
        return "member/signInUp";
    }

    /**
     * 로그인시 가입여부 확인
     * @param memberDTO
     * @return 1이면 로그인 가능, 0이면 로그인 불가
     */
    @PostMapping("/member/signin")
    @ResponseBody
    public int memberSignin(@RequestBody MemberDTO memberDTO) {
        int checkNum = 0;
        checkNum = memberService.findMemberSignin(memberDTO);

        return checkNum;
    }

    /**
     * 회원가입시 이메일 체크
     * @param userEmail
     * @return 1이면 중복, 0이면 중복 아님
     */
    @PostMapping("/emailCheck")
    @ResponseBody
    public int checkEmail(@RequestParam(value = "email") String userEmail) {
        int result = memberService.findDuplicateEmail(userEmail);

        return result;
    }

    /**
     * 이메일로 회원가입시, 멤버 데이터 저장
     * @param memberDTO
     * @return 1이면 데이터 입력 성공
     */
    @PostMapping("/member/signup")
    @ResponseBody
    public int memberSignup(@RequestBody MemberDTO memberDTO) {
        int checkNum = 0;
        checkNum = memberService.insertNewMember(memberDTO);

        return checkNum;
    }
}
