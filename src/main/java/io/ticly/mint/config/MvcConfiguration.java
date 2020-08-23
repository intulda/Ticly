package io.ticly.mint.config;

import io.ticly.mint.interceptor.LoggerInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfiguration implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoggerInterceptor()) //생성한 인터셉터 등록
                .addPathPatterns("/*") //모든 페이지에서 url 캐
                .excludePathPatterns("/css/**", "/fonts/**", "/plugin/**", "/scripts/**") //특정 패턴의 주소(URI)를 제외
                .excludePathPatterns("/member/**"); //로치그인 관련 url 제외
    }
}
