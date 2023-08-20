package com.voda.calling.repository;

import com.voda.calling.model.dto.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    // 삭제되지않은 게시글 목록 articleNo 내림차순으로 가져옴
    Page<Article> findByArticleCancelOrderByArticleNoDesc(int articleCancel, Pageable pageable);

}