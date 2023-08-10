package com.voda.calling.model.service;

import com.voda.calling.model.dto.Comment;
import com.voda.calling.model.dto.CommentSearchResponse;
import com.voda.calling.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    public List<CommentSearchResponse> searchAll(int articleNo) {
        log.info("Search All : 댓글 목록 출력");


        try {
            return commentRepository.findAllIncludeUserNameByArticleNo(articleNo);
        } catch (Exception e) {

            log.info("서비스 단 오류 발생" + e);

            throw e;
        }
    }

    public Comment write(String userEmail, int articleNo, String commentContent){
        log.info("Write : 댓글 작성");
        Comment comment = Comment.builder()
                .userEmail(userEmail)
                .articleNo(articleNo)
                .commentContent(commentContent)
                .commentRegTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .build();

        return commentRepository.save(comment);
    }

    public Comment modify(int commentNo, String userEmail, int articleNo, String commentContent){
        log.info("Modify : 댓글 수정");
        Comment comment = Comment.builder()
                .commentNo(commentNo)
                .userEmail(userEmail)
                .articleNo(articleNo)
                .commentContent(commentContent)
                .commentRegTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .commentModified(1)
                .build();

        return commentRepository.save(comment);
    }

    public void delete(int commentNo) {
        log.info("Delete : 댓글 삭제");
        Comment comment = commentRepository.findByCommentNo(commentNo);

        commentRepository.delete(comment);
    }
}
