package com.voda.calling.controller;

import com.voda.calling.exception.NoContentException;
import com.voda.calling.model.dto.Article;
import com.voda.calling.model.service.ArticleService;
import com.voda.calling.util.JwtUtil;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@Api(tags = "Article")
@RequestMapping("/articles")
@CrossOrigin("*")
@Slf4j
public class ArticleController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String AUTH = "Authorization";

    @Autowired
    ArticleService articleService;

    @Autowired
    JwtUtil jwtUtil;

    @ApiOperation(value = "게시글 목록", notes = "삭제되지 않은 게시글 목록을 articleNo 기준 내림차순으로 가져오는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 목록 불러오기 성공"),
            @ApiResponse(code = 204, message = "게시글 목록 불러오기 실패 - 게시글 없음"),
            @ApiResponse(code = 500, message = "게시글 목록 불러오기 실패 - 서버(DB)오류")
    })
    @GetMapping()
    public ResponseEntity<?> getArticleList() {
        log.info("게시글 목록 불러오기");
        try {
            List<Article> list = articleService.getArticleList();

            LocalDateTime now = LocalDateTime.now();
            for (Article article : list) {
                LocalDateTime d = LocalDateTime.parse(article.getArticleRegTime(),
                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                if (d.getYear()==now.getYear() && d.getMonth()==now.getMonth() && d.getDayOfMonth()==now.getDayOfMonth()) {
                    article.setArticleRegTime(d.format(DateTimeFormatter.ofPattern("HH시 mm분")));
                }else {
                    article.setArticleRegTime(d.format(DateTimeFormatter.ofPattern("YY.MM.dd")));
                }
            }

            log.info("게시글 목록 불러오기 성공");
            return new ResponseEntity<List<Article>>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.info("게시글 목록 불러오기 실패 - 서버(DB)오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //게시글 상세
    @ApiOperation(value = "게시글 상세", notes = "articleNo로 게시글 상세 정보를 가져오는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 상세 가져오기 성공"),
            @ApiResponse(code = 204, message = "게시글 상세 가져오기 실패 - 게시글 없음"),
            @ApiResponse(code = 500, message = "게시글 상세 가져오기 실패 - 서버(DB)오류")
    })
    @GetMapping("/{articleNo}")
    public ResponseEntity<?> getArticleDetail(@PathVariable int articleNo) {
        log.info("게시글 상세 가져오기");
        try {
            Optional<Article> article = articleService.getArticleDetail(articleNo);
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime d = LocalDateTime.parse(article.get().getArticleRegTime(),
                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            if (d.getYear()==now.getYear() && d.getMonth()==now.getMonth() && d.getDayOfMonth()==now.getDayOfMonth()) {
                article.get().setArticleRegTime(d.format(DateTimeFormatter.ofPattern("HH시 mm분")));
            }else {
                article.get().setArticleRegTime(d.format(DateTimeFormatter.ofPattern("YY.MM.dd")));
            }
            log.info("게시글 상세 가져오기 성공");
            return new ResponseEntity<Article>(article.get(), HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("게시글 상세 가져오기 실패 - {}번 게시글 없음", articleNo);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("게시글 상세 가져오기 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //게시글 작성
    @ApiOperation(value = "게시글 작성", notes = "게시글 작성하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 등록 성공"),
            @ApiResponse(code = 500, message = "게시글 등록 실패 - 서버(DB)오류")
    })
    @PostMapping()
    public ResponseEntity<?> registArticle(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth, @RequestBody Article article) {
        log.info("작성 게시글 정보: " + article);
        log.info("게시글 작성");
        try {
            article.setUserEmail(jwtUtil.getUserEmailFromToken(auth));
            Article newArticle = articleService.registArticle(article);
            log.info("게시글 등록 성공");
            return new ResponseEntity<>(newArticle, HttpStatus.OK);
        } catch (Exception e) {
            log.info("게시글 등록 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "게시글 수정", notes = "게시글 제목, 내용 수정하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 수정 성공"),
            @ApiResponse(code = 500, message = "게시글 수정 실패 - 서버(DB)오류")
    })
    @PutMapping()
    public ResponseEntity<?> updateArticle(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth, @RequestBody Article article) {
        log.info("게시글 수정");
        try {
            article.setUserEmail(jwtUtil.getUserEmailFromToken(auth));
            Article updatedArticle = articleService.updateArticle(article);
            log.info("게시글 수정 성공");
            return new ResponseEntity<Article>(updatedArticle, HttpStatus.OK);
        } catch (Exception e) {
            log.info("게시글 수정 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "게시글 삭제", notes = "articleNo로 게시글 삭제하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 삭제 성공"),
            @ApiResponse(code = 204, message = "게시글 삭제 실패 - 게시글 없음"),
            @ApiResponse(code = 500, message = "게시글 삭제 실패 - 서버(DB)오류")
    })
    @DeleteMapping("/{articleNo}")
    public ResponseEntity<?> deleteArticle(@PathVariable int articleNo) {
        log.info("게시글 삭제");
        try {
            articleService.deleteArticle(articleNo);
            log.info("게시글 삭제 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("게시글 삭제 실패 - {}번 게시글 없음", articleNo);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("게시글 삭제 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}