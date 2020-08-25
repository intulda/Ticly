package io.ticly.mint.admin.model.dao;

import io.ticly.mint.learn.model.dto.VocaDTO;

import java.util.List;
import java.util.Map;

public interface VocabookDAO {

    public int saveVocabookDao(Map<String, String> map);
    public int deleteVocabookDao(int vocabook_seq);

}
