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
        return sqlSessionTemplate.insert("memberMapper.signup", userDTO);
    }


    /**
     * 카테고리 sequence값 받기
     * @param category_name
     * @return
     */
    public int getCategorySeq(String category_name){
        return sqlSessionTemplate.selectOne("memberMapper.getCategorySeq", category_name);
    }

    public int deleteUserCategory(String email){
        return sqlSessionTemplate.delete("deleteUserCategory", email);
    }


    /**
     * 카테고리 값 저장
     * @param email
     * @param category_seq
     * @return
     */
    public int saveUserCategories(String email, int category_seq){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put( "email", email );
        map.put( "category_seq", category_seq );

        return sqlSessionTemplate.insert("memberMapper.saveUserCategories", map);
    }


    /** OAuth로 새롭게 가입한 멤버 저장
     *
     */
    public int insertOAuthMember(UserDTO userDTO){
        return sqlSessionTemplate.insert("memberMapper.signup", userDTO);
    }
}
