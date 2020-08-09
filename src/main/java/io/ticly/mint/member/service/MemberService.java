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

    //이메일 중복확인 처리
    public int isDuplicateEmail(String email) throws Exception {
        int result = memberDAO.isDuplicateEmail(email);
        return result;
    }

    //가입정보 저장
    public int memberSignup(MemberDTO memberDTO){

        //닉네임 가져오기
        String email = memberDTO.getEmail();
        int nicknamePoint = email.indexOf("@");
        String nickname = email.substring(0,nicknamePoint);
        memberDTO.setNickname(nickname);

        //Dao로 넘기기
        return memberDAO.signup(memberDTO);
    }
}
