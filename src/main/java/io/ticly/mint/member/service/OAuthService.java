package io.ticly.mint.member.service;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dao.MemberDAO;
import io.ticly.mint.member.dto.UserDTO;
import io.ticly.mint.member.util.NaverLoginUtil;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OAuthService {
    private MemberDAO memberDAO;

    public OAuthService(MemberDAO memberDAO) {
        this.memberDAO = memberDAO;
    }

}
