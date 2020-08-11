package io.ticly.mint;

import io.ticly.mint.admin.mapper.AdminWriteMapper;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.dto.ArticleSentenceDTO;
import io.ticly.mint.login.model.dao.LoginDAO;
import io.ticly.mint.login.model.dto.LoginDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.util.List;

@SpringBootTest
public class MapperTests {

    @Autowired
    private ArticleDAO articleDAO;

    @Autowired
    private LoginDAO loginDAO;


    @Test
    public void testOfInsert() throws Exception {
        ArticleDTO articleDTO = new ArticleDTO();
        ArticleSentenceDTO articleSentenceDTO = new ArticleSentenceDTO();
        articleDTO.setTitle(" Article 제목 ");
        articleDTO.setSummary(" Article 요약 ");
        articleSentenceDTO.setEng_sentence(" Article 문장 1 입니다. ");
        articleDTO.setUrl("http://aaa.com");
        articleDTO.setHashtag("#test #hash");
        articleDTO.setCategory_seq(2);
        articleDTO.setReg_date("2020/08/11 11:05:05");
        articleDTO.setDel(0);
        articleDTO.setApply_count(10);


        // List<LoginDTO> list = loginDAO.getMember();

       int result = articleDAO.WriteArticle(articleDTO);

        System.out.println("결과는" + 1 + "입니다." );

    }

}
