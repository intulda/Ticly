package io.ticly.mint.admin.model.dao;

import java.util.List;
import java.util.Map;

public interface ArticleSentenceDAO {

    public int saveArticleSentenceDao(List<String> list);
    public int deleteArticleSentenceDao(int article_seq);

}
