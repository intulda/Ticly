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
    public List<UserArticleInfoDTO> getLearningListInfo(String email)  {
        return dashboardDAO.getLearningListInfo(email);
    }

}
