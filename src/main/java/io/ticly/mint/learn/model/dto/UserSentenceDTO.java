package io.ticly.mint.learn.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSentenceDTO {
    private int user_sentence_seq;
    private int article_seq;
    private int user_learning_seq;
    private String eng_sentence;
    private String kor_sentence;
    private String last_sentence;
}
