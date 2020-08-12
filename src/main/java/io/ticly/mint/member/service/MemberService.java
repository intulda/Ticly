package io.ticly.mint.member.service;

import io.ticly.mint.member.dao.MemberDAO;
import io.ticly.mint.member.dto.MemberDTO;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private MemberDAO memberDAO;

    public MemberService(MemberDAO memberDAO) {
        this.memberDAO = memberDAO;
    }

    /**
     * 로그인시 가입여부 확인
     * @param memberDTO
     * @return 1이면 로그인 가능, 1이 아니면 로그인 불가
     */
    public int findMemberSignin(MemberDTO memberDTO){
        int result = memberDAO.findMemberSignin(memberDTO);
        return result;
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
     * @param memberDTO
     * @return
     */
    public int insertNewMember(MemberDTO memberDTO){

        //닉네임 가져오기
        String email = memberDTO.getEmail();
        int nicknamePoint = email.indexOf("@");
        String nickname = email.substring(0,nicknamePoint);
        memberDTO.setNickname(nickname);

        //Dao로 넘기기
        return memberDAO.insertNewMember(memberDTO);
    }
}
