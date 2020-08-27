package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.AdminClientManageDAO;
import io.ticly.mint.admin.model.dto.AdminClientManageDTO;
import io.ticly.mint.admin.model.dto.MemberSearchInfoDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.mypage.model.dao.MyPageDAO;
import io.ticly.mint.mypage.model.dto.MyPageDTO;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class AdminClientManageService {
    private AdminClientManageDAO adminClientManageDAO;

    public AdminClientManageService(AdminClientManageDAO adminClientManageDAO) {
        this.adminClientManageDAO = adminClientManageDAO;
    }

    /**
     * 검색하기 버튼 클릭 후 출력
     * @return
     */
    public List<AdminClientManageDTO> buttonClientSearch() {
        return adminClientManageDAO.buttonClientSearch();
    }

    /**
     * 전달된 키워드와 동일한 회원 정보를 가져오는 메소드
     *
     */
    public List<AdminClientManageDTO> findMemberBySearch(MemberSearchInfoDTO memberSearchInfoDTO) {
        return adminClientManageDAO.findMemberBySearch(memberSearchInfoDTO);
    }
}
