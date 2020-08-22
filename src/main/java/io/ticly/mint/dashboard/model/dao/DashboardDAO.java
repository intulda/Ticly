package io.ticly.mint.dashboard.model.dao;

import io.ticly.mint.dashboard.model.dto.UserArticleInfoDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class DashboardDAO {

    private SqlSessionTemplate sqlSessionTemplate;
    public DashboardDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    /**
     * 사용자가 학습중인 아티클 정보 가져오기
     * @param email
     * @return
     */
    public List<UserArticleInfoDTO> getLearningListInfo(String email){
        return sqlSessionTemplate.selectList("dashboardDAO.getLearningListInfo", email);
    }

}
