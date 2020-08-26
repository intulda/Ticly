package io.ticly.mint.admin.model.service;

import java.util.Map;

public interface VocabookService {

    public int saveVocabookDao(Map<String, String> vocamap);
    public int deleteVocabookDao(int vocabook_seq);

}
