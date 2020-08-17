package io.ticly.mint.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ticly.mint.member.dto.OAuthTokenDTO;
import io.ticly.mint.member.service.OAuthService;
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
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.SecureRandom;

@Controller
public class OAuthController {
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
        /*
        String access_token = "";
        String refresh_token = "";
         */

        System.out.println("apiURL=" + apiURL);
        //session.setAttribute("apiURL", apiURL);

        //데이터 요청 응답 가져오기, AccessToken 획득(개인정보 데이터에 접근하기 위함)
        String res = requestToServer(apiURL);
        if(res != null && !res.equals("")) {
            System.out.println("response정보" + res);
        //  model.addAttribute("res", res);

            //ObjectMapper를 사용하여 DTO에 데이터 저장
            ObjectMapper objectMapper = new ObjectMapper();

            OAuthTokenDTO oAuthTokenDTO = objectMapper.readValue(res, OAuthTokenDTO.class);

            System.out.println("네이버 엑세스 토큰 : " + oAuthTokenDTO.getAccess_token());

            /* String형태의 응답값을 Json타입으로 변환
            Map<String, Object> parsedJson = new JSONParser(res).parseObject();
            System.out.println("parsedJson = " + parsedJson);
            session.setAttribute("currentUser", res);
            session.setAttribute("currentAT", parsedJson.get("access_token"));  //사용자 액세스 토큰 값
            session.setAttribute("currentRT", parsedJson.get("refresh_token")); //사용자 리프레시 토큰 값, 액세스 토큰이 만료되면 리프레시 토큰 필요.
            */

            /*
            //네이버 회원 프로필 조회 및 DB저장
            int checkNum = OAuthService.insertOAuthMember(oAuthTokenDTO);
            */

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
        String res = requestToServer(apiURL);
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
        String res = requestToServer(apiURL);
        model.addAttribute("res", res);
        session.invalidate();
        return "test-naver-callback";
    }
    /**
     * 액세스 토큰으로 네이버에서 프로필 받기
     * @param accessToken
     * @return
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping("/naver/getProfile")
    public String getProfileFromNaver(String accessToken) throws IOException {
        // 네이버 로그인 접근 토큰;
        String apiURL = "https://openapi.naver.com/v1/nid/me";
        String headerStr = "Bearer " + accessToken; // Bearer 다음에 공백 추가
        String res = requestToServer(apiURL, headerStr);
        return res;
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

    /**
     * 서버 통신 메소드
     * @param apiURL
     * @return
     * @throws IOException
     */
    private String requestToServer(String apiURL) throws IOException {
        return requestToServer(apiURL, "");
    }

    /**
     * 서버 통신 메소드
     * @param apiURL
     * @param headerStr
     * @return
     * @throws IOException
     */
    private String requestToServer(String apiURL, String headerStr) throws IOException {
        URL url = new URL(apiURL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("GET");
        System.out.println("header Str: " + headerStr);

        if(headerStr != null && !headerStr.equals("") ) {
            con.setRequestProperty("Authorization", headerStr);
        }

        int responseCode = con.getResponseCode();
        BufferedReader br;
        System.out.println("responseCode="+responseCode);

        if(responseCode == 200) { // 정상 호출
            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            br = new BufferedReader(new InputStreamReader(con.getInputStream()));
        } else {  // 에러 발생
            br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
        }
        String inputLine;
        StringBuffer res = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
            res.append(inputLine);
        }
        br.close();
        if(responseCode==200) {
            return res.toString();
        } else {
            return null;
        }
    }
}
