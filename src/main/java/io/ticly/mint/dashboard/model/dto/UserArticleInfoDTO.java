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

    // learning List Info에 필요한 변수
    private String category_title;
    private String hashtag;
    private String summary;
    private int achievement_rate;
    private int learning_done;
    private String reg_date;
    private String user_article_show;
    private String image_path;

}
