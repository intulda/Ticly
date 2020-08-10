package io.ticly.mint.articleBoard.model.service;

import io.ticly.mint.articleBoard.model.dao.ArticleBoardDAO;
import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleBoardService {

    private ArticleBoardDAO articleBoardDAO;

    public ArticleBoardService(ArticleBoardDAO articleBoardDAO){
        this.articleBoardDAO = articleBoardDAO;
    }
    public List<ArticleInfoDTO> getArticleInfo() {
        String categories[] = {"1","2"};
        return articleBoardDAO.getArticleInfo(categories);
    }
}
