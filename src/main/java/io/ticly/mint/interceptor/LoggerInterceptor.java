package io.ticly.mint.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoggerInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getServletPath(); //기능 수행 시, 해당 기능과 매핑된 URI의 정보
        System.out.println("path : "+path);

        String query = request.getQueryString(); //파라미터가 있는지 없는지
        System.out.println("query : "+query);

        //query가 있을때는 query가 있는 주소로, 없을때는 path 주소를 담은 값을 session에 담아 set 한다
        HttpSession httpSession = request.getSession();
        if(query != null){
            httpSession.setAttribute("prev_url", path+"?"+query);
        }else{
            httpSession.setAttribute("prev_url", path);
        }

        return true;
    }
}
