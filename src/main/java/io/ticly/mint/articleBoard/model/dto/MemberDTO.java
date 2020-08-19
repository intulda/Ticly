package io.ticly.mint.articleBoard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
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

    public MemberDTO(int auth, List<String> categories, String email){
        this.auth = auth;
        this.categories = categories;
        this.email = email;
    }
}
