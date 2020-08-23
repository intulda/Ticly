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
    public List<UserArticleInfoDTO> getMyArticleListInfo(String email){
        return sqlSessionTemplate.selectList("dashboardDAO.getMyArticleListInfo", email);
    }

    /**
     * [삭제하기]버튼 클릭시 사용자의 [학습하기] 내역 삭제하기
     * @param seq
     * @return
     */
    public int deleteUserLearningInfo(int seq){
        return sqlSessionTemplate.delete("dashboardDAO.deleteUserLearningInfo", seq);
    }

}
