package io.ticly.mint.member.service;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dao.MemberDAO;
import io.ticly.mint.member.dto.OAuthTokenDTO;
import io.ticly.mint.member.util.NaverLoginUtil;
import org.springframework.stereotype.Service;

@Service
public class OAuthService {
    private MemberDAO memberDAO;

    public OAuthService(MemberDAO memberDAO) {
        this.memberDAO = memberDAO;
    }

    public int insertOAuthMember(OAuthTokenDTO oAuthTokenDTO){
        System.out.println("service에서 토큰 값 확인 : " + oAuthTokenDTO.getAccess_token());

        NaverLoginUtil naverLoginUtil = new NaverLoginUtil();
        String apiResult = naverLoginUtil.getUserProfile(oAuthTokenDTO.getAccess_token());

        MemberDTO memberDTO = new MemberDTO();

        //Dao로 넘기기
        return memberDAO.insertNewMember(memberDTO);
    }
}
