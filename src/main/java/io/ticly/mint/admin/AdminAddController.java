package io.ticly.mint.admin;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.service.AdminFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    /*
    @Autowired
    ArticleDAO dao;
    */

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
        String title = request.getParameter("title");

        return "/admin/AdminWriteDetail";
    }

    /* 아티클 Write Form */
    @RequestMapping("/writeForm")
    public String adminWrite() {
        return "/admin/AdminArticleWriteDemo";
    }

    /* 아티클 정보 hashmap에 넣어주는 부분 */
    @RequestMapping(value="/write", method=RequestMethod.POST)
    public String adminWrite(HttpServletRequest request, HttpServletResponse response,
                             Model model, MultipartFile file) throws IOException {

        String title = request.getParameter("title");
        String url = request.getParameter("url");
        String summary = request.getParameter("summary");
        String hashtag = request.getParameter("hashtag");
        String content = request.getParameter("content");


        // Map : 아티클 기본 정보
        Map<String, String> map = new HashMap<String, String>();
        map.put("title", title);
        map.put("url", url);
        map.put("summary", summary);
        map.put("hashtag", hashtag);
        map.put("content", content);


        /* 단어, 뜻 sysout 출력 */
        String[] insert_word = request.getParameterValues("insertword");
        String[] insert_mean = request.getParameterValues("insertmean");

        System.out.println("단어: " + Arrays.toString(insert_word) + "\n" + "뜻: " + Arrays.toString(insert_mean));


        /* Voca 데이터들을 넣어준다 */
/*
        Map<String[], String[]> vocaMap = new HashMap<>();
        for(int i=0; i < insert_word.length < i++){
            vocaMap.put(insert_word[], insert_mean[]);
        }*/


        /* 등록된 모든 단어 출력 */
        /*
        Set<String[]> keys = vocamap.keySet(); // key 문자열을 가진 Set 리턴
        Iterator<String[]> it = keys.iterator();
        while(it.hasNext()) {
            String[] key = it.next();
            String[] value = vocamap.get(key);
            System.out.println("(" + key + "," + value + ")");
        }

        */

        /* 아티클 정보 받기 */
        int nResult = dao.writeArticleDao(map);
        System.out.print("Write : " +nResult );

        return "redirect:ArticleList";
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
