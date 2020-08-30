package io.ticly.mint.admin.model.dao;

import io.ticly.mint.learn.model.dto.VocaDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class VocabookDAOImpl implements VocabookDAO{

    // sqlSessionTemplate DI
    @Autowired
    protected SqlSessionTemplate sqlSessionTemplate;

    // Mapper XML의 namespace
    private String namespace = "VocabookDAO";

    @Override
    public int saveVocabookDao(Map<String, String> wordSetMap) {
        return sqlSessionTemplate.insert(namespace+".saveVocabookDao", wordSetMap); // 여기까지 데이터 온다
    }

    @Override
    public int deleteVocabookDao(int vocabook_seq) {
        return sqlSessionTemplate.update(namespace+".deleteVocabookDao", vocabook_seq);
    }

}
