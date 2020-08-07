package io.ticly.mint.articleBoard;

import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/articleBoard/*")
public class ArticleBoardController {

    private ArticleBoardService articleBoardService;

    public ArticleBoardController(ArticleBoardService articleBoardService){
        this.articleBoardService = articleBoardService;
    }
}
