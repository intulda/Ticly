package io.ticly.mint.admin.model.dao;


import io.ticly.mint.admin.model.dto.AdminClientManageDTO;
import io.ticly.mint.admin.model.dto.MemberSearchInfoDTO;
import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.mypage.model.dto.MyPageDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
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

    public List<AdminClientManageDTO> findMemberBySearch(MemberSearchInfoDTO memberSearchInfoDTO){
        return sqlSessionTemplate.selectList("adminClientManageDAO.findMemberBySearch", memberSearchInfoDTO);
    }
}

