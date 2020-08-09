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

    public int isDuplicateEmail(String email) throws Exception{
        int result = sqlSessionTemplate.selectOne("memberMapper.checkEmail", email);
        return result;
    }

    public int signup(MemberDTO memberDTO){
        int checkNum = 0;
        checkNum = sqlSessionTemplate.insert("memberMapper.signup", memberDTO);
        System.out.println("MemberDAO checkNum : " + checkNum);
        return checkNum;
    }
}
