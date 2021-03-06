package io.ticly.mint.admin.model.dao;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


public interface ArticleDAO {

    public List<ArticleDTO> ArticleListDao();
    public ArticleDTO ArticleDetailDao(String article_seq);
    public int writeArticleDao(Map<String, Object> map);
    public int deleteArticleDao(int article_seq);
    public int ArticleCount();

}
