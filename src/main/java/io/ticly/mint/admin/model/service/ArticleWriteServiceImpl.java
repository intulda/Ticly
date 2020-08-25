package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class ArticleWriteServiceImpl implements ArticleWriteService{

    private ArticleDAO articleDAO;

    public void ArticleWriteService(ArticleDAO articleDAO) {
        this.articleDAO = articleDAO;
    }

    @Override
    public List<ArticleDTO> ArticleList() {
        return articleDAO.ArticleListDao();
    }

    @Override
    public ArticleDTO ArticleDetail(String title) {
        return articleDAO.ArticleDetailDao(title);
    }

    @Override
    public int writeArticle(Map<String, String> map) {
        int nResult = articleDAO.writeArticleDao(map);
        return nResult;
    }

    @Override
    public int deleteArticle(String article_seq) {
        int nResult = articleDAO.deleteArticleDao(article_seq);
        return nResult;
    }

    @Override
    public int ArtCount() {
        int nTotalCount = articleDAO.ArticleCount();
        return nTotalCount;
    }


}
