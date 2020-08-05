package io.ticly.mint.login.model.dao;

import io.ticly.mint.login.model.dto.LoginDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LoginDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public LoginDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public List<LoginDTO> getMember() {
        return sqlSessionTemplate.selectList("loginDAO.getMember");
    }

}
