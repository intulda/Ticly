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
    private String category_seq;
    private int auth;
    private String signup_type;

}
