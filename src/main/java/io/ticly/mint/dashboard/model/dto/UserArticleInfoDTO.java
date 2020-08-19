package io.ticly.mint.dashboard.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserArticleInfoDTO {
    private int user_learning_seq;
    private String last_learning_date;
    private int last_learning_type;
    private int article_seq;
    private String url;
    private String title;
    private String last_learning_content;
}
