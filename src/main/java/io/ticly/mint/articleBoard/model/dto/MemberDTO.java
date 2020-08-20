package io.ticly.mint.articleBoard.model.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private String email;
    private String password;
    private String nickname;
    private List<String> categories;
    private int auth;
    private String signup_type;

    public MemberDTO(int auth, List<String> categories){
        this.auth = auth;
        this.categories = categories;
    }

    public MemberDTO(String email, String nickname, int auth, List<String> categories) {
        this.email = email;
        this.nickname = nickname;
        this.auth = auth;
        this.categories = categories;
    }
}
