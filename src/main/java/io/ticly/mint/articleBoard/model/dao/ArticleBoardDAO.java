package io.ticly.mint.articleBoard.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.HashtagDTO;
import io.ticly.mint.dashboard.model.dto.UserArticleInfoDTO;
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
     * DB에서 내 관심분야 아티클 찾기
     * @param categoryList
     * @return
     */
    public List<ArticleInfoDTO> findMyTypeArticle(List<String> categoryList){
        String categoryStr = getCategoryStr(categoryList);
        return sqlSessionTemplate.selectList("articleBoardDAO.findMyTypeArticle", categoryStr);
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

    /**
     * 사용자가 마지막으로 학습한 아티클 정보 가져오기
     * @param email
     * @return
     */
    public UserArticleInfoDTO getLastLearningArticleInfo(String email){
        UserArticleInfoDTO info = sqlSessionTemplate.selectOne("articleBoardDAO.getLastLearningArticleInfo", email);

        // 마지막 학습 유형이 단어일 때
        if (info.getLast_learning_type() == 0){
            info.setLast_learning_content(sqlSessionTemplate.selectOne("articleBoardDAO.getLastVoca", info.getUser_learning_seq()));
        }

        // 마지막 학습 유형이 문장일 때
        else if (info.getLast_learning_type() == 1){
            info.setLast_learning_content(sqlSessionTemplate.selectOne("articleBoardDAO.getLastSentence", info.getUser_learning_seq()));
        }
        return info;
    }

    /**
     * 전체 카테고리 가져오기
     * @return
     */
    public List<String> getCategoryKind() {
        return sqlSessionTemplate.selectList("articleBoardDAO.getCategoryKind");
    }
}
