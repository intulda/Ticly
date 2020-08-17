package io.ticly.mint.articleBoard.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.HashtagDTO;
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

    /**
     * DB에서 내 관심분야에 맞는 해시태그 찾기
     * @param categoryList
     * @return
     */
    public List<HashtagDTO> getHashtagInfo(List<String> categoryList){
        String categoryStr = getCategoryStr(categoryList);
        return sqlSessionTemplate.selectList("articleBoardDAO.getHashtagInfo", categoryStr);
    }

    /**
     * DB에서 검색어를 만족하는 아티클 찾기
     * @param categoryList
     * @param searchKeyword
     * @return
     */
    public List<ArticleInfoDTO> findArticleBySearch(List<String> categoryList, String searchKeyword){

        // 검색 키워드를 쿼리문에 넣을 수 있게 바꾸기
        String searchKeywordStr = "\'%" + searchKeyword + "%\'";

        HashMap<String, String> searchRequirement = new HashMap<String, String>();
        searchRequirement.put("categoryStr", getCategoryStr(categoryList));
        searchRequirement.put("searchKeyword", searchKeywordStr);

        return sqlSessionTemplate.selectList("articleBoardDAO.findArticleBySearch", searchRequirement);
    }

    /**
     * DB에서 내 관심분야 최신순 아티클 찾기
     * @param categoryList
     * @return
     */
    public List<ArticleInfoDTO> findNewMyTypeArticle(List<String> categoryList){
        String categoryStr = getCategoryStr(categoryList);
        return sqlSessionTemplate.selectList("articleBoardDAO.findNewMyTypeArticle", categoryStr);
    }

    /**
     * DB에서 내 관심분야 인기순 아티클 찾기
     * @param categoryList
     * @return
     */
    public List<ArticleInfoDTO> findPopularMyTypeArticle(List<String> categoryList){
        String categoryStr = getCategoryStr(categoryList);
        return sqlSessionTemplate.selectList("articleBoardDAO.findPopularMyTypeArticle", categoryStr);
    }

    /**
     * 쿼리문에 넣어주기 위해 관심분야 배열을 ',' 단위로 이어주기
     * @param categoryList
     * @return
     */
    public String getCategoryStr(List<String> categoryList){
        String categoryStr = "";
        for (int i = 0; i < categoryList.size(); i++) {
            categoryStr += "\'" + categoryList.get(i) + "\'";

            if(i < categoryList.size() -1) {
                categoryStr += ", ";
            }
        }
        return categoryStr;
    }
}
