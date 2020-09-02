package io.ticly.mint.member.dto;

import lombok.*;

@Getter
@Setter
@ToString
public class ResponseDataDTO {
    private String code;
    private String status;
    private String message;
    private Object item;
}

