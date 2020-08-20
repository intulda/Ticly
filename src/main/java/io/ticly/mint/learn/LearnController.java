package io.ticly.mint.learn;

import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.learn.model.service.LearnService;
import org.apache.ibatis.jdbc.SQL;
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
                .article_seq(seq)
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

    /**
     * 단어 진행사항 업데이트 메소드
     * @param vocaDTO
     * @return
     * @throws Exception
     */
    @PostMapping(value="saveWordReading")
    @ResponseBody
    private boolean saveWordReading(@RequestBody VocaDTO vocaDTO) throws Exception {
        return learnService.saveWordReading(vocaDTO);
    }

    /**
     * 유저 단어 추가 메소드
     * @param vocaDTO
     * @return
     * @throws SQLException
     */
    @PostMapping(value="saveUserVoca")
    @ResponseBody
    public boolean saveUserVoca(@RequestBody VocaDTO vocaDTO) throws SQLException {
        return learnService.saveUserVoca(vocaDTO);
    }

    /**
     * 유저 단어 삭제 메소드
     * @param vocaDTOS
     * @return
     * @throws SQLException
     */
    @PostMapping(value="deleteUserVoca")
    @ResponseBody
    public boolean deleteUserVoca(@RequestBody List<VocaDTO> vocaDTOS) throws SQLException {
        return learnService.deleteUserVoca(vocaDTOS);
    }

    @PostMapping(value="updateUserWord")
    @ResponseBody
    public boolean updateUserWord(@RequestBody VocaDTO vocaDTO) throws SQLException {
        return learnService.updateUserWord(vocaDTO);
    }
}
