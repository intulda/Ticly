package io.ticly.mint.admin.model.service;

import io.ticly.mint.admin.model.dao.ArticleDAO;
import io.ticly.mint.admin.model.dao.ArticleVocabookDAO;
import io.ticly.mint.admin.model.dao.VocabookDAO;
import io.ticly.mint.admin.model.dto.ArticleDTO;
import io.ticly.mint.learn.model.dto.VocaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ArticleWriteService implements IArticleWriteService{

    private ArticleDAO articleDAO;
    private ArticleVocabookDAO articleVocabookDAO;
    private VocabookDAO vocabookDAO;

    public ArticleWriteService(ArticleDAO articleDAO) {
        this.articleDAO = articleDAO;
    }

    /* ArticleDAO : Service */
    @Override
    public List<ArticleDTO> ArticleList() {
        return articleDAO.ArticleListDao();
    }

    @Override
    public ArticleDTO ArticleDetail(String title) {
        return articleDAO.ArticleDetailDao(title);
    }

    @Override
    public int writeArticle(Map<String, String> map) {
        int nResult = articleDAO.writeArticleDao(map);
        return nResult;
    }

    @Override
    public int deleteArticle(String title) {
        int nResult = articleDAO.deleteArticleDao(title);
        return nResult;
    }

    @Override
    public int ArtCount() {
        int nTotalCount = articleDAO.ArticleCount();
        return nTotalCount;
    }

    /* ArticleVocabookDAO : Service */
    @Override
    public List<VocaDTO> ArticleVocabookList() {
        return ArticleVocabookListDao();
    }

    @Override
    public int saveArticleVocabook(List<Map<String, String>> list) {
        // return 2개 해야할 것 같은디....???????????????

        for(int i=0; i<list.size(); i++){
            System.out.println("list 순서" + i + "번째");
            for(Map.Entry<String, String> elem : list.get(i).entrySet() ){
                // list 각각 hashmap 받아서 출력
                System.out.println( String.format("키: %s, 값: %s", elem.getKey(), elem.getValue()) );
            }
        }

        /*
        int wordResult = articleVocabookDAO.saveArticleVocabookDao(vocaWordMap);
        int meanResult = articleVocabookDAO.saveArticleVocabookDao(vocaMeanMap);
        */
        return wordResult;
    }

    @Override
    public int deleteArticleVocabook(int article_vocabook_seq) {
        int nResult = (int)articleDAO.deleteArticleDao(article_vocabook_seq);
        return article_vocabook_seq;
    }


    /* VocabookDAO : Service */

}