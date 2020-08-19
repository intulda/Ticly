package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface IArticleWriteService {

    public List<ArticleDTO> ArticleList();
    public ArticleDTO ArticleDetail(String title);
    public int writeArticle(Map<String, String> map);
    public int deleteArticle(@Param("_title") String title);
    public int ArtCount();

}
