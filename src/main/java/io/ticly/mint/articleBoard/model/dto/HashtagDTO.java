package io.ticly.mint.articleBoard.model.dto;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class HashtagDTO {
    @EqualsAndHashCode.Include private String hashtag;
    @EqualsAndHashCode.Exclude private int hashtag_count;
    @EqualsAndHashCode.Exclude private int apply_count;

    public HashtagDTO(String hashtag, int apply_count){
        this.hashtag = hashtag;
        this.apply_count = apply_count;
    }
}
