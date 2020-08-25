package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface ArticleWriteService{

    public List<ArticleDTO> ArticleList();
    public ArticleDTO ArticleDetail(String title);
    public int writeArticle(Map<String, String> map);
    public int deleteArticle(String article_seq);
    public int ArtCount();

}
