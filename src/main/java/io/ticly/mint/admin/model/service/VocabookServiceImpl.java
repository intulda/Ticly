package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dao.VocabookDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VocabookServiceImpl implements VocabookService{

    private VocabookDAO vocabookdao;

    public void VocabookService(VocabookDAO vocabookdao) {
        this.vocabookdao = vocabookdao;
    }

    @Override
    public int saveVocabookDao(Map<String, String> wordSetMap) {
        int wordSet = vocabookdao.saveVocabookDao(wordSetMap);
        return wordSet;
    }

    @Override
    public int deleteVocabookDao(int vocabook_seq) {
        int vResult = vocabookdao.deleteVocabookDao(vocabook_seq);
        return vResult;
    }

}
