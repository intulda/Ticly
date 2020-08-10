package io.ticly.mint.articleBoard.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArticleBoardDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public ArticleBoardDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

//    public boolean saveCategory(GuestDTO guestDTO){
//        int count = sqlSessionTemplate.insert("articleBoardDAO.saveCategory");
//        return count > 0 ? true : false;
//    }

    public List<ArticleInfoDTO> getArticleInfo(String[] categories){
        List<ArticleInfoDTO> list = sqlSessionTemplate.selectList("articleBoardDAO.getArticleInfo");
        return list;
    }
}
