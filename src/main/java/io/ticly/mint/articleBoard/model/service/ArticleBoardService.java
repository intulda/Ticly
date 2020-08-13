package io.ticly.mint.articleBoard.model.service;

import io.ticly.mint.articleBoard.model.dao.ArticleBoardDAO;
import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleBoardService {

    private ArticleBoardDAO articleBoardDAO;

    public ArticleBoardService(ArticleBoardDAO articleBoardDAO){
        this.articleBoardDAO = articleBoardDAO;
    }

    /**
     * 선택한 관심 분야와 동일한 아티클 찾기
     * @param  'list' : categoryArr	사용자가 선택한 관심 분야
     */
    public List<ArticleInfoDTO> findMyTypeArticle(List<String> categories) {
        return articleBoardDAO.findMyTypeArticle(categories);
    }
}
