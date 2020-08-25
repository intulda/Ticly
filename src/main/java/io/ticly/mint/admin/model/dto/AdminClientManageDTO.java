package io.ticly.mint.admin.model.dto;

import lombok.*;

@Getter
@ToString
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminClientManageDTO {
    private int rownum;
    private String email;
    private String nickname;
    private int auth;
    private String signup_type;
    private String reg_date;
    private int del;
    private int marketing_agree;
}
