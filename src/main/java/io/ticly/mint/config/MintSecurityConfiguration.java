package io.ticly.mint.config;

import io.ticly.mint.config.auth.PrincipalDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//빈등록 : 스프링 컨테이너에서 객체를 관리할 수 있게 하는
@Configuration //빈등록
@EnableWebSecurity //시큐리티 필터가 등록 됨
@EnableGlobalMethodSecurity(prePostEnabled = true) //특정 주소로 접근을 하면 권한 및 인증을 미리 체크하겠다는 뜻.
public class MintSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private PrincipalDetailService principalDetailService;

    public MintSecurityConfiguration(PrincipalDetailService principalDetailService) {
        this.principalDetailService = principalDetailService;
    }

    /**
     * 비밀번호 암호화
     * @return
     */
    @Bean
    public BCryptPasswordEncoder encodePWD() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 회원가입시, 해쉬된 비밀번호를 DB와 비교하기 위한 함수
     * @param auth
     * @throws Exception
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(principalDetailService).passwordEncoder(encodePWD());
    }
    /*
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/**");
    }*/

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
            .csrf().disable()  // csrf 토큰 비활성화 (테스트시 걸어두는 게 좋음)
            .authorizeRequests() //request가 들어오면
                .antMatchers("/", "/auth/**", "/js/**", "/css/**", "/image/**") //설정한 url은 누구나 접속 가능하다.
                .permitAll()
                .anyRequest() //위에 설정한 것이 아닌 다른 요청들
                .authenticated() //인증이 되어야 한다.
            .and()
                .formLogin()
                .loginPage("") //권한 인증이 안되어 있는 경우 로그인 페이지로 이동한다.
                .loginProcessingUrl("/member/loginPoc") // 스프링 시큐리티가 해당 주소로 요청오는 로그인을 가로채서 대신 로그인 해준다.
                .defaultSuccessUrl("/");
    }
}
