package io.ticly.mint.admin.model.dao;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public interface ArticleVocabookDAO {

    public List<VocaDTO> ArticleVocabookListDao();
    public int saveArticleVocabookDao(Map<String, String> map);
    public int deleteArticleVocabookDao(int article_vocabook_seq);

}
