package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;

import java.util.List;

public interface AdminArticleWriteServiceImpl {

    public int WriteArticle(ArticleDTO articleDTO) throws Exception;
    public List<ArticleDAO> ArticleListAll() throws Exception;
    public int ArticleDetail(int ArticleNum) throws Exception;
    public void ArticleUpdate (ArticleDAO articleDAO) throws Exception;
    public void ArticleDelete (int ArticleNum) throws Exception;

}
