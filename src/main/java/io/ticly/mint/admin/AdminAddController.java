package io.ticly.mint.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dao.VocabookDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.service.AdminFileUploadService;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    VocabookDAO vocabookDAO;


    private static final String SAVE_PATH = "/fileimages";
    private static final String PREFIX_URL = "/fileimages/";


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
    public String adminWrite(ArticleDTO data, MultipartHttpServletRequest mpRequest,  HttpServletResponse response,
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

        /*
        System.out.println(category);
        System.out.println(title);
        System.out.println(summary);
        System.out.println(url);
        System.out.println(content);
        System.out.println(hashtag);
        */

        List<VocaDTO> _vocaDTO = dto.getVocaDTOS();
        for (int i=0; i<_vocaDTO.size(); i++) {
            VocaDTO str = _vocaDTO.get(i);
            System.out.println(_vocaDTO.get(i));
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

        return "redirect:ArticleList";
    }

    /* 아티클 목록에서 삭제 */
    @RequestMapping("/delete")
    public String Delete(HttpServletRequest request, Model model) throws Exception {
        String title = request.getParameter("articleseq");
        int article = dao.deleteArticleDao("article_seq");
        model.addAttribute("article", article);

        return "redirect:ArticleList";
    }


}
