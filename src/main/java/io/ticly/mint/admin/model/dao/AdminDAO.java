package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.AdminDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public AdminDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public List<AdminDTO> getMember() {
        return sqlSessionTemplate.selectList("adminDAO.getMember");
    }

}
