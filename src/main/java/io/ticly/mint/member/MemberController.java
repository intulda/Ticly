package io.ticly.mint.member;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dto.UserDTO;
import io.ticly.mint.member.service.MemberService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
;import javax.servlet.http.HttpSession;
import java.util.List;

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
     * @param userDTO
     * @return String : 로그인 성공시 '로그인 성공' Stirng 반환
     */
    @PostMapping("/member/signin")
    @ResponseBody
    public String memberSignin(@RequestBody UserDTO userDTO, Model model) {
        System.out.println(userDTO.getEmail() + userDTO.getPassword());
        UserDTO userInfo = memberService.findMemberSignin(userDTO);

        //가져온 회원정보가 null이 아닐때, 로그인이 가능할 때
        if(userInfo != null){
            //DB에서 회원 카테고리 정보 가져오기
            List<String> categories = memberService.getUserCategories(userInfo.getEmail());
            MemberDTO memberDTO = new MemberDTO(userInfo.getEmail(), userInfo.getNickname(), userInfo.getAuth(), categories);
            model.addAttribute("userInfo", memberDTO);
            MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
            System.out.println("테스트 : "+user.getAuth());
            return "로그인성공";
        }else{ //가져온 회원정보가 없으면, 로그인 불가
            return "회원정보없음";
        }
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
     * @param userDTO
     * @return 1이면 데이터 입력 성공
     */
    @PostMapping("/member/signup")
    @ResponseBody
    public int memberSignup(@RequestBody UserDTO userDTO) {
        int checkNum = 0;
        checkNum = memberService.insertNewMember(userDTO);

        return checkNum;
    }
}
