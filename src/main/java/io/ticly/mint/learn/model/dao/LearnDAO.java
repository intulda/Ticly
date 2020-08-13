package io.ticly.mint.learn.model.dao;

import io.ticly.mint.article.model.dto.ArticleDTO;
import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 학습하기 DAO
 * @Create 2020.08.11
 */
@Repository
public class LearnDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public LearnDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public ArticleDTO getArticle(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.selectOne("learnDAO.getArticle", userLearnDTO);
    }

    public int saveUserLearning(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.insert("learnDAO.saveUserLearning", userLearnDTO);
    }

    public int getUserVocaCheck(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.selectOne("learnDAO.getUserVocaCheck", userLearnDTO);
    }

    public int saveArticleVocaToUser(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.insert("learnDAO.saveArticleVocaToUser", userLearnDTO);
    }

    public List<VocaDTO> getVocaList(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.selectList("learnDAO.getVocaList", userLearnDTO);
    }
}
