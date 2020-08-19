package io.ticly.mint.mypage.model.dto;

import lombok.*;

@Getter
@ToString
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPageDTO {
    private String email;
    private String password;
    private String nickname;
    private int auth;
}