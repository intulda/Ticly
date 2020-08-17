package io.ticly.mint;

import io.ticly.mint.admin.mapper.AdminWriteMapper;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.dto.ArticleSentenceDTO;
import io.ticly.mint.admin.model.dto.ArticleVocabookDTO;
import io.ticly.mint.admin.model.dto.FileDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.util.List;

@SpringBootTest
public class MapperTests {

    @Autowired
    private ArticleDAO articleDAO;


    @Test
    public void testOfInsert() throws Exception {
        ArticleDTO articleDTO = new ArticleDTO();
        ArticleSentenceDTO articleSentenceDTO = new ArticleSentenceDTO();
        articleDTO.setArticle_seq(50);
        articleDTO.setTitle(" 2020-08-17 Test Article 제목 ");
        articleDTO.setSummary(" Article 요약 ");
        articleSentenceDTO.setEng_sentence(" Article 문장 1 입니다. ");
        articleDTO.setUrl("http://aaa.com");
        articleDTO.setHashtag("#test #hash");
        articleDTO.setCategory_seq(2);
        articleDTO.setReg_date("2020/08/11 11:05:05");
        articleDTO.setDel(0);
        articleDTO.setApply_count(10);


        int result = articleDAO.WriteArticle(articleDTO);

        System.out.println("결과는" + 1 + "입니다." );
    }


    public void testOfFileInsert() throws Exception {
        FileDTO fileDTO = new FileDTO();
        fileDTO.setFile_seq(1);
        fileDTO.setFile_key(" blq8VDb5FUcampALSN1JNg ");
        fileDTO.setFile_type(" A ");
        fileDTO.setFile_name(" sweetycat ");
        fileDTO.setFile_origin_name(" origin_sweetycat ");
        // fileDTO.setFile_contents(" ");
        fileDTO.setFile_ext(" jpg ");
        fileDTO.setFile_size(" 12434234 ");
        fileDTO.setReg_date("2020/08/17 17:37:00");
        fileDTO.setReg_email("aaa@aaa.com");
        fileDTO.setUdt_date("2020/08/17 20:00:00");
        fileDTO.setUdt_email("aaa@aaa.com");



    }


}