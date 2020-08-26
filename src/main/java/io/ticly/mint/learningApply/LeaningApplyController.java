package io.ticly.mint.learningApply;


import io.ticly.mint.articleBoard.model.dto.ArticleInfoDTO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.articleBoard.model.service.ArticleBoardService;
import io.ticly.mint.learningApply.model.dto.LearningApplyInfoDTO;
import io.ticly.mint.learningApply.model.service.LearningApplyService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;

@Controller
@SessionAttributes({"userInfo", "learningApplyInfo"})
@RequestMapping(value="/learningApply/*")
public class LeaningApplyController {

    private ArticleBoardService articleBoardService;
    private LearningApplyService learningApplyService;

    public LeaningApplyController(LearningApplyService learningApplyService) {
        this.learningApplyService = learningApplyService;
    }

    // 내 학습 보드로 단순 이동
    @GetMapping(value ="goToLeaningApply")
    public String getArticleInfo(Model model, HttpServletRequest req){

        int seq = Integer.parseInt(req.getParameter("seq"));
        ArticleInfoDTO list = learningApplyService.getArticleInfo(seq);

        model.addAttribute("articleInfo", list);
        return "learningApply/readArticle";
    }

    @GetMapping(value ="saveLearningApplyInfo")
    @ResponseBody
    public LearningApplyInfoDTO saveLearningApplyInfo(Model model, HttpServletRequest req){

        int seq = Integer.parseInt(req.getParameter("seq"));
        String previousPath = req.getParameter("previousPath");

        System.out.println("seq" + seq);
        System.out.println("previousPath" + previousPath);

        MemberDTO user = (MemberDTO) model.getAttribute("userInfo");

        // 등록되어 있지 않은 유저라면, 임시 데이터를 등록해준다.
        if (user == null) {
            user = articleBoardService.setMember(user);
        }

        // 학습하기 신청 DTO에 등록하기
        LearningApplyInfoDTO learningApplyInfo = new LearningApplyInfoDTO();
        learningApplyInfo.setAuth(user.getAuth());
        learningApplyInfo.setPrevious_path(previousPath);
        learningApplyInfo.setArticle_path("/learn/workBook?seq=" + seq);
        model.addAttribute("learningApplyInfo", learningApplyInfo);

        return learningApplyInfo;
    }
}
