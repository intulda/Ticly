package io.ticly.mint.admin.model.dao;

import io.ticly.mint.learn.model.dto.VocaDTO;


import java.util.List;
import java.util.Map;

public interface ArticleVocabookDAO {

    public List<Map<String, String>> ArticleVocabookListDao();
    public int saveArticleVocabookDao(List<Map<String, String>> list);
    public int deleteArticleVocabookDao(int article_vocabook_seq);

}
