package io.ticly.mint.learn.model.service;

import io.ticly.mint.learn.model.dao.LearnDAO;
import io.ticly.mint.learn.model.dto.LearnArticleDTO;
import io.ticly.mint.learn.model.dto.UserLearnDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import io.ticly.mint.util.CommonUtil;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

/**
 * 학습하기 Service
 * @create 2020.08.11
 */
@Service
public class LearnService {

    private LearnDAO learnDAO;

    public LearnService(LearnDAO learnDAO) {
        this.learnDAO = learnDAO;
    }

    /**
     * 아티클을 가져오는 메소드
     * @param userLearnDTO
     * @return
     */
    public LearnArticleDTO getArticle(UserLearnDTO userLearnDTO) throws SQLException {
        LearnArticleDTO articleDTO =  learnDAO.getArticle(userLearnDTO);
        String image = CommonUtil.blobImageChange(articleDTO.getFile_contents());
        articleDTO.setFile_url(image);
        return articleDTO;
    }

    /**
     * User-Learning 저장하는 메소드
     * @param userLearnDTO
     * @throws SQLException
     */
    public void saveUserLearning(UserLearnDTO userLearnDTO) throws SQLException {
        int count = learnDAO.saveUserLearning(userLearnDTO);
        if(count <= 0) {
            throw new SQLException("USER-LEARNING 테이블 삽입 실패");
        }
    }

    /**
     * UserVoca에 이미 넣은 값이 있는지 확인하는 메소드
     * @param userLearnDTO
     * @return
     */
    public boolean getUserVocaCheck(UserLearnDTO userLearnDTO) {
        return learnDAO.getUserVocaCheck(userLearnDTO) <= 0 ? true : false;
    }

    /**
     * 아티클 보카의 단어를 유저 보카에 저장하는 메소드
     * @param userLearnDTO
     * @throws SQLException
     */
    public void saveArticleVocaToUser(UserLearnDTO userLearnDTO) throws SQLException {
        int count = learnDAO.saveArticleVocaToUser(userLearnDTO);

        if(count <= 0) {
            throw new SQLException("아티클 보카 -> 유저 보카로 insert 실패");
        }
    }

    /**
     * UserVocaList를 가져오는 메소드
     * @param userLearnDTO
     * @return
     */
    public List<VocaDTO> getVocaList(UserLearnDTO userLearnDTO) {
        return learnDAO.getVocaList(userLearnDTO);
    }

    public boolean saveWordReading(VocaDTO vocaDTO) throws SQLException {
        int count = learnDAO.saveWordReading(vocaDTO);
        if(count <= 0) {
            throw new SQLException("CheckReading Update error");
        }
        return true;
    }
}
