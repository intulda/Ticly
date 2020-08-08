package io.ticly.mint.member;

import io.ticly.mint.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
;

@Controller
public class MemberController {

    private MemberService memberService;

    public MemberController(MemberService memberService) {

        this.memberService = memberService;
    }


    @RequestMapping(value = "/emailCheck", method = RequestMethod.POST)
    @ResponseBody
    public int checkEmail(@RequestParam(value = "email") String userEmail) throws Exception {
        //값확인
        System.out.println("중복 확인 요청된 이메일 : " + userEmail);

        //서비스 측에 요청
        int result = memberService.isDuplicateEmail(userEmail);

        System.out.println("MemberController result : " + result);

        //1이면 중복, 0이면 중복 아님
        return result;
    }
}
