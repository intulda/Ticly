package io.ticly.mint.member.service;

import io.ticly.mint.member.dao.MemberDAO;
import io.ticly.mint.member.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class MemberService {

    private MemberDAO memberDAO;

    public MemberService(MemberDAO memberDAO) {
        this.memberDAO = memberDAO;
    }

    /**
     * 로그인시 가입여부 확인
     * @param userDTO
     * @return
     */
    public UserDTO findMemberSignin(UserDTO userDTO){
        return memberDAO.findMemberInfo(userDTO);
    }

    public List<String> getUserCategories(String email){
        return memberDAO.getUserCategories(email);
    }

    public void saveUserCategories(String email, List<String> categories){

        /*
        for (int i=0;)

        int count = memberDAO.saveUserCategories(email, category_);

        if(count <= 0) {
        //  throw new SQLException("세션 카테고리 -> DB에 insert 실패");
            System.out.println("세션 카테고리 -> DB에 insert 실패");
        }
        */
    }

    /**
     * 이메일 중복확인 처리
     * @param email
     * @return
     */
    public int findDuplicateEmail(String email) {
        int result = memberDAO.findDuplicateEmail(email);
        return result;
    }

    /**
     * 회원가입 데이터 저장
     * @param userDTO
     * @return
     */
    public int insertNewMember(UserDTO userDTO){

        //닉네임 가져오기
        String email = userDTO.getEmail();
        int nicknamePoint = email.indexOf("@");
        String nickname = email.substring(0,nicknamePoint);
        userDTO.setNickname(nickname);

        //Dao로 넘기기
        return memberDAO.insertNewMember(userDTO);
    }
}
