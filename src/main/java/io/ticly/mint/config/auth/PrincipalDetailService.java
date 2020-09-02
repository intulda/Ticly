package io.ticly.mint.config.auth;

import io.ticly.mint.articleBoard.model.dto.MemberDTO;
import io.ticly.mint.member.dao.MemberDAO;
import io.ticly.mint.member.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // Bean 등록
public class PrincipalDetailService implements UserDetailsService{

	@Autowired
	private MemberDAO memberDAO;
	
	// 스프링이 로그인 요청을 가로챌 때, email, password 변수 2개를 가로채는데
	// password 부분 처리는 알아서 함. email DB에 있는지만 확인해주면 됨.
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("loadUserByUsername호출");
		System.out.println("email : " + email);
		UserDTO principal = memberDAO.findDuplicateEmail(email);

		//회원정보가 있는 경우
		if(principal!=null){
			return new PrincipalDetail(principal);// 시큐리티의 세션에 유저 정보가 저장이 됨.
		}
		//회원정보가 없는 경우
		else {
			throw new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다. : "+email);
		}
	}
}
