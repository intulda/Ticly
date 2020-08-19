package io.ticly.mint.mypage.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.mypage.model.dao.MyPageDAO;
import io.ticly.mint.mypage.model.dto.MyPageDTO;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {
    private MyPageDAO mypageDAO;

    public MyPageService(MyPageDAO mypageDAO) {
        this.mypageDAO = mypageDAO;
    }

    /**
     * 닉네임 입력창 경고문 출력
     * @return
     */
    public int changeNewNickname(MyPageDTO mypageDTO) {
        int result = mypageDAO.changeNewNickname(mypageDTO);
        return result;
    }

    /**
     * 현재 비밀번호 입력창 경고문 출력
     * @return
     */
    public int checkPresentPassword(MyPageDTO mypageDTO) {
        int result = mypageDAO.checkPresentPassword(mypageDTO);
        return result;
    }

    /**
     * 닉네임 변경 버튼 클릭 후 출력
     * @return
     */
    public int changeButtonNickname(MyPageDTO mypageDTO) {
        int result = mypageDAO.changeButtonNickname(mypageDTO);
        return result;
    }

    /**
     * 비밀번호 변경 버튼 클릭 후 출력
     * @return
     */
    public int changeButtonPassword(MyPageDTO mypageDTO) {
        int result = mypageDAO.changeButtonPassword(mypageDTO);
        return result;
    }

    /**
     * 탈퇴하기 버튼 클릭 후 출력
     * @return
     */
    public int withdrawalButtonId(MyPageDTO mypageDTO) {
        int result = mypageDAO.withdrawalButtonId(mypageDTO);
        return result;
    }




}
