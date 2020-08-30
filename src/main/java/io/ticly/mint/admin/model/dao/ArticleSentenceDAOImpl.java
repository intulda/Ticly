package io.ticly.mint.admin.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class ArticleSentenceDAOImpl implements ArticleSentenceDAO{

    // sqlSessionTemplate DI
    @Autowired
    protected SqlSessionTemplate sqlSessionTemplate;

    // Mapper XML의 namespace
    private static String namespace = "ArticleSentenceDAO";

    @Override
    public int saveArticleSentenceDao(List<String> list) {
        return sqlSessionTemplate.insert(namespace+".saveArticleSentenceDao", list);
    }

    @Override
    public int deleteArticleSentenceDao(int article_seq) {
        return 0;
    }
}
