package io.ticly.mint.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class AdminController {

    @GetMapping("/hello")
    public String sayHello() {
        return "/admin/AdminArticleWrite";
    }

    @GetMapping("/WriteTest")
    public String Test() {
        return "/admin/AdminArticleWriteDemo";
    }



}
