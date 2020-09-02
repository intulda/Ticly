package io.ticly.mint.member.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ticly.mint.member.dto.ResponseDataDTO;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    /**
     * 로그인 성공시 로직
     *
     * @param request
     * @param response
     * @param authentication
     * @throws javax.servlet.ServletException
     * @throws java.io.IOException
     */
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        System.out.println("onAuthenticationSuccess도착");
        ObjectMapper mapper = new ObjectMapper();    //JSON 변경용

        ResponseDataDTO responseDataDTO = new ResponseDataDTO();
        responseDataDTO.setCode("200");
        responseDataDTO.setStatus("200");

        String prevPage = request.getSession().getAttribute("prevPage").toString();    //이전 페이지 가져오기

        Map<String, String> items = new HashMap<String, String>();
        System.out.println("onAuthenticationSuccess prevPage"+ prevPage);
        items.put("url", prevPage);    // 이전 페이지 저장
        responseDataDTO.setItem(items);

        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().print(mapper.writeValueAsString(responseDataDTO));
        response.getWriter().flush();
    }
}
