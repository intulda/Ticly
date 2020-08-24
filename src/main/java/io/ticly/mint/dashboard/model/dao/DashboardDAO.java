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

    /**
     * 사용자가 마지막으로 학습한 아티클 정보 가져오기
     * @param email
     * @return
     */
    public UserArticleInfoDTO getLastLearningArticleInfo(String email){
        UserArticleInfoDTO info = sqlSessionTemplate.selectOne("dashboardDAO.getLastLearningArticleInfo", email);

        // 마지막 학습 유형이 단어일 때
        if (info.getLast_learning_type() == 0){
            info.setLast_learning_content(sqlSessionTemplate.selectOne("dashboardDAO.getLastVoca", info.getUser_learning_seq()));
        }

        // 마지막 학습 유형이 문장일 때
        else if (info.getLast_learning_type() == 1){
            info.setLast_learning_content(sqlSessionTemplate.selectOne("dashboardDAO.getLastSentence", info.getUser_learning_seq()));
        }

        return info;
    }
}
