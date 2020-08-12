package io.ticly.mint.member.dto;

import lombok.*;

@Getter
@ToString
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private String email;
    private String password;
    private String nickname;
    private int auth;
    private String signup_type; //회원가입 경로
    private String reg_date; //회원가입 날짜
}
