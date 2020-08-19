package io.ticly.mint.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dto.OAuthTokenDTO;
import io.ticly.mint.member.dto.UserDTO;
import io.ticly.mint.member.service.MemberService;
import io.ticly.mint.member.util.NaverLoginUtil;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.SecureRandom;
import java.util.Map;

@Controller
public class OAuthController {

    private MemberService memberService;

    public OAuthController(MemberService memberService) {

        this.memberService = memberService;
    }


    private String CLIENT_ID = "zxfzewpOgzueAWu6JhMu"; // naver 애플리케이션 클라이언트 아이디값
    private String CLI_SECRET = "3Tn2PL5MCp"; // naver 애플리케이션 클라이언트 시크릿값
    private final String REDIRECT_URI = "http://localhost:8090/naver/callback";

    /**
     * 네이버 로그인 URL생
     * @param session
     * @param model
     * @return
     * @throws UnsupportedEncodingException
     * @throws UnknownHostException
     */
    @RequestMapping("/naver")
    @ResponseBody
    public String getNaverOAuthURI(HttpSession session, Model model) throws UnsupportedEncodingException, UnknownHostException {
        System.out.println("getNaverOAuthURI접속 완료");
        String redirectURI = URLEncoder.encode("http://localhost:8090/naver/callback", "UTF-8");

        /* 세션 유효성 검증을 위하여 난수(상태 토큰)를 생성 */
        SecureRandom random = new SecureRandom();
        String state = new BigInteger(130, random).toString();

        /*인증 URL*/
        String apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
        apiURL += "&client_id=" + CLIENT_ID;
        apiURL += "&redirect_uri=" + redirectURI;
        apiURL += "&state=" + state; //앞서 생성한 난수값을 인증 URL생성시 사용함

        //세션에 상태 토큰을 저장
        session.setAttribute("state", state);
        System.out.println("NaverOAuthURI=" + apiURL);

        //  model.addAttribute("apiURL", apiURL);
        return apiURL;
    }

    /**
     * 콜백 페이지 컨트롤러와 AccessToken 획득
     * @param session
     * @param request
     * @param model
     * @return
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping("/naver/callback")
    public void naverCallback(HttpSession session, HttpServletRequest request, HttpServletResponse response, Model model) throws IOException, ParseException {
        System.out.println("naverCallback 접속성공");

        String code = request.getParameter("code");
        String state = request.getParameter("state");
        System.out.println("code: "+code+", state :"+state);
        String redirectURI = URLEncoder.encode("/", "UTF-8"); //로그인 후 보이게 할 페이지 url
        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
        apiURL += "client_id=" + CLIENT_ID;
        apiURL += "&client_secret=" + CLI_SECRET;
        apiURL += "&redirect_uri=" + redirectURI;
        apiURL += "&code=" + code;
        apiURL += "&state=" + state;

        System.out.println("apiURL=" + apiURL);

        //데이터 요청 응답 가져오기, AccessToken 획득(개인정보 데이터에 접근하기 위함)
        String res = NaverLoginUtil.requestToServer(apiURL);
        if(res != null && !res.equals("")) {
            System.out.println("response정보" + res);
        //  model.addAttribute("res", res);

            //ObjectMapper를 사용하여 DTO에 데이터 저장
            ObjectMapper objectMapper = new ObjectMapper();

            OAuthTokenDTO oAuthTokenDTO = objectMapper.readValue(res, OAuthTokenDTO.class);
            System.out.println("네이버 엑세스 토큰 : " + oAuthTokenDTO.getAccess_token());

            /*네이버 회원 프로필 조회 및 DB저장 */
            //1. 로그인 사용자 정보를 가져온다.
            String apiResult = NaverLoginUtil.getProfileFromNaver(oAuthTokenDTO.getAccess_token());
            System.out.println(apiResult);

            //2. String형식인 apiResult를 json형태(Mapper)로 변환
            Map<String, Object> profileJson = new JSONParser(apiResult).parseObject();
            System.out.println("profile parsedJson = " + profileJson);
            //3. 데이터 파싱
            System.out.println("profile message" + profileJson.get("message"));
            String naverUserEmail = (String)((Map<String, Object>)profileJson.get("response")).get("email");
            String naverUserNickname = (String)((Map<String, Object>)profileJson.get("response")).get("nickname");
            System.out.println("////////////이메일 : " + naverUserEmail);
            System.out.println("////////////닉네임 : " + naverUserNickname);

            //이메일을 받아오지 못했다면, 다시 로그인 페이지로 이동.

