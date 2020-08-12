package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

// xml에서 정의한 sqlSession 사용
@Repository
public class ArticleDAO implements ArticleDAOimpl {

    private final SqlSessionTemplate sqlSessionTemplate;

    private static final String namespace = "articleDAO";

    public ArticleDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public int WriteArticle(ArticleDTO articleDTO) throws Exception {

        return sqlSessionTemplate.insert(namespace+".WriteArticle", articleDTO) ;
    }

    @Override
    public List<ArticleDAO> ArticleListAll() throws Exception {
        return sqlSessionTemplate.selectList(namespace+".selectAll");
    }

    @Override
    public int ArticleDetail(int ArticleNum) throws Exception {
        return sqlSessionTemplate.update(namespace+".selectOne", ArticleNum);
    }

    @Override
    public void ArticleUpdate(ArticleDAO articleDAO) throws Exception {
        sqlSessionTemplate.update(namespace+".modify", articleDAO);
    }

    @Override
    public void ArticleDelete(int ArticleNum) throws Exception {
        sqlSessionTemplate.delete(namespace+".remove", ArticleNum);
    }

    @Override
    public void hitUpdate(int ArticleNum) throws Exception {
        sqlSessionTemplate.update(namespace+".hitUpdate", ArticleNum);
    }
}
