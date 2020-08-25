package io.ticly.mint.learn.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LearnArticleDTO {

    private int article_seq;
    private int user_learning_seq;
    private int last_learning_type;
    private String title;
    private String summary;
    private String url;
    private String hashtag;
    private String category;
    private String reg_date;
    private byte[] file_contents;
    private String file_url;
    private String file_ext;
}
