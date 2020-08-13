package io.ticly.mint.learn.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VocaDTO {

    private int USER_VOCA_SEQ;
    private int USER_LEARNING_SEQ;
    private int ARTICLE_SEQ;
    private String VOCA;
    private int CHECK_READING;
    private int LAST_VOCA;
}
