package io.ticly.mint.admin.model.dao;

import io.ticly.mint.learn.model.dto.VocaDTO;

import java.util.List;
import java.util.Map;

public interface VocabookDAO {

    public List<VocaDTO> VocabookListDao();
    public int saveVocabookDao(Map<String, String> map);
    public int deleteVocabookDao(int article_vocabook_seq);

}