            //닉네임을 받아오지 못했다면, 이메일에서 아이디만 추출해서 담아준다.
            if(naverUserNickname==null || naverUserNickname.equals("")){
                int nicknamePoint = naverUserEmail.indexOf("@");
                String setNickname = naverUserEmail.substring(0,nicknamePoint);
                naverUserNickname = setNickname;
            }

            //4. DTO에 저장
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(naverUserEmail);
            userDTO.setNickname(naverUserNickname);


            //이메일로 가입자 혹은 비가입자 체크
                //가입자의 경우
                    //이메일로 로그인 했던 회원인 경우 > 이메일로 로그인페이지로 이동
                    //네이버로 초기에 접속해서 DB에 회원이 경우 > 바로 로그인으로 이동
                //비가입자인 경우
                    //DB에 데이터 저장

                //[로직]
                //이메일이 같은 경우를 찾는다. > DTO로 값 전달 받음
                    //null일 때 > DB에 저장
                    //DTO.login_Type == "EMAIL" 인경우, 로그인 이동 페이지로 전달 > return

                    //로그인 처리

            //이메일이 같은 경우를 찾는다. > DTO로 값 전달 받음
            UserDTO originUser = memberService.findMember(naverUserEmail);

            //처음 로그인 했을 경우(이메일로도 회원가입한적 없고, 회원정보도 없음)
            if(originUser == null){
                System.out.println("새로운 회원입니다.");
                //DB에 가입정보 저장(서비스에서 password와 nickname처리)
                memberService.insertOAuthMember(userDTO);
            }else if(originUser.getSignup_type()=="EMAIL"){
                //로그인 페이지로 이동, 이메일로 가입한 적이 있기때문이다.
                //return;
            }
            //해당하지 않는 경우 바로 로그인 처리
            //

            //세션에 상태 토큰을 저장
            session.setAttribute("userInfo", userDTO);

       //     (MemberDTO)session.getAttribute("userinfo");\

            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<script>window.close(); opener.parent.location="+"'"+"/"+"'"+";</script>");
        } else {
            System.out.println("response실패");
            model.addAttribute("res", "Login failed!");
        }
    }

    /**
     * 토큰 갱신 요청 페이지 컨트롤러
     * @param session
     * @param request
     * @param model
     * @param refreshToken
     * @return
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping("/naver/refreshToken")
    public String refreshToken(HttpSession session, HttpServletRequest request, Model model, String refreshToken) throws IOException, ParseException {
        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=refresh_token&";
        apiURL += "client_id=" + CLIENT_ID;
        apiURL += "&client_secret=" + CLI_SECRET;
        apiURL += "&refresh_token=" + refreshToken;
        System.out.println("apiURL=" + apiURL);
        String res = NaverLoginUtil.requestToServer(apiURL);
        model.addAttribute("res", res);
        session.invalidate();
        return "test-naver-callback";
    }
    /**
     * 토큰 삭제 컨트롤러
     * @param session
     * @param request
     * @param model
     * @param accessToken
     * @return
     * @throws IOException
     */
    @RequestMapping("/naver/deleteToken")
    public String deleteToken(HttpSession session, HttpServletRequest request, Model model, String accessToken) throws IOException {
        String apiURL;
        apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=delete&";
        apiURL += "client_id=" + CLIENT_ID;
        apiURL += "&client_secret=" + CLI_SECRET;
        apiURL += "&access_token=" + accessToken;
        apiURL += "&service_provider=NAVER";
        System.out.println("apiURL=" + apiURL);
        String res = NaverLoginUtil.requestToServer(apiURL);
        model.addAttribute("res", res);
        session.invalidate();
        return "test-naver-callback";
    }

    /**
     * 세션 무효화(로그아웃)
     * @param session
     * @return
     */
    @RequestMapping("/naver/invalidate")
    public String invalidateSession(HttpSession session) {
        session.invalidate();
        return "redirect:/naver";
    }

/*    *//**
     * 액세스 토큰으로 네이버에서 프로필 받기
     * @param accessToken
     * @return
     * @throws IOException
     *//*
    @ResponseBody
    @RequestMapping("/naver/getProfile")
    public String getProfileFromNaver(String accessToken) throws IOException {
        // 네이버 로그인 접근 토큰;
        String apiURL = "https://openapi.naver.com/v1/nid/me";
        String headerStr = "Bearer " + accessToken; // Bearer 다음에 공백 추가
        String res = NaverLoginUtil.requestToServer(apiURL, headerStr);
        return res;
    }*/
}
