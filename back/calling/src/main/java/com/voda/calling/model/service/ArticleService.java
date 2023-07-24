package com.voda.calling.model.service;

import com.voda.calling.exception.NoContentException;
import com.voda.calling.model.dto.Article;
import com.voda.calling.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;

    /**
     * 게시글 목록
     * - 삭제되지 않은 게시글 목록
     * @return articleList
     */
    public List<Article> getArticleList () {
        List<Article> articleList = articleRepository.findByArticleCancelOrderByArticleNoDesc(0);
        return articleList;
    }

    /**
     * 게시글 상세
     * @param articleNO
     * @return article
     */
    public Optional<Article> getArticleDetail(int articleNO){
        Optional<Article> article = articleRepository.findById(articleNO);
        if(!article.isPresent() || article.get().getArticleCancel()==1){
            throw new NoContentException();
        }
        return article;
    }

    /**
     * 게시글 작성
     * @param article
     */
    public Article registArticle(Article article){
        return articleRepository.save(article);
    }

    /**
     * 게시글 수정
     * @param article
     */
    public Article updateArticle(Article article){
        return articleRepository.save(article);
    }

    public Article deleteArticle(int articleNo){
        Optional<Article> article = articleRepository.findById(articleNo);
        if(!article.isPresent()){
            throw new NoContentException();
        }
        article.get().setArticleCancel(1);
        return articleRepository.save(article.get());
    }

}
