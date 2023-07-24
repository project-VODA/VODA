package com.voda.calling.model.service;

import com.voda.calling.model.dto.Comment;
import com.voda.calling.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class CommentService {

    @Autowired
    CommentRepository commentRepository;


    public Comment write(String userEmail, int articleNo, String commentContent){

        Comment comment = Comment.builder()
                .userEmail(userEmail)
                .articleNo(articleNo)
                .commentContent(commentContent)
                .commentRegTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .build();

        return commentRepository.save(comment);
    }

    public Comment modify(int commentNo, String userEmail, int articleNo, String commentContent){

        Comment comment = Comment.builder()
                .commentNo(commentNo)
                .userEmail(userEmail)
                .articleNo(articleNo)
                .commentContent(commentContent)
                .commentRegTime()
    }
}
