package com.voda.calling.controller;

import com.voda.calling.model.dto.Comment;
import com.voda.calling.model.dto.CommentSearchResponse;
import com.voda.calling.model.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Api(tags = "Comment")
@CrossOrigin("*")
@Slf4j
public class CommentController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    CommentService commentService;

    @ApiOperation( value = "댓글 목록", notes = "글 번호에 해당하는 댓글 목록을 불러오는 api")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 목록 호출 성공"),

            @ApiResponse(code=500, message="댓글 목록 호출 실패 - 서버(DB) 오류")
    })
    @GetMapping("/{articleNo}")
    public ResponseEntity<?> searchAllComment(@PathVariable int articleNo) {
        log.info("CommentController - searchAllComment : 댓글 목록");

        try{
            List<CommentSearchResponse> comments = commentService.searchAll(articleNo);

//            log.info("시간 변환 시도");
//            LocalDateTime now = LocalDateTime.now();
//            for (CommentSearchInterface csr : comments) {
//                LocalDateTime d = LocalDateTime.parse(csr.getCommentRegTime(),
//                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//                if (d.getYear()==now.getYear() && d.getMonth()==now.getMonth() && d.getDayOfMonth()==now.getDayOfMonth()) {
//                    csr.setCommentRegTime(d.format(DateTimeFormatter.ofPattern("HH시 mm분")));
//                }else {
//                    csr.setCommentRegTime(d.format(DateTimeFormatter.ofPattern("YY.MM.dd")));
//                }
//            }

            log.info("댓글 목록 가져오기 성공");
            return new ResponseEntity<List<CommentSearchResponse>>(comments, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 목록 가져오기 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ApiOperation( value = "댓글 작성", notes = "Comment 객체를 이용해 댓글을 작성하는 api")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 작성 성공"),
            @ApiResponse(code=500, message="댓글 작성 실패 - 서버(DB) 오류")
    })
    @PostMapping()
    public ResponseEntity<?> writeComment(Comment comment) {
        log.info("CommentController - writeComment : 댓글 작성");
        try{
            commentService.write(comment.getUserEmail(), comment.getArticleNo(), comment.getCommentContent());
            log.info("댓글 작성 성공");
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 작성 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ApiOperation( value = "댓글 수정", notes = "Comment 객체를 이용해 댓글을 수정하는 api")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 수정 성공"),
            @ApiResponse(code=500, message="댓글 수정 실패 - 서버(DB) 오류")
    })
    @PutMapping()
    public ResponseEntity<?> modifyComment(Comment comment) {
        log.info("CommentController - modifyComment : 댓글 수정");
        try{
            commentService.modify(comment.getCommentNo(), comment.getUserEmail(), comment.getArticleNo(), comment.getCommentContent());
            log.info("댓글 수정 성공");
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        }catch (Exception e) {
            log.info("댓글 수정 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ApiOperation( value = "댓글 삭제", notes = "commentNo를 이용해 댓글을 삭제하는 api")
    @ApiResponses({
            @ApiResponse(code=200, message="댓글 삭제 성공"),
            @ApiResponse(code=500, message="댓글 삭제 실패 - 서버(DB) 오류")
    })
    @DeleteMapping("/{commentNo}")
    public ResponseEntity<String> deleteComment(@PathVariable int commentNo) {
        log.info("CommentController - deleteComment : 댓글 삭제");

        try{
            commentService.delete(commentNo);
            log.info("댓글 삭제 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("댓글 삭제 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
