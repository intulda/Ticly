package io.ticly.mint.admin.mapper;

import io.ticly.mint.admin.model.dto.ArticleDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminWriteMapper {

    public int insertArticle(ArticleDTO article);

    public ArticleDTO selectArticleDetail(Long idx);  // idx : 게시글 번호

    public int updateArticle(ArticleDTO article);

    public int deleteArticle(Long idx);

    public List<ArticleDTO> selectArticleList();

    public int selectArticleTotalCount();

}
