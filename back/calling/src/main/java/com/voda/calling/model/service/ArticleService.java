package com.voda.calling.model.service;

import com.voda.calling.exception.NoContentException;
import com.voda.calling.model.dto.Article;
import com.voda.calling.repository.ArticleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ArticleService {

    @Autowired
    ArticleRepository articleRepository;


    public Page<Article> getArticleList (Pageable pageable) {
        Page<Article> articleList = articleRepository.findByArticleCancelOrderByArticleNoDesc(0, pageable);
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
        String registTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        System.out.println("서비스 호출");
        article.setArticleRegTime(registTime);
        return articleRepository.save(article);
    }

    public Article updateArticle(Article article){
        article.setArticleModified(1);
        String registTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        article.setArticleRegTime(registTime);
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
