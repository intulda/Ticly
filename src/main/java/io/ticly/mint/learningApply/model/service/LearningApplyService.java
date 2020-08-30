package io.ticly.mint.learningApply.model.service;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.learningApply.model.dao.LearningApplyDAO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningApplyService {

    private LearningApplyDAO learningApplyDAO;

    public LearningApplyService(LearningApplyDAO learningApplyDAO){
        this.learningApplyDAO = learningApplyDAO;
    }

    /**
     * 아티클 찾기 페이지에서 학습 신청페이지로 이동시 보여줄 아티클 정보 가져오기
     * @param seq
     * @return
     */
    public ArticleInfoDTO getArticleInfo(int seq)  {
        return learningApplyDAO.getArticleInfo(seq);
    }

    /**
     * 사용자가 학습중인 아티클인지 확인하기
     * @param seq
     * @param email
     * @return
     */
    public int checkUserLearningArticle(String seq, String email)  {
        return learningApplyDAO.checkUserLearningArticle(seq, email);
    }
}
