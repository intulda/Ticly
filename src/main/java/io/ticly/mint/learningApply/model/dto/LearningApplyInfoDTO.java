package io.ticly.mint.learningApply.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LearningApplyInfoDTO {
    private int auth;
    private String previous_path;
    private String article_path;
}
