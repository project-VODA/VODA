package com.voda.calling.repository;

import com.voda.calling.model.dto.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c.commentNo, u.userName, c.commentContent, c.commentRegTime " +
            "FROM Comment c " +
            "JOIN User u ON c.userEmail = u.userEmail " +
            "WHERE c.articleNo = :articleNo AND c.commentCancel = 0")
    List<Comment> findAllIncludeUserNameByArticleNo(int articleNo);

    Comment findByCommentNo(int commentNo);


}
