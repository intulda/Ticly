package io.ticly.mint.articleBoard.model.service;

import io.ticly.mint.articleBoard.model.dao.ArticleBoardDAO;
import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;
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
     * 선택한 관심 분야와 동일한 최신 아티클 찾기
     * @param  'list' : categoryArr	사용자가 선택한 관심 분야
     */
    public List<ArticleInfoDTO> findNewMyTypeArticle(List<String> categories) {
        return articleBoardDAO.findNewMyTypeArticle(categories);
    }

    /**
     * 선택한 관심 분야와 동일한 인기 아티클 찾기
     * @param  'list' : categoryArr	사용자가 선택한 관심 분야
     */
    public List<ArticleInfoDTO> findPopularMyTypeArticle(List<String> categories) {
        return articleBoardDAO.findPopularMyTypeArticle(categories);
    }

    /**
     * 사용자가 선택 카테고리를 불러오는 메소드
     * @return List<String> categories
     */
    public List<String> getCategoriesAtParameter(Model model, HttpServletRequest req){
        // 전송받은 "categories"의 값을 낚아채 리스트에 넣어준다.
        String[] categoriesStr = req.getParameterValues("categories");
        List<String> categories = new ArrayList<String>();
        for(String key : categoriesStr) {
            categories.add(key);
        }
        return categories;
    }
}
