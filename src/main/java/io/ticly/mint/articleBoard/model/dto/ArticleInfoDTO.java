package io.ticly.mint.articleBoard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ArticleInfoDTO {
    private int article_seq;
    private String title;
    private String summery;
    private int file_seq;
    private String url;
    private String hashtag;
    private String category_seq;
    private String reg_date;
    private int del;

}
