package io.ticly.mint.learn.model.dao;

import io.ticly.mint.learn.model.dto.LearnArticleDTO;
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

    private final String NAMESPACE = "learnDAO.";
    private SqlSessionTemplate sqlSessionTemplate;

    public LearnDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public LearnArticleDTO getArticle(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.selectOne(NAMESPACE+"getArticle", userLearnDTO);
    }

    public int saveUserLearning(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.insert(NAMESPACE+"saveUserLearning", userLearnDTO);
    }

    public int getUserVocaCheck(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.selectOne(NAMESPACE+"getUserVocaCheck", userLearnDTO);
    }

    public int saveArticleVocaToUser(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.insert(NAMESPACE+"saveArticleVocaToUser", userLearnDTO);
    }

    public List<VocaDTO> getVocaList(UserLearnDTO userLearnDTO) {
        return sqlSessionTemplate.selectList(NAMESPACE+"getVocaList", userLearnDTO);
    }

    public int saveWordReading(VocaDTO vocaDTO) {
        return sqlSessionTemplate.update(NAMESPACE+"saveWordReading", vocaDTO);
    }

    public int saveUserVoca(VocaDTO vocaDTO) {
        return sqlSessionTemplate.insert(NAMESPACE+"saveUserVoca", vocaDTO);
    }

    public int deleteUserVoca(VocaDTO vocaDTO) {
        return sqlSessionTemplate.delete(NAMESPACE+"deleteUserVoca", vocaDTO);
    }

    public int updateUserWord(VocaDTO vocaDTO) {
        return sqlSessionTemplate.update(NAMESPACE+"updateUserWord", vocaDTO);
    }
}
