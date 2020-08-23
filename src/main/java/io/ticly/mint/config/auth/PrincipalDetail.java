package io.ticly.mint.config.auth;

import io.ticly.mint.member.dto.UserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;


public class PrincipalDetail implements UserDetails {
    private UserDTO userDTO; //콤포지션

    public PrincipalDetail(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public String getPassword() {
        return userDTO.getPassword();
    }

    @Override
    public String getUsername() {
        return userDTO.getEmail();
    }

    //계정이 만료되지 않았는지 리턴한다.(true: 만료안됨)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //비밀번호 만료여부
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    //계정이 가지고 있는 권한 목록을 리턴한다.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collectors = new ArrayList<>();
        collectors.add(()->{ return "ROLE_"+userDTO.getAuth();}); //"ROLE은 규칙이다."
        return collectors;
    }
}
