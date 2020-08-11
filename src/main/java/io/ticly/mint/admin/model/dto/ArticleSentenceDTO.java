package io.ticly.mint.admin.model.dto;

public class ArticleSentenceDTO {

    private int article_sentence_seq;
    private int article_seq;
    private String eng_sentence;

    public ArticleSentenceDTO() {
    }

    public int getArticle_sentence_seq() {
        return article_sentence_seq;
    }

    public void setArticle_sentence_seq(int article_sentence_seq) {
        this.article_sentence_seq = article_sentence_seq;
    }

    public int getArticle_seq() {
        return article_seq;
    }

    public void setArticle_seq(int article_seq) {
        this.article_seq = article_seq;
    }

    public String getEng_sentence() {
        return eng_sentence;
    }

    public void setEng_sentence(String eng_sentence) {
        this.eng_sentence = eng_sentence;
    }

    @Override
    public String toString() {
        return "ArticleSentenceDTO{" +
                "article_sentence_seq=" + article_sentence_seq +
                ", article_seq=" + article_seq +
                ", eng_sentence=" + eng_sentence +
                '}';
    }
}
