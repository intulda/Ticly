package io.ticly.mint.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dao.VocabookDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.service.AdminFileUploadService;
import io.ticly.mint.learn.model.dto.VocaDTO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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


    /* 아티클 목록 OK */
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

    /* 아티클 정보 hashmap에 넣어주는 부분 */
    @RequestMapping(value="/write", method=RequestMethod.POST)
    @ResponseBody
    public String adminWrite(ArticleDTO data, MultipartHttpServletRequest mpRequest,  HttpServletResponse response,
                             Model model) throws IOException {

        // Json 파싱
        ObjectMapper mapper = new ObjectMapper();

        String param = mpRequest.getParameter("data");
        ArticleDTO dto = mapper.readValue(param, ArticleDTO.class);

        MultipartHttpServletRequest file = mpRequest;


       /* String title = request.getParameter("title");
        String url = request.getParameter("url");
        String summary = request.getParameter("summary");
        String hashtag = request.getParameter("hashtag");
        String content = request.getParameter("content");
        String category = request.getParameter("category");*//*
        // 받아온 request 객체의 category값 저장

        int categoryNum = 0;

        // category 문자열 값에 따라 category seq에 int형으로 저장
        if(category == "개발"){
            categoryNum = 1;
        }
        else if(category == "UI/UX"){
            categoryNum = 2;
        }
        else if(category == "브랜딩"){
            categoryNum = 3;
        }
        else if(category == "마케팅"){
            categoryNum = 4;
        }
        else if(category == "경제"){
            categoryNum = 5;
        }
        else {
            System.out.println("Category error");
        }

        // request 객체에 지정된 카테고리 seq 저장
        request.setAttribute("category_seq", categoryNum);
*//*
        System.out.println("title");
        System.out.println("url");
        System.out.println("summary");
        System.out.println("hashtag");
        System.out.println("content");*/


        // Map : 아티클 기본 정보
     /*   Map<String, String> map = new HashMap<String, String>();
        map.put("title", title);
        map.put("url", url);
        map.put("summary", summary);
        map.put("hashtag", hashtag);
        map.put("content", content);


        *//* 아티클 정보 받기 *//*
        int nResult = dao.writeArticleDao(map);
        System.out.print("Write : " +nResult );
*/
        return "redirect:ArticleList";
//        return articleDTO;
    }

    /* 아티클 목록에서 삭제 */

    @RequestMapping("/delete")
    public String Delete(HttpServletRequest request, Model model) throws Exception {
        String title = request.getParameter("title");
        int nResult = dao.deleteArticleDao("title");
        System.out.println("Delete : " + nResult);

        return "redirect:ArticleList";
    }

    /*
    // 카테고리 바꾸어 저장
    @RequestMapping("/categoryseq")
    public String saveCategory(HttpServletRequest request, Model model){

        String categoryName = request.getParameter("category");
        // 받아온 request 객체의 category값 저장

        int categoryNum = 0;

        // category 문자열 값에 따라 category seq에 int형으로 저장
        if(category == "개발"){
            categoryNum = 1;
        }
        else if(category == "UI/UX"){
            categoryNum = 2;
        }
        else if(category == "브랜딩"){
            categoryNum = 3;
        }
        else if(category == "마케팅"){
            categoryNum = 4;
        }
        else if(category == "경제"){
            categoryNum = 5;
        }
        else {
            out.println("Category is error");
        }

        // request 객체에 지정된 카테고리 seq 저장
        request.setAttribute("categoryNum", categoryNum);

        // 포워딩
        return "/view.jsp";
    }
    */

}
