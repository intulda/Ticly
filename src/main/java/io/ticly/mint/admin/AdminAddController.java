package io.ticly.mint.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dao.ArticleSentenceDAO;
import io.ticly.mint.admin.model.dao.VocabookDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.service.AdminFileUploadService;
import io.ticly.mint.admin.model.service.ArticleWriteService;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
    @RequestMapping(value="/ArticleList", method=RequestMethod.GET)
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
    public String adminWrite(ArticleDTO data, MultipartHttpServletRequest mpRequest,  HttpServletResponse response,
                             Model model) throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        String voca = null;
        String meaning= null;
        int category_seq=0;

        String param = mpRequest.getParameter("data");
        ArticleDTO dto = mapper.readValue(param, ArticleDTO.class);

        MultipartHttpServletRequest file = mpRequest;

        String category = dto.getCategory();

        if(category == "개발"){
            category_seq = 1;
        }else if(category == "UI/UX"){
            category_seq = 2;
        }else if(category == "브랜딩"){
            category_seq = 3;
        }else if(category == "마케팅"){
            category_seq = 4;
        }else if(category == "경제"){
            category_seq = 5;
        }else{
            category_seq = 0;
        }


        String title = dto.getTitle();
        String summary = dto.getSummary();
        String url = dto.getUrl();
        String content = dto.getContents();
        String hashtag = dto.getHashtag();

        /*
        System.out.println(category);
        System.out.println(title);
        System.out.println(summary);
        System.out.println(url);
        System.out.println(content);
        System.out.println(hashtag);
        */
        /*
        int article_seq = dto.getArticle_seq();
        System.out.println(article_seq);
        */


        List<VocaDTO> _vocaDTO = dto.getVocaDTOS();
        for (int i=0; i<_vocaDTO.size(); i++) {
            VocaDTO str = _vocaDTO.get(i);
            voca = str.getVoca();
            meaning = str.getMeaning();
            System.out.println("voca:" + voca + " / " + "meaning:" + meaning);
        }



        Map<String, String> map = new HashMap<String, String>();

        map.put("category", category);
        map.put("title", title);
        map.put("url", url);
        map.put("summary", summary);
        map.put("hashtag", hashtag);
        map.put("content", content);

        System.out.println("category:" + category + " title: " + title + " " + "url: " + url + " " +
                "\n" + "summary: " + summary + "hashtag: " + hashtag + "content: " + content );

        int nResult = dao.writeArticleDao(map);

        // VOCABOOK 테이블에 넣어주기


        Map<String, String> wordSetMap = new HashMap<String, String>();
            for(int i=0; i< wordSetMap.size(); i++) {
                wordSetMap.put("voca", voca);
                wordSetMap.put("meaning", meaning);
            }
        int wordSet = vocabookdao.saveVocabookDao(wordSetMap);

        // 문장 받아와서 . 단위로 자르고 Article_sentence 넣어주기
        /*
        String artContent = dto.getContents();
        String[] senArray = artContent.split(".");
        List<String> senList = Arrays.asList(senArray);
        System.out.println(senList);

        int SentenceSet = articleSentenceDAO.saveArticleSentenceDao(senList);
        */

        // File Upload 처리
        /*
        MultipartFile multipartfile = mpRequest.getFile("file");

        String path = "C:\\git\\local_mint_mygit\\src\\main\\webapp\\fileimages\\";

        // 원본 파일명
        String originFileName = multipartfile.getOriginalFilename();

        // 파일 사이즈
        long fileSize = multipartfile.getSize();

        System.out.println("originFileName:" + originFileName);
        System.out.println("fileSize:" + fileSize);
        // 확장자만 추출
        String originalFileExtension = originFileName.substring(originFileName.lastIndexOf("."));

        String safeFile = path + System.currentTimeMillis() + originFileName;

        try {
            multipartfile.transferTo(new File(safeFile));
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        */

        /*
        System.out.println(multipartfile.getName());
        System.out.println(multipartfile.getSize());
        System.out.println(multipartfile.getOriginalFilename());
        */




        // UUID 클래스로 문자를 랜덤으로 생성
        // String storedFileName = UUID.randomUUID().toString().replaceAll("-", "") + originalFileExtension;

        // 파일을 저장하기 위한 File 객체
        // File file = new File(path + storedFileName);

        // 업로드 요청으로 전달받은 파일을 위에서 설정한 특정 경로에 특정 파일명으로 저장
        // multipartfile.transferTo(file);


        return "redirect:ArticleList";
    }

    /* 아티클 목록에서 삭제 */
    @RequestMapping("/delete")
    public String Delete(HttpServletRequest request, Model model) throws Exception {
        String article_seq = request.getParameter("article_seq");
        int article = dao.deleteArticleDao("article_seq");
        model.addAttribute("article", article);
        dao.deleteArticleDao(article_seq);

        int dResult = dao.deleteArticleDao(article_seq);

         return "redirect:ArticleList";
    }


}
