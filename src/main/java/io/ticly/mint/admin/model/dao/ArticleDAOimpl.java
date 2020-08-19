package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;


@Repository
public class ArticleDAOImpl implements ArticleDAO{

    // sqlSessionTemplate DI
    @Autowired
    protected SqlSessionTemplate sqlSessionTemplate;

    // Mapper XML의 namespace
    private static String namespace = "ArticleDAO";

    @Override
    public List<ArticleDTO> ArticleListDao() {
        return sqlSessionTemplate.selectList(namespace+".ArticleListDao");
    }

    @Override
    public ArticleDTO ArticleDetailDao(String title) {
        return sqlSessionTemplate.selectOne(namespace+".ArticleDetailDao");
    }

    @Override
    public int writeArticleDao(Map<String, String> map) {
        return sqlSessionTemplate.insert(namespace+".writeArticleDao", map);
    }

    @Override
    public int deleteArticleDao(String title) {
        return sqlSessionTemplate.update(namespace+".deleteArticleDao");
    }

    @Override
    public int ArticleCount() {
        return sqlSessionTemplate.selectOne(namespace+".ArticleCount");
    }
}
