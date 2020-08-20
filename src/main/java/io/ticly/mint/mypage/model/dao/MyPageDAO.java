package io.ticly.mint.mypage.model.dao;

import io.ticly.mint.mypage.model.dto.MyPageDTO;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MyPageDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public MyPageDAO(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    /**
     * 닉네임 입력창 경고문 출력
     * @param mypageDTO
     * @return
     */
    public int changeNewNickname(MyPageDTO mypageDTO) {
        int result = sqlSessionTemplate.selectOne("mypageMapper.nickChangeInput", mypageDTO);
        return result;
    }

    /**
     * 현재 비밀번호 입력창 경고문 출력
     * @param mypageDTO
     * @return
     */
    public int checkPresentPassword(MyPageDTO mypageDTO) {
        int result = sqlSessionTemplate.selectOne("mypageMapper.presentPasswordInput", mypageDTO);
        return result;
    }

    /**
     * 닉네임 변경 버튼 클릭 후 출력
     * @param mypageDTO
     * @return
     */
    public int changeButtonNickname(MyPageDTO mypageDTO) {
        int result = sqlSessionTemplate.update("mypageMapper.nickChangeButton", mypageDTO);
        return result;
    }

    /**
     * 비밀번호 변경 버튼 클릭 후 출력
     * @param mypageDTO
     * @return
     */
    public int changeButtonPassword(MyPageDTO mypageDTO) {
        int result = sqlSessionTemplate.update("mypageMapper.passwordChangeButton", mypageDTO);
        return result;
    }

    /**
     * 탈퇴하기 버튼 클릭 후 출력
     * @param mypageDTO
     * @return
     */
    public int withdrawalButtonId(MyPageDTO mypageDTO) {
        int result = sqlSessionTemplate.update("mypageMapper.idWithdrawalButton", mypageDTO);
        return result;
    }



}