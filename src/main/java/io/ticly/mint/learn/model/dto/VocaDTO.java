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

    private int user_voca_seq;
    private int user_learning_seq;
    private int article_seq;
    private String voca;
    private String meaning;
    private int check_reading;
    private int last_voca;
    private int voca_order;
    private int voca_group;

    private int vocabook_seq;
    private int meaning_num;
    private int article_vocabook_seq;

    public String getVoca() {
        return voca;
    }

    public void setVoca(String voca) {
        this.voca = voca;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }
}


