package io.ticly.mint.dashboard.model.service;

import io.ticly.mint.dashboard.model.dao.DashboardDAO;
import io.ticly.mint.dashboard.model.dto.UserArticleInfoDTO;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private DashboardDAO dashboardDAO;

    public DashboardService(DashboardDAO dashboardDAO){
        this.dashboardDAO = dashboardDAO;
    }

    public UserArticleInfoDTO getLastLearningArticleInfo(String email) {
        return dashboardDAO.getLastLearningArticleInfo(email);
    }

}
