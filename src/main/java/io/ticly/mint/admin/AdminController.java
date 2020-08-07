package io.ticly.mint.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminController {

    @GetMapping("/hello")
    public String sayHello() {
        return "/admin/AdminArticleWrite";
    }

}
