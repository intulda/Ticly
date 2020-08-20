package io.ticly.mint.admin.model.dao;

import io.ticly.mint.learn.model.dto.VocaDTO;

import java.util.List;
import java.util.Map;

public interface VocabookDAO {

    public List<Map<String, String>> VocabookListDao();
    public int saveVocabookDao(List<Map<String, String>> list);
    public int deleteVocabookDao(int article_vocabook_seq);

}
