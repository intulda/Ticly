package io.ticly.mint.admin.model.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ArticleVocabookDTO {

    private int article_vocabook_seq;
    private int article_seq;
    private String voca;
    private int meaning_num;
    private int voca_order;

    public ArticleVocabookDTO() {

    }

    public ArticleVocabookDTO(int article_vocabook_seq, int article_seq, String voca, int meaning_num, int voca_order) {
        this.article_vocabook_seq = article_vocabook_seq;
        this.article_seq = article_seq;
        this.voca = voca;
        this.meaning_num = meaning_num;
        this.voca_order = voca_order;
    }

    public ArticleVocabookDTO(int article_seq, String voca, int meaning_num, int voca_order) {
        this.article_seq = article_seq;
        this.voca = voca;
        this.meaning_num = meaning_num;
        this.voca_order = voca_order;
    }


    public int getArticle_vocabook_seq() {
        return article_vocabook_seq;
    }

    public void setArticle_vocabook_seq(int article_vocabook_seq) {
        this.article_vocabook_seq = article_vocabook_seq;
    }

    public int getArticle_seq() {
        return article_seq;
    }

    public void setArticle_seq(int article_seq) {
        this.article_seq = article_seq;
    }

    public String getVoca() {
        return voca;
    }

    public void setVoca(String voca) {
        this.voca = voca;
    }

    public int getMeaning_num() {
        return meaning_num;
    }

    public void setMeaning_num(int meaning_num) {
        this.meaning_num = meaning_num;
    }

    public int getVoca_order() {
        return voca_order;
    }

    public void setVoca_order(int voca_order) {
        this.voca_order = voca_order;
    }

    @Override
    public String toString() {
        return "ArticleVocabookDTO{" +
                "article_vocabook_seq=" + article_vocabook_seq +
                ", article_seq=" + article_seq +
                ", voca='" + voca + '\'' +
                ", meaning_num=" + meaning_num +
                ", voca_order=" + voca_order +
                '}';
    }
}
