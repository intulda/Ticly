package io.ticly.mint.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OAuthTokenDTO {
    private String access_token;
    private String refresh_token;
    private String token_type;
    private int expires_in;
}
