package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.AdminDAO;
import io.ticly.mint.admin.model.dto.AdminDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminArticleWriteService {

    private AdminDAO adminDAO;

    public AdminArticleWriteService(AdminDAO adminDAO) {
        this.adminDAO = adminDAO;
    }

    public List<AdminDTO> getMember() {
        return adminDAO.getMember();
    }
}
