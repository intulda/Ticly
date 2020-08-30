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
     * [숨김]버튼 클릭시 사용자의 활성화 상태 비활성화하기
     * @param seq
     * @return
     */
    public int updateUserArticleShow(String seq, String showState, String email){
        HashMap<String, String> userInfo = new HashMap<>();
        userInfo.put("seq", seq);
        userInfo.put("showState", showState);
        userInfo.put("email", email);

        return sqlSessionTemplate.update("dashboardDAO.updateUserArticleShow", userInfo);
    }

}
