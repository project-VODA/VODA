package com.voda.calling.model.service;

import com.voda.calling.exception.NoContentException;
import com.voda.calling.model.dto.Article;
import com.voda.calling.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;


    public List<Article> getArticleList () {
        List<Article> articleList = articleRepository.findByArticleCancelOrderByArticleNoDesc(0);
        return articleList;
    }

    public Optional<Article> getArticleDetail(int articleNO){
        Optional<Article> article = articleRepository.findById(articleNO);
        if(!article.isPresent() || article.get().getArticleCancel()==1){
            throw new NoContentException();
        }
        return article;
    }

    public Article registArticle(Article article){
        return articleRepository.save(article);
    }

    public Article updateArticle(Article article){
        article.setArticleModified(1);
        article.setArticleRegTime(new Timestamp(System.currentTimeMillis()));
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
