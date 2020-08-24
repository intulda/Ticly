package io.ticly.mint.admin.model.dao;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface ArticleDAO {

    public List<ArticleDTO> ArticleListDao();
    public ArticleDTO ArticleDetailDao(String article_seq);
    public int writeArticleDao(Map<String, String> map);
    public int deleteArticleDao(@Param("title") String title);
    public int ArticleCount();

}
