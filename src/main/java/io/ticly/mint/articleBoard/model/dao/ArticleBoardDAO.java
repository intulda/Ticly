package io.ticly.mint.articleBoard.model.dao;

import io.ticly.mint.articleBoard.model.dto.GuestDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ArticleBoardDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public ArticleBoardDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public boolean saveCategory(GuestDTO guestDTO){
        int count = sqlSessionTemplate.insert("articleBoardDAO.saveCategory");
        return count > 0 ? true : false;
    }
}
