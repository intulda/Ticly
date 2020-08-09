package io.ticly.mint.member;

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


    @RequestMapping(value = "/emailCheck", method = RequestMethod.POST)
    @ResponseBody
    public int checkEmail(@RequestParam(value = "email") String userEmail) throws Exception {
        //서비스 측에 요청
        int result = memberService.isDuplicateEmail(userEmail);

        return result; //1이면 중복, 0이면 중복 아님
    }
}
