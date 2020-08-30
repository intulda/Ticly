package io.ticly.mint.dashboard.model.service;

import io.ticly.mint.dashboard.model.dao.DashboardDAO;
import io.ticly.mint.dashboard.model.dto.UserArticleInfoDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private DashboardDAO dashboardDAO;

    public DashboardService(DashboardDAO dashboardDAO){
        this.dashboardDAO = dashboardDAO;
    }

    /**
     * 학습중인 아티클 정보 가져오기
     * @param email
     * @return
     */
    public List<UserArticleInfoDTO> getMyArticleListInfo(String email)  {
        return dashboardDAO.getMyArticleListInfo(email);
    }

    /**
     * [숨김]버튼 클릭시 사용자의 활성화 상태 비활성화하기
     * @param seq
     */
    public int updateUserArticleShow(String seq, String showState, String email)  {
        return dashboardDAO.updateUserArticleShow(seq, showState, email);
    }
}
