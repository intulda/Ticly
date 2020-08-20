package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface IArticleWriteService {

    public List<ArticleDTO> ArticleList();
    public ArticleDTO ArticleDetail(String title);
    public int writeArticle(Map<String, String> map);
    public int deleteArticle(@Param("_title") String title);
    public int ArtCount();

    public List<VocaDTO> ArticleVocabookList();
    public int saveArticleVocabook(List<Map<String, String>> list);
    public int deleteArticleVocabook(int article_vocabook_seq);

    public List<VocaDTO> VocabookList();
    public int saveVocabook(List<Map<String, String>> list);
    public int deleteVocabook(int article_vocabook_seq);

}
