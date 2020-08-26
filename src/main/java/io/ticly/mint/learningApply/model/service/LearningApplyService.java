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

    public ArticleInfoDTO getArticleInfo(int seq)  {
        return learningApplyDAO.getArticleInfo(seq);
    }
}
