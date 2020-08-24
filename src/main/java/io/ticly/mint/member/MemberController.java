package io.ticly.mint.member;

import io.ticly.mint.admin.model.dto.CategoryDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dto.ResponseDto;
import io.ticly.mint.member.dto.UserDTO;
import io.ticly.mint.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
;import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SessionAttributes("userInfo")
@Controller
@RequestMapping(value="/member/*")
public class MemberController {

    private MemberService memberService;

    public MemberController(MemberService memberService) {

        this.memberService = memberService;
    }

    /**
     * 페이지 이동
     * @return
     */
    @GetMapping("signup")
    public String showSignup() {
        return "member/loginModal";
    }

    @GetMapping("login")
    public String showLogin() {
        return "login/modalTest";
    }

    /**
     * 모달 페이지로 이동
     * @return
     */
    @GetMapping("modal")
    public String showModal() {
        return "member/signInUp";
    }

    /**
     * 로그인 처리
     * @param userDTO
     * @return String : 로그인 성공시 '로그인 성공' Stirng 반환
     */
    @PostMapping("signin")
    @ResponseBody
    public Map<String, Object> memberSignin(@RequestBody UserDTO userDTO, Model model, HttpSession httpSession) {
        System.out.println(userDTO.getEmail() + userDTO.getPassword());
        UserDTO principal = memberService.findMemberSignin(userDTO); //principal(접근주체)
        Map<String, Object> loginInfo = new HashMap<String, Object>();

        //가져온 회원정보가 null이 아닐때, 로그인이 성공하면 DB에 있는 회원 카테고리 정보를 불러온다.
        if(principal != null){
            loginInfo.put( "status", HttpStatus.OK.value() );
            loginInfo.put( "okay", "true" );

            //DB에서 회원 카테고리 정보 가져오기
            List<String> categories = memberService.getUserCategories(principal.getEmail());

            //session에 로그인한 회원정보 저장
            MemberDTO memberDTO = new MemberDTO(principal.getEmail(), principal.getNickname(), principal.getAuth(), categories);
            model.addAttribute("userInfo", memberDTO);

            // 세션 값 꺼내오기
            MemberDTO user = (MemberDTO)model.getAttribute("userInfo");
            System.out.println("로그인한 사용자의 카테고리 정보 확인 : "+user.getCategories());

            //이전페이지 불러오기
            String prev_url = (String)httpSession.getAttribute("prev_url");
            System.out.println("prev_url : " + prev_url);
            loginInfo.put("prev_url", prev_url);

            if(!(user.getCategories()).isEmpty()){
                System.out.println("카테고리 데이터 있음");
                loginInfo.put( "sessionInfo", "카테고리데이터있음" );
            }else{
                System.out.println("카테고리 데이터 없음");
                loginInfo.put( "sessionInfo", "카테고리데이터없음" );
            }
        }else{ //가져온 회원정보가 없으면, 로그인 불가
            loginInfo.put( "status", HttpStatus.OK.value() );
            loginInfo.put( "okay", "false" );
        }

        return loginInfo;
    }

    /**
     * 회원가입시 이메일 체크
     * @param userEmail
     * @return 1이면 중복, 0이면 중복 아님
     */
    @PostMapping("emailCheck")
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
    @PostMapping("signup")
    @ResponseBody
    public ResponseDto<String> memberSignup(@RequestBody UserDTO userDTO, Model model) throws SQLException {
        int checkNum = 0;
        checkNum = memberService.insertNewMember(userDTO);

        if(checkNum==1){
            //회원가입 성공시, 세션에 저장된 관심분야 카테고리 정보를 가져온다.
            if((MemberDTO)model.getAttribute("userInfo")!=null && (MemberDTO)((MemberDTO) model.getAttribute("userInfo")).getCategories()!=null){
                List<String> categories = ((MemberDTO)model.getAttribute("userInfo")).getCategories();
                //세션 정보를 User_Categories테이블에 저장한다.
                memberService.saveUserCategories(userDTO.getEmail(), categories);
            }
        }
        return new ResponseDto<String>(HttpStatus.OK.value(), checkNum > 0 ? "success" : "fail");
    }

    @RequestMapping("logout")
    public String logout(@ModelAttribute("userInfo") MemberDTO memberDTO, SessionStatus sessionStatus, HttpSession httpSession){
     //   session.invalidate();

        sessionStatus.setComplete();
        return "redirect:"+(String)httpSession.getAttribute("prev_url");
    }
}
