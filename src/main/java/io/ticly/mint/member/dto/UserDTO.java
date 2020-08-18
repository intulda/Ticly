package io.ticly.mint.member.dto;

import io.ticly.mint.admin.model.dto.CategoryDTO;
import lombok.*;

import java.util.List;

@Getter
@ToString
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String email;
    private String password;
    private String nickname;
    private int auth;
    private List<CategoryDTO> categories;
    private String signup_type; //회원가입 경로
    private String reg_date; //회원가입 날짜
}
