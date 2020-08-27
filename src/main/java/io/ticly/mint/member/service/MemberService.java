package io.ticly.mint.member.service;

import io.ticly.mint.articleBoard.model.dao.ArticleBoardDAO;
import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dao.MemberDAO;
import io.ticly.mint.member.dto.UserDTO;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MemberService {

    private MemberDAO memberDAO;
    private ArticleBoardDAO articleBoardDAO;

    public MemberService(MemberDAO memberDAO, ArticleBoardDAO articleBoardDAO) {
        this.memberDAO = memberDAO;
        this.articleBoardDAO = articleBoardDAO;
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
        List<String> categories = memberDAO.getUserCategories(email);
        //카테고리 정보가 없으면 전체를 넣어준다.
        if(categories.isEmpty()){
            categories = articleBoardDAO.getCategoryKind();
        }
        return categories;
    }

    /**
     * 세션에 있던 카테고리 정보를 user_categories에 저장
     * @param email
     * @param categories
     */
    public void saveUserCategories(String email, List<String> categories) throws SQLException{
        //1. String에 맞는 카테고리 seq를 받아오기
        List<Integer> category_seq  = new ArrayList<>();
        for(String i : categories){
            int seq = memberDAO.getCategorySeq(i);
            System.out.println("[Service]넘어온 seqResult : " + seq);

            category_seq.add(seq);
        }

        //2.기존에 있던 카데고리 데이터를 삭제한다.
        int deleteCheck = memberDAO.deleteUserCategory(email);
        System.out.println("deleteCheck : " + deleteCheck);

        //3.email과 seq를 테이블에 저장한다.
        for(Integer i: category_seq){
            int count = memberDAO.saveUserCategories(email, i);

            if(count <= 0) {
               throw new SQLException("세션 카테고리 -> DB에 insert 실패");
                //System.out.println("세션 카테고리 -> DB에 insert 실패");
            }
        }
    }

    /**
     * 이메일 중복확인 처리(회원가입 시)
     * @param email
     * @return
     */
    public int findDuplicateEmail(String email) {
        UserDTO userDTO = memberDAO.findDuplicateEmail(email);
        //중복된 이메일인 경우
        if(userDTO!=null){
            return 1;
        }
        //중복되지 않은 이메일인 경우
        else {
            return 0;
        }
    }

    /**
     * 회원가입 데이터 저장(이메일로 가입시)
     * @param userDTO
     * @return
     */
    public int insertNewMember(UserDTO userDTO){
        //닉네임 가져오기
        String email = userDTO.getEmail();
        int nicknamePoint = email.indexOf("@");
        String nickname = email.substring(0,nicknamePoint);
        userDTO.setNickname(nickname);

        userDTO.setAuth(3);
        userDTO.setSignup_type("EMAIL");
        //Dao로 넘기기

        return memberDAO.insertNewMember(userDTO);
    }

    /**
     * OAuth 가입시, 기존 가입정보가 있는지 확인
     * @param authEmail
     * @return
     */
    public UserDTO findMember(String authEmail){
        return memberDAO.findDuplicateEmail(authEmail);
    }

    /**
     * 네이버 로그인시 회원정보 DB에 저장
     * @param userDTO
     * @return
     */
    public int insertOAuthMember(UserDTO userDTO){
        System.out.println("Service에 넘어온 값 확인 : " + userDTO.getEmail());

        //임시 패스워드 값 넣어주기
        String gabagePassword = UUID.randomUUID().toString();
        System.out.println("gabagePassword = " + gabagePassword);
        userDTO.setPassword(gabagePassword);

        //닉네임을 받아오지 못했다면, 이메일에서 아이디만 추출해서 담아준다.
        if(userDTO.getNickname()==null || userDTO.getNickname().equals("")){
            String email = userDTO.getEmail();
            int nicknamePoint = email.indexOf("@");
            String nickname = email.substring(0,nicknamePoint);
            userDTO.setNickname(nickname);
        }

        userDTO.setAuth(3);
        userDTO.setSignup_type("NAVER");

        //세팅된 DTO를 DAO로 넘기기
        return memberDAO.insertNewMember(userDTO);
    }

    public List<String> getCategoryKind(){
        List<String> categories = articleBoardDAO.getCategoryKind();
        return categories;
    }
}
