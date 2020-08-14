package io.ticly.mint;

import io.ticly.mint.admin.mapper.AdminWriteMapper;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.dto.ArticleSentenceDTO;
import io.ticly.mint.admin.model.dto.ArticleVocabookDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.util.List;


@SpringBootTest
public class AdminMapperTests {

    @Autowired
    private ArticleDAO articleDAO;

    /* ARTICLE table DB Test */
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


       int result = articleDAO.WriteArticle(articleDTO);

        System.out.println("결과는" + 5959 + "입니다." );

    }

    @Test
    public void testOfAxiosData() throws Exception {
        ArticleDTO articleDTO = new ArticleDTO();
        ArticleDAO articleDAO = new ArticleDAO();



        int result = articleDAO.WriteArticle(articleDTO);
        System.out.println("Success");
    }


    /* ARTICLE + ARTICLE_VOCABOOK table DB Test */
    @Test
    public void testOfInsertVOCABOOK() throws Exception {
        ArticleDTO articleDTO = new ArticleDTO();
        ArticleSentenceDTO articleSentenceDTO = new ArticleSentenceDTO();
        ArticleVocabookDTO articleVocabookDTO = new ArticleVocabookDTO();
        articleDTO.setTitle(" Article 제목 ");
        articleDTO.setSummary(" Article 요약 ");
        articleSentenceDTO.setEng_sentence(" Article 문장 1 입니다. ");
        articleDTO.setUrl("http://aaa.com");
        articleDTO.setHashtag("#test #hash");
        articleDTO.setCategory_seq(2);
        articleDTO.setReg_date("2020/08/11 11:05:05");
        articleDTO.setDel(0);
        articleDTO.setApply_count(10);
        articleVocabookDTO.setArticle_seq(43);
        articleVocabookDTO.setMeaning_num(1);
        articleVocabookDTO.setVoca("starbucks");
        articleVocabookDTO.setVoca_order(1);                // 아직 X



        int result = articleDAO.WriteArticle(articleDTO);

        System.out.println("VOCA 잘 들어갔을 듯????? 확인 ㄱㄱ" );

    }



}


