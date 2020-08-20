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
    private static String namespace = "VocabookDAO";

    @Override
    public List<Map<String, String>> VocabookListDao() {
        return sqlSessionTemplate.selectList(namespace+".VocabookListDao");
    }

    @Override
    public int saveVocabookDao(List<Map<String, String>> list) {
        return sqlSessionTemplate.insert(namespace+".saveVocabookDao", list);
    }

    @Override
    public int deleteVocabookDao(int article_vocabook_seq) {
        return sqlSessionTemplate.update(namespace+".deleteVocabookDao");
    }
}
