package io.ticly.mint.learningApply.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LearningApplyDAO {

    private SqlSessionTemplate sqlSessionTemplate;
    public LearningApplyDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public ArticleInfoDTO getArticleInfo(int seq){
        return sqlSessionTemplate.selectOne("learningApplyDAO.getArticleInfo", seq);
    }
}
