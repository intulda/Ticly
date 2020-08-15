package io.ticly.mint.articleBoard.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class ArticleBoardDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public ArticleBoardDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    public List<ArticleInfoDTO> findNewMyTypeArticle(List<String> categoryList){
        String categoryStr = getCategoryStr(categoryList);
        return sqlSessionTemplate.selectList("articleBoardDAO.findNewMyTypeArticle", categoryStr);
    }

    public List<ArticleInfoDTO> findPopularMyTypeArticle(List<String> categoryList){
        String categoryStr = getCategoryStr(categoryList);
        return sqlSessionTemplate.selectList("articleBoardDAO.findPopularMyTypeArticle", categoryStr);
    }

    public List<ArticleInfoDTO> findArticleBySearch(List<String> categoryList, String searchKeyword){

        // 검색 키워드를 쿼리문에 넣을 수 있게 바꾸기
        String searchKeywordStr = "\'%" + searchKeyword + "%\'";

        HashMap<String, String> searchRequirement = new HashMap<String, String>();
        searchRequirement.put("categoryStr", getCategoryStr(categoryList));
        searchRequirement.put("searchKeyword", searchKeywordStr);

        return sqlSessionTemplate.selectList("articleBoardDAO.findArticleBySearch", searchRequirement);
    }

    // 쿼리문에 넣어주기 위해 관심분 배열을 ',' 단위로 이어주기
    public String getCategoryStr(List<String> categoryList){
        String categoryStr = "";
        for (int i = 0; i < categoryList.size(); i++) {
            categoryStr += "\'" + categoryList.get(i) + "\'";
            System.out.println(categoryList.get(i));

            if(i < categoryList.size() -1) {
                categoryStr += ", ";
            }
        }
        return categoryStr;
    }
}
