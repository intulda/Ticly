package io.ticly.mint.learningApply.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class LearningApplyDAO {

    private SqlSessionTemplate sqlSessionTemplate;
    public LearningApplyDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    /**
     * 아티클 찾기 페이지에서 학습 신청페이지로 이동시 보여줄 아티클 정보 가져오기
     * @param seq
     * @return
     */
    public ArticleInfoDTO getArticleInfo(int seq){
        return sqlSessionTemplate.selectOne("learningApplyDAO.getArticleInfo", seq);
    }

    /**
     * 사용자가 학습중인 아티클인지 확인하기
     * @param seq
     * @param email
     * @return
     */
    public int checkUserLearningArticle(String seq, String email){
        HashMap<String, String> list = new HashMap<>();
        list.put("seq", seq);
        list.put("email", email);
        return sqlSessionTemplate.selectOne("learningApplyDAO.checkUserLearningArticle", list);
    }
}
