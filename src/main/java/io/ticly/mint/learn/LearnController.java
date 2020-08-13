package io.ticly.mint.learn;

import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.learn.model.service.LearnService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;


/**
 * 학습하기 Controller
 * @create 2020.08.11
 */
@Controller
@SessionAttributes("userInfo")
@RequestMapping(value="/learn/*")
public class LearnController {

    private LearnService learnService;

    public LearnController(LearnService learnService) {
        this.learnService = learnService;
    }

    /**
     * view page 이동
     * @param model
     * @return
     */
    @GetMapping(value="workBook")
    public String view(Model model, int seq) throws SQLException {
        UserLearnDTO userLearnDTO = UserLearnDTO.builder()
                .email("test4@naver.com")
                .articleSeq(seq)
                .build();
        learnService.saveUserLearning(userLearnDTO);
        if(learnService.getUserVocaCheck(userLearnDTO)) {
            learnService.saveArticleVocaToUser(userLearnDTO);
        }
        model.addAttribute("currentArticle", learnService.getArticle(userLearnDTO));
        return "learn/leaning";
    }

    /**
     * UserVocaList를 가져오는 메소드
     * @param userLearnDTO
     * @return
     */
    @PostMapping(value="getVocaList")
    @ResponseBody
    private List<VocaDTO> getVocaList(@RequestBody UserLearnDTO userLearnDTO) {
        return learnService.getVocaList(userLearnDTO);
    }

}
