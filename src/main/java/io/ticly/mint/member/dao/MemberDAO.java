package io.ticly.mint.member.dao;

import io.ticly.mint.member.dto.UserDTO;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MemberDAO {

    private SqlSessionTemplate sqlSessionTemplate;

    public MemberDAO(SqlSessionTemplate sqlSessionTemplate) {

        this.sqlSessionTemplate = sqlSessionTemplate;
    }

    /**
     * 로그인시 가입 여부 확인
     * @param userDTO
     * @return
     */
    public UserDTO findMemberInfo(UserDTO userDTO){
        return sqlSessionTemplate.selectOne("memberMapper.findMemberLogin", userDTO);
    }

    public List<String> getUserCategories(String email){
        return sqlSessionTemplate.selectList("memberMapper.getUserCategories", email);
    }

    /**
     * 회원가입시 이메일 중복 확인
     * @param email
     * @return
     */
    public UserDTO findDuplicateEmail(String email){
        UserDTO userDTO = sqlSessionTemplate.selectOne("memberMapper.checkEmail", email);
        return userDTO;
    }

    /**
     * 회원가입시 멤버 데이터 저장
     * @param userDTO
     * @return
     */
    public int insertNewMember(UserDTO userDTO){
        int checkNum = 0;
        checkNum = sqlSessionTemplate.insert("memberMapper.signup", userDTO);
        System.out.println("MemberDAO checkNum : " + checkNum);
        return checkNum;
    }


    /**
     * 카케고리 sequence값 받
     * @param category_name
     * @return
     */
    public int getCategorySeq(String category_name){
        int seqResult = sqlSessionTemplate.selectOne("memberMapper.getCategorySeq", category_name);
        System.out.println("[Dao]getCategorySeq의 seqResult : " + seqResult);
        return seqResult;
    }

    public int saveUserCategories(String email, int category_seq){

        Map<String, Object> map = new HashMap<String, Object>();
        map.put( "email", email );
        map.put( "category_seq", category_seq );

        int checkNum = 0;
        checkNum = sqlSessionTemplate.insert("memberMapper.saveUserCategories", map);

        System.out.println("[Dao]saveUserCategories checkNum : " + checkNum);

        return checkNum;
    }


    /** OAuth로 새롭게 가입한 멤버 저장
     *
     */
    public int insertOAuthMember(UserDTO userDTO){
        return sqlSessionTemplate.insert("memberMapper.signup", userDTO);
    }
}
