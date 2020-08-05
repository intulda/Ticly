package io.ticly.mint.login.model.service;

import io.ticly.mint.login.model.dao.LoginDAO;
import io.ticly.mint.login.model.dto.LoginDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    private LoginDAO loginDAO;

    public LoginService(LoginDAO loginDAO) {
        this.loginDAO = loginDAO;
    }

    public List<LoginDTO> getMember() {
        return loginDAO.getMember();
    }
}
