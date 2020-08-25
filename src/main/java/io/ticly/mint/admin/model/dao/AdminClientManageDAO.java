package io.ticly.mint.admin.model.dao;


import io.ticly.mint.admin.model.dto.AdminClientManageDTO;
import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.mypage.model.dto.MyPageDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminClientManageDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public AdminClientManageDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    /**
     * 검색하기 버튼 클릭 후 출력
     * @return AdminClientManageDTO
     */
    public List<AdminClientManageDTO> buttonClientSearch() {
        return  sqlSessionTemplate.selectList("adminClientManageDAO.clientSearchBtn");
    }
}

