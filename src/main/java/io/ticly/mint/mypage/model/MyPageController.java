package io.ticly.mint.mypage.model;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyPageController {

    @GetMapping("/hello")
    public String sayHello() {
        return "/mypage/myPage";
    }

}
