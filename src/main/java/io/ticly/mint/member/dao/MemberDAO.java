package io.ticly.mint.member.dao;

import io.ticly.mint.member.dto.MemberDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public MemberDAO(SqlSessionTemplate sqlSessionTemplate) {

        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    /**
     * 로그인시 가입 여부 확인
     * @param memberDTO
     * @return
     */
    public int findMemberSignin(MemberDTO memberDTO){
        System.out.println(memberDTO.getEmail() +" " + memberDTO.getPassword());
        int result = sqlSessionTemplate.selectOne("memberMapper.findMemberSignin", memberDTO);
        System.out.println("MemberDTO result : "+ result);
        return result;
    }

    /**
     * 회원가입시 이메일 중복 확인
     * @param email
     * @return
     */
    public int findDuplicateEmail(String email){
        int result = sqlSessionTemplate.selectOne("memberMapper.checkEmail", email);
        return result;
    }

    /**
     * 회원가입시 멤버 데이터 저장
     * @param memberDTO
     * @return
     */
    public int insertNewMember(MemberDTO memberDTO){
        int checkNum = 0;
        checkNum = sqlSessionTemplate.insert("memberMapper.signup", memberDTO);
        System.out.println("MemberDAO checkNum : " + checkNum);
        return checkNum;
    }
}
