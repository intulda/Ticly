package io.ticly.mint.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dao.ArticleSentenceDAO;
import io.ticly.mint.admin.model.dao.VocabookDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.service.AdminFileUploadService;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

@Controller
public class AdminAddController {

    @Autowired
    AdminFileUploadService adminFileUploadService;

    @Autowired
    ArticleDAO dao;

    @Autowired
    VocabookDAO vocabookdao;

    ArticleSentenceDAO articleSentenceDAO;


    private static final String SAVE_PATH = "/fileimages";
    private static final String PREFIX_URL = "/fileimages/";
    private String voca = "";
    private String meaning = "";


    /* 아티클 목록 */
    @RequestMapping("/ArticleList")
    public String ArticleList(Model model) {

        model.addAttribute("list", dao.ArticleListDao());

        int nTotalCount = dao.ArticleCount();
        System.out.println("총 아티클 갯수: " + nTotalCount);

        return "/admin/AdminArticleCatalog";
    }


    /* 아티클 등록시 Detail을 확인할 수 있는 메소드 OK */
    @RequestMapping(value="/AdminWriteDetail", method=RequestMethod.GET)
    public String articleDetail(HttpServletRequest request, Model model) {
        String title = request.getParameter("articleseq");
        ArticleDTO article = dao.ArticleDetailDao(title);
        model.addAttribute("article", article);
        return "/admin/AdminWriteDetail";
    }

    /* 아티클 Write Form */
    @RequestMapping("/writeForm")
    public String adminWrite() {
        return "/admin/AdminArticleWriteDemo";
    }

    /* 아티클 정보 Json에 넣어주는 부분 */
    @RequestMapping(value="/write", method=RequestMethod.POST)
    @ResponseBody
    public String adminWrite(ArticleDTO data, MultipartHttpServletRequest mpRequest, HttpServletResponse response,
                             Model model) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        String param = mpRequest.getParameter("data");
        ArticleDTO dto = mapper.readValue(param, ArticleDTO.class);

        MultipartHttpServletRequest file = mpRequest;

        String category = dto.getCategory();
        String title = dto.getTitle();
        String summary = dto.getSummary();
        String url = dto.getUrl();
        String content = dto.getContents();
        String hashtag = dto.getHashtag();


        /* 카테고리 SEQ 값으로 바꿔주기 */
        int category_seq=0;

        switch(category){
            case "개발":
                category_seq = 1;
                break;
            case "UI/UX":
                category_seq = 2;
                break;
            case "브랜딩":
                category_seq = 3;
                break;
            case "마케팅":
                category_seq = 4;
                break;
            case "경제":
                category_seq = 5;
                break;
            default:
                System.out.println("category Missing Error");
        }



        Map<String, Object> map = new HashMap<String, Object>();

        // map.put("category", category);
        map.put("title", title);
        map.put("url", url);
        map.put("summary", summary);
        map.put("hashtag", hashtag);
        map.put("content", content);
        map.put("category_seq", category_seq);


        System.out.println("category:" + category + " title: " + title + " " + "url: " + url + " " +
                "\n" + "summary: " + summary + "hashtag: " + hashtag + "content: " + content );

        int nResult = dao.writeArticleDao(map);


        // VOCABOOK 테이블에 넣어주기

        String voca = "";
        String meaning = "";

        List<VocaDTO> _vocaDTO = dto.getVocaDTOS();
        Map<String, String> wordSetMap = new HashMap<String, String>();

        for (int i=0; i<_vocaDTO.size(); i++) {

            VocaDTO str = _vocaDTO.get(i);

            voca = str.getVoca();
            meaning = str.getMeaning();

            System.out.println("voca:" + voca + " / " + "meaning:" + meaning);

            wordSetMap.put("voca", voca);
            wordSetMap.put("meaning", meaning);
        }


        int wordSet = vocabookdao.saveVocabookDao(wordSetMap);


        // 문장 받아와서 . 단위로 자르고 Article_sentence 넣어주기

        String artContent = dto.getContents();
        String[] senArray = artContent.split(".");
        List<String> senList = Arrays.asList(senArray);
        System.out.println(senList);

        int SentenceSet = articleSentenceDAO.saveArticleSentenceDao(senList);


        return "redirect:ArticleList";
    }

    /* 아티클 목록에서 삭제 */
    @RequestMapping(value="/delete", method=RequestMethod.GET )
    public String Delete(int article_seq) throws Exception {
        dao.deleteArticleDao(article_seq);
        return "redirect:ArticleList";
    }

}
