package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.VocabookDAO;

import java.util.List;
import java.util.Map;

public interface AdminSentenceService {

    public int saveArticleSentence(List<String> list);
    public int deleteArticleSentence(int article_sentence_seq);

}
