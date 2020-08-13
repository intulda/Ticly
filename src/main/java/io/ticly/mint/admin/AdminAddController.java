package io.ticly.mint.admin;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.admin.model.service.AdminArticleWriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/AdminWrite")
public class AdminAddController {

    @Autowired
    AdminArticleWriteService adminArticleWriteService;

/*    @RequestMapping("/hello")
    public String sayHello() {
        return "/admin/AdminArticleWrite";
    }*/

    @RequestMapping("/list")
    public String list(Model model) throws Exception {
        model.addAttribute("list", adminArticleWriteService.ArticleListAll());
        return "ArticleDAO/list";
    }

    @RequestMapping("/read")
    public String read(@RequestParam("ArticleNum") int anum, Model model) throws Exception {
        model.addAttribute("article", adminArticleWriteService.ArticleDetail(anum));
        return "ArticleDAO/read";
    }

    @GetMapping("write")
    public String writeForm() {
        return "ArticleDAO/write";
    }

    @PostMapping("write")
    public String write(@ModelAttribute("article") ArticleDTO articleDTO) throws Exception {
        // service = new AdminArticleWriteServiceImpl();
        System.out.println("article");
        adminArticleWriteService.WriteArticle(articleDTO);
        return "redirect:list";
    }

    @RequestMapping("update")
    public String modify(@ModelAttribute("article") ArticleDAO articleDAO) throws Exception {
        // service = new AdminArticleWriteServiceImpl();
        adminArticleWriteService.ArticleUpdate(articleDAO);
        return "redirect:list";
    }

    @RequestMapping("delete")
    public String Delete(@ModelAttribute("ArticleNum") int anum) throws Exception {
        // service = new AdminArticleWriteServiceImpl();
        adminArticleWriteService.ArticleDelete(anum);
        return "ArticleDAO/admin";
    }







}
