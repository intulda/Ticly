package io.ticly.mint.admin.model.dao;

import io.ticly.mint.learn.model.dto.VocaDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ArticleVocabookDAOImpl implements ArticleVocabookDAO{
    // sqlSessionTemplate DI
    @Autowired
    protected SqlSessionTemplate sqlSessionTemplate;

    // Mapper XML의 namespace
    private static String namespace = "ArticleVocabookDAO";

    @Override
    public List<Map<String, String>> ArticleVocabookListDao() {
        return sqlSessionTemplate.selectList(namespace+".ArticleVocabookListDao");
    }

    @Override
    public int saveArticleVocabookDao(List<Map<String, String>> list) {
        return sqlSessionTemplate.insert(namespace+".saveArticleVocabookDao", list);
    }

    @Override
    public int deleteArticleVocabookDao(int article_vocabook_seq) {
        return sqlSessionTemplate.update(namespace+".deleteArticleVocabookDao");
    }

}
