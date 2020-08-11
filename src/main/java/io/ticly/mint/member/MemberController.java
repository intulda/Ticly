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

    @GetMapping("/signup")
    public String showSignup() throws Exception {
        return "member/loginModal";
    }

    @GetMapping("/modal")
    public String showModal() throws Exception {
        return "member/signInUp";
    }


    @PostMapping("/emailCheck")
    @ResponseBody
    public int checkEmail(@RequestParam(value = "email") String userEmail) throws Exception {
        //서비스 측에 요청
        int result = memberService.isDuplicateEmail(userEmail);

        return result; //1이면 중복, 0이면 중복 아님
    }

    @PostMapping("/member/signup")
    @ResponseBody
    public int memberSignup(@RequestBody MemberDTO memberDTO) throws Exception {
        int checkNum = 0;
        checkNum = memberService.memberSignup(memberDTO);

        return checkNum; //1이면 데이터 입력 성공
    }
}
