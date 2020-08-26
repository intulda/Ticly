package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleSentenceDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminSentenceServiceImpl implements AdminSentenceService{

    ArticleSentenceDAO articleSentenceDAO;

    @Override
    public int saveArticleSentence(List<String> list) {
        int SentenceSet = articleSentenceDAO.saveArticleSentenceDao(list);
        return SentenceSet;
    }

    @Override
    public int deleteArticleSentence(int article_sentence_seq) {
        int sResult = articleSentenceDAO.deleteArticleSentenceDao(article_sentence_seq);
        return sResult;
    }

}
