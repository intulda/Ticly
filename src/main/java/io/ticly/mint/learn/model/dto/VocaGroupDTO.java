package io.ticly.mint.learn.model.dto;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VocaGroupDTO {

    private int user_voca_group_seq;
    private int user_learning_seq;
    private int article_seq;
    private int voca_group;
    private String email;
}
