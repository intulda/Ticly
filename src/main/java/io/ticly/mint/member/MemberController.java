package io.ticly.mint.member;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dto.ResponseDto;
import io.ticly.mint.member.dto.UserDTO;
import io.ticly.mint.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
;import javax.servlet.http.HttpSession;
import java.util.List;

@SessionAttributes("userInfo")
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
        UserDTO principal = memberService.findMemberSignin(userDTO); //principal(접근주체)

        //가져온 회원정보가 null이 아닐때, 로그인이 가능할 때
        if(principal != null){
            //DB에서 회원 카테고리 정보 가져오기
            List<String> categories = memberService.getUserCategories(principal.getEmail());

            //session에 로그인한 회원정보 저장
            MemberDTO memberDTO = new MemberDTO(principal.getEmail(), principal.getNickname(), principal.getAuth(), categories);
            model.addAttribute("userInfo", memberDTO);

            /*확인
            MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
            System.out.println("테스트 : "+user.getAuth());
            */
            return "success";
        }else{ //가져온 회원정보가 없으면, 로그인 불가
            return "fail";
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
     * 이메일로 회원가입시, 멤버 데이터 저장과 관심분야 카테고리를 세션에 저장
     * @param userDTO
     * @return
     */
    @PostMapping("/member/signup")
    @ResponseBody
    public ResponseDto<String> memberSignup(@RequestBody UserDTO userDTO, Model model) {
        int checkNum = 0;
        checkNum = memberService.insertNewMember(userDTO);
        /*
        if(checkNum==1){
            //회원가입 성공시, 세션에 저장된 관심분야 카테고리 정보를 가져온다.
            List<String> categories = ((MemberDTO)model.getAttribute("userInfo")).getCategories();
            //세션 정보를 User_Categories테이블에 저장한다.
            memberService.saveUserCategories(userDTO.getEmail(), categories);
        }*/

        return new ResponseDto<String>(HttpStatus.OK.value(), checkNum > 0 ? "success" : "fail");
    }
}
