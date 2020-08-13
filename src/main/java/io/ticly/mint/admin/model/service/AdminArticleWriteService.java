package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminArticleWriteService implements AdminArticleWriteServiceImpl{

    private ArticleDAO articleDAO;

    public AdminArticleWriteService(ArticleDAO articleDAO) {
        this.articleDAO = articleDAO;
    }

//    public List<ArticleDTO> getArticle() {
//        return ArticleDTO.getArticle();
//    }


    @Override
    public void WriteArticle(ArticleDTO articleDTO) throws Exception {
        articleDAO.WriteArticle(articleDTO);
    }

    @Override
    public List<ArticleDAO> ArticleListAll() throws Exception {
        return articleDAO.ArticleListAll();
    }

    @Override
    public int ArticleDetail(int ArticleNum) throws Exception {
        // 조회 시 조회수 증가
        articleDAO.hitUpdate(ArticleNum);
        return articleDAO.ArticleDetail(ArticleNum);
    }

    @Override
    public void ArticleUpdate(ArticleDAO articleDAO) throws Exception {
        articleDAO.ArticleUpdate(articleDAO);
    }

    @Override
    public void ArticleDelete(int ArticleNum) throws Exception {
        articleDAO.ArticleDelete(ArticleNum);
    }
}
