package io.ticly.mint.admin.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CategoryDTO {

    private Integer category_seq;
    private String category;

    public CategoryDTO() {
    }

    public Integer getCategory_seq() {
        return category_seq;
    }

    public void setCategory_seq(Integer category_seq) {
        this.category_seq = category_seq;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "CategoryDTO{" +
                "category_seq=" + category_seq +
                ", category='" + category + '\'' +
                '}';
    }

}
