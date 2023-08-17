package com.voda.calling.repository;

import com.voda.calling.model.dto.Comment;
import com.voda.calling.model.dto.CommentSearchResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c.commentNo as commentNo, u.userName as userName, c.commentContent as commentContent, c.commentRegTime as commentRegTime " +
            "FROM Comment c " +
            "JOIN User u ON c.userEmail = u.userEmail " +
            "WHERE c.articleNo = :articleNo")
    List<CommentSearchResponse> findAllIncludeUserNameByArticleNo(int articleNo);

    Comment findByCommentNo(int commentNo);


}
