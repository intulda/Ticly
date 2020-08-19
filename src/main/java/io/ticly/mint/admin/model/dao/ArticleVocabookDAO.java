package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.dto.ArticleVocabookDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public interface ArticleVocabookDAO {

    public List<ArticleVocabookDTO> ArticleVocabookListDao();
    public int saveArticleVocabookDao(Map<String, String> map);
    public int deleteArticleVocabookDao(int article_vocabook_seq);

}
