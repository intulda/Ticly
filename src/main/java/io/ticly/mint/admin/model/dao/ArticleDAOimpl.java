package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.ArticleDTO;

import java.util.List;

public interface ArticleDAOimpl {

    public int WriteArticle(ArticleDTO articleDTO) throws Exception;
    public List<ArticleDAO> ArticleListAll() throws Exception;
    public int ArticleDetail(int ArticleNum) throws Exception;
    public void ArticleUpdate (ArticleDAO articleDAO) throws Exception;
    public void ArticleDelete (int ArticleNum) throws Exception;
    public void hitUpdate (int ArticleNum) throws Exception;

}
