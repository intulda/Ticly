package io.ticly.mint.learn.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLearnDTO {

    private String email;
    private int article_seq;
    private int user_learning_seq;
}
