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

    public List<ArticleInfoDTO> findMyTypeArticle(List<String> categoryList){
        // 쿼리문에 넣어주기 위해 배열을 ',' 단위로 이어주기
        String categoryStr = "";
        for (int i = 0; i < categoryList.size(); i++) {
            categoryStr += "\'" + categoryList.get(i) + "\'";
            System.out.println(categoryList.get(i));

            if(i < categoryList.size() -1) {
                categoryStr += ", ";
            }
        }

        return sqlSessionTemplate.selectList("articleBoardDAO.findMyTypeArticle", categoryStr);
    }
}
