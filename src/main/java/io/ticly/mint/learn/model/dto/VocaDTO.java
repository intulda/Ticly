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

    private int userVocaSeq;
    private int userLearningSeq;
    private int qrticleSeq;
    private String voca;
    private String meaning;
    private int checkReading;
    private int lastVoca;
    private int vocaOrder;
    private int vocaGroup;
}


