package io.ticly.mint.member;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.learningApply.model.dto.LearningApplyInfoDTO;
import io.ticly.mint.member.dto.ResponseDto;
import io.ticly.mint.member.dto.UserDTO;
import io.ticly.mint.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SessionAttributes("userInfo")
@Controller
@RequestMapping(value="/member/*")
public class MemberController {

    private MemberService memberService;

    public MemberController(MemberService memberService, BCryptPasswordEncoder encoder) {
        this.memberService = memberService;
    }

    /**
     * '로그인(메인)' 페이지로 이동
     * @return
     */
    @RequestMapping("login")
    public String showLogin(HttpSession httpSession) {
        //로그인 세션 정보가 있을 때 이전 페이지로 보내줌.
        //세션에 저장되어 있는 유저 정보 확인
        MemberDTO memberDTO = (MemberDTO)httpSession.getAttribute("userInfo");
        //이전페이지 불러오기
        String prev_url = (String)httpSession.getAttribute("prev_url");
        //로그인 정보가 있으면 이전페이지로 보내준다.
        if(memberDTO != null && memberDTO.getEmail() != null) {
            return "redirect:"+prev_url;
        }
        //로그인한 기록이 없으면, login페이지로 이동
        else{
            return "login/login";
        }
    }

    /**
     * '이메일로 회원가입' 페이지 이동
     * @return
     */
    @RequestMapping("emailSignup")
    public String showSignup(HttpSession httpSession){
        //로그인 세션 정보가 있을 때 이전 페이지로 보내줌.
        //세션에 저장되어 있는 유저 정보 확인
        MemberDTO memberDTO = (MemberDTO)httpSession.getAttribute("userInfo");
        //이전페이지 불러오기
        String prev_url = (String)httpSession.getAttribute("prev_url");
        //로그인 정보가 있으면 이전페이지로 보내준다.
        if(memberDTO != null && memberDTO.getEmail() != null) {
            return "redirect:"+prev_url;
        }
        //로그인한 기록이 없으면, login페이지로 이동
        else{
            return "login/emailSignup";
        }
    }

    @RequestMapping("emailSignin")
    public String showSignin(HttpSession httpSession){
        //로그인 세션 정보가 있을 때 이전 페이지로 보내줌.
        //세션에 저장되어 있는 유저 정보 확인
        MemberDTO memberDTO = (MemberDTO)httpSession.getAttribute("userInfo");
        //이전페이지 불러오기
        String prev_url = (String)httpSession.getAttribute("prev_url");
        //로그인 정보가 있으면 이전페이지로 보내준다.
        if(memberDTO != null && memberDTO.getEmail() != null) {
            return "redirect:"+prev_url;
        }
        //로그인한 기록이 없으면, login페이지로 이동
        else{
            return "login/emailSignin";
        }
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
            loginInfo.put( "okay", "true" ); //회원정보가 있으니, true를 넣어준다.

            //DB에서 회원 카테고리 정보 가져오기, 테이블에 카테고리 정보가 없으면 전체를 가져온다.
            List<String> categories = memberService.getUserCategories(principal.getEmail());

            //session에 로그인한 회원정보 저장
            MemberDTO memberDTO = new MemberDTO(principal.getEmail(), principal.getNickname(), principal.getAuth(), categories);
            model.addAttribute("userInfo", memberDTO);

            // 세션 값 꺼내오기
            LearningApplyInfoDTO learningApplyInfoDTO = (LearningApplyInfoDTO)httpSession.getAttribute("learningApplyInfo");
            //System.out.println("로그인한 사용자의 카테고리 정보 확인 : "+learningApplyInfoDTO.getArticle_path());

            //이전페이지 불러오기
            String prev_url = (String)httpSession.getAttribute("prev_url");
            System.out.println("prev_url : " + prev_url);
            loginInfo.put("prev_url", prev_url);

            if(learningApplyInfoDTO==null){
                System.out.println("유저학습정보없음");
                loginInfo.put( "learningApplyInfo", "false" );
            }else{
                System.out.println("유저학습정보있음");
                loginInfo.put( "learningApplyInfo", learningApplyInfoDTO.getArticle_path() );
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
        System.out.println("checkEmail 요청 확인");
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
        int checkNum = memberService.insertNewMember(userDTO);

        /*회원가입 성공시, 세션에 저장된 관심분야 카테고리 정보를 가져온다.*/
        if(checkNum==1){
            if(model.getAttribute("userInfo")!=null){
                if(((MemberDTO) model.getAttribute("userInfo")).getCategories()!=null) {
                    List<String> categories = ((MemberDTO) model.getAttribute("userInfo")).getCategories();
                    //세션 정보를 User_Categories테이블에 저장한다.
                    memberService.saveUserCategories(userDTO.getEmail(), categories);
                }
            }
        }
        return new ResponseDto<String>(HttpStatus.OK.value(), checkNum > 0 ? "success" : "fail");
    }

    @RequestMapping("logout")
    public String logout(@ModelAttribute("userInfo") MemberDTO memberDTO, SessionStatus sessionStatus, HttpSession httpSession){
        httpSession.invalidate();
        sessionStatus.setComplete();
        return "redirect:/";
    }
}
