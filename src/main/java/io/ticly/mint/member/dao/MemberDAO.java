package io.ticly.mint.member.dao;

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
}
