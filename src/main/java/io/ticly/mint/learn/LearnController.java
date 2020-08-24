package io.ticly.mint.learn;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.learn.model.dto.LearnArticleDTO;
import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.learn.model.dto.VocaGroupDTO;
import io.ticly.mint.learn.model.service.LearnService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
        MemberDTO memberDTO = (MemberDTO)model.getAttribute("userInfo");

        if(memberDTO == null) {
            return "redirect:/";
        }

        if(memberDTO != null) {
            if(memberDTO.getEmail() == null) {
                return "redirect:/";
            }
        }

        UserLearnDTO userLearnDTO = UserLearnDTO.builder()
                .email(memberDTO.getEmail())
                .article_seq(seq)
                .build();
        learnService.saveUserLearning(userLearnDTO);
        int userLearningSeq = learnService.getUserLearning(userLearnDTO);
        userLearnDTO.setUser_learning_seq(userLearningSeq);
        if(learnService.getGroupDataCheck(userLearnDTO)) {
            learnService.saveArticleGroupToUser(userLearnDTO);
        }
        if(learnService.getUserVocaCheck(userLearnDTO)) {
            learnService.saveArticleVocaToUser(userLearnDTO);
        }
        LearnArticleDTO learnArticleDTO = learnService.getArticle(userLearnDTO);
        learnArticleDTO.setUser_learning_seq(userLearningSeq);
        model.addAttribute("currentArticle", learnArticleDTO);
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
     * 단어 그룹 가져오는 메소드
     * @param userLearnDTO
     * @return
     */
    @PostMapping(value="getVocaGroupList")
    @ResponseBody
    private List<VocaGroupDTO> getVocaGroupList(@RequestBody UserLearnDTO userLearnDTO, Model model) {
        MemberDTO memberDTO = (MemberDTO)model.getAttribute("userInfo");
        userLearnDTO.setEmail(memberDTO.getEmail());
        return learnService.getVocaGroupList(userLearnDTO);
    }

    /**
     * 전체 Progress 계산
     * @param userLearnDTO
     * @return
     */
    @PostMapping(value="getProgressPercent")
    @ResponseBody
    public Map<String, Integer> getProgressPercent(@RequestBody UserLearnDTO userLearnDTO, Model model) {
        MemberDTO memberDTO = (MemberDTO)model.getAttribute("userInfo");
        userLearnDTO.setEmail(memberDTO.getEmail());
        Map<String, Integer> resultMap = new HashMap<>();
        resultMap.put("percent", learnService.getProgressPercent(userLearnDTO));
        return resultMap;
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

    /**
     * 유저 단어 수정 메소드
     * @param vocaDTO
     * @return
     * @throws SQLException
     */
    @PostMapping(value="updateUserWord")
    @ResponseBody
    public boolean updateUserWord(@RequestBody VocaDTO vocaDTO) throws SQLException {
        return learnService.updateUserWord(vocaDTO);
    }

    /**
     * 마지막단어 업데이트
     * @param vocaDTO
     * @return
     * @throws SQLException
     */
    @PostMapping(value="updateLastVoca")
    @ResponseBody
    private boolean updateLastVoca(@RequestBody VocaDTO vocaDTO) throws SQLException {
        return learnService.updateLastVoca(vocaDTO);
    }

    /**
     * 단어그룹 추가 메소드
     * @param vocaGroupDTO
     * @return
     * @throws SQLException
     */
    @PostMapping(value="saveVocaGroup")
    @ResponseBody
    private boolean saveVocaGroup(@RequestBody VocaGroupDTO vocaGroupDTO, Model model) throws SQLException {
        MemberDTO memberDTO = (MemberDTO)model.getAttribute("userInfo");
        vocaGroupDTO.setEmail(memberDTO.getEmail());
        return learnService.saveVocaGroup(vocaGroupDTO);
    }

    @PostMapping(value="deleteVocaGroup")
    @ResponseBody
    private boolean deleteVocaGroup(@RequestBody VocaGroupDTO vocaGroupDTO) throws SQLException {
        return learnService.deleteVocaGroup(vocaGroupDTO);
    }
}
