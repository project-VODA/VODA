package com.voda.calling.repository;

import com.voda.calling.model.dto.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByArticleNo(int articleNo);

    Comment findByCommentNo(int commentNo);


}
