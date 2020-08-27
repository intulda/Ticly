package io.ticly.mint.admin.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSearchInfoDTO {
    String searchKeyword;
    String clientType;
    String marketingAgree;
    String selectNormalEmail;
    String selectNaver;
    String searchType;
}
