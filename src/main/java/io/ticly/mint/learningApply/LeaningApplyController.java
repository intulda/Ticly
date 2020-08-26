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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@SessionAttributes({"userInfo", "learningApplyInfo"})
@RequestMapping(value="/learningApply/*")
public class LeaningApplyController {

    private ArticleBoardService articleBoardService;
    private LearningApplyService learningApplyService;

    public LeaningApplyController(LearningApplyService learningApplyService) {
        this.learningApplyService = learningApplyService;
    }

    // 아티클 찾기 페이지에서 학습 신청페이지로 이동시,
    @GetMapping(value ="goToLeaningApply")
    public String getArticleInfo(Model model, HttpServletRequest req, RedirectAttributes redirectAttributes, HttpServletResponse response){
        MemberDTO user = (MemberDTO) model.getAttribute("userInfo");
        String seqStr = req.getParameter("seq");
        int seq = Integer.parseInt(req.getParameter("seq"));

        System.out.println("auth : " + user.getAuth());
        System.out.println("seqStr : " + seqStr);
        // 만약 로그인을 한 상태라면?
        if(user.getAuth() != 1){
            System.out.println("로그인한 상태 : " + true);
            // 이미 학습하기 신청이 되어 있다면?
            if (learningApplyService.checkUserLearningArticle(seqStr, user.getEmail()) == 1){
                System.out.println("학습하기 상태 : " + true);
                redirectAttributes.addAttribute("seq", seq);
                return "redirect:/learn/workBook";
            }
        }

        // 학습하기 신청을 하지 않았다면?
        ArticleInfoDTO list = learningApplyService.getArticleInfo(seq);
        model.addAttribute("articleInfo", list);

        response.setHeader("X-Frame-Options", "ALLOW-FROM http://abc.com");

        return "learningApply/readArticle";
    }

    // 학습 신청 페이지에서 [바로 학습하기] 버튼 클릭시
    // 이전경로, 다음 경로, auth를 세션에 저장시켜주기
    @GetMapping(value ="saveLearningApplyInfo")
    @ResponseBody
    public LearningApplyInfoDTO saveLearningApplyInfo(Model model, HttpServletRequest req){

        int seq = Integer.parseInt(req.getParameter("seq"));
        String previousPath = req.getParameter("previousPath");

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
