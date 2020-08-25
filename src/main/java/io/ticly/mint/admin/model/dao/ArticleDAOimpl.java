package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;


@Repository
class ArticleDAOImpl implements ArticleDAO{

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
    public ArticleDTO ArticleDetailDao(String article_seq) {
        return sqlSessionTemplate.selectOne(namespace+".ArticleDetailDao",article_seq);
    }

    @Override
    public int writeArticleDao(Map<String, String> map) {
        return sqlSessionTemplate.insert(namespace+".writeArticleDao", map);
    }

    @Override
    public int deleteArticleDao(String article_seq) {
        return sqlSessionTemplate.update(namespace+".deleteArticleDao", article_seq);
    }

    @Override
    public int ArticleCount() {
        return sqlSessionTemplate.selectOne(namespace+".ArticleCount");
    }
}
