package io.ticly.mint.articleBoard.model.dao;

import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArticleBoardDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public ArticleBoardDAO(SqlSessionTemplate sqlSessionTemplate){
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

//    public boolean saveCategory(GuestDTO guestDTO){
//        int count = sqlSessionTemplate.insert("articleBoardDAO.saveCategory");
//        return count > 0 ? true : false;
//    }

    public List<ArticleInfoDTO> findMyTypeArticle(List<String> categoryArr){
        // 쿼리문에 넣어주기 위해 배열을 ',' 단위로 이어주기
        String category = "";
        for (int i = 0; i < categoryArr.size(); i++) {
            category += "'" + categoryArr.get(i) + "'";
            System.out.println(categoryArr.get(i));

            if(i < categoryArr.size() -1) {
                category += ", ";
            }
        }

        List<ArticleInfoDTO> list = sqlSessionTemplate.selectList("articleBoardDAO.findMyTypeArticle", category);
        return list;
    }
}
