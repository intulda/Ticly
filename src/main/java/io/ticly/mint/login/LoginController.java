package io.ticly.mint.login;

import io.ticly.mint.login.model.dto.LoginDTO;
import io.ticly.mint.login.model.service.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value="/login/*")
public class LoginController {

    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping(value="getMember")
    @ResponseBody
    public List<LoginDTO> getMember() {
        List<LoginDTO> loginDTOS = loginService.getMember();
        return loginDTOS;
    }
}
