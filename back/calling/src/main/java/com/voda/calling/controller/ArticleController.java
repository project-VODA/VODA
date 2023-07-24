package com.voda.calling.controller;

import com.voda.calling.exception.NoContentException;
import com.voda.calling.model.dto.Article;
import com.voda.calling.model.service.ArticleService;
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
import java.util.Optional;

@RestController
@Api(tags = "Article")
@RequestMapping("/articles")
@CrossOrigin("*")
@Slf4j
public class ArticleController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    ArticleService articleService;

    @ApiOperation(value = "게시글 목록", notes = "삭제되지 않은 게시글 목록을 articleNo 기준 내림차순으로 가져오는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 목록 불러오기 성공"),
            @ApiResponse(code = 204, message = "게시글 목록 불러오기 실패 - 게시글 없음"),
            @ApiResponse(code = 500, message = "게시글 목록 불러오기 실패 - 서버(DB)오류")
    })
    @GetMapping("/")
    public ResponseEntity<?> getArticleList() {
        log.info("게시글 목록 불러오기");
        try {
            List<Article> list = articleService.getArticleList();
            if (list == null || list.size() == 0) {
                log.info("게시글 목록 불러오기 실패 - 게시글 없음");
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
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
    @PostMapping("/")
    public ResponseEntity<?> registArticle(@RequestBody Article article) {
        log.info("게시글 작성");
        try {
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
    @PutMapping("/")
    public ResponseEntity<?> updateArticle(@RequestBody Article article) {
        log.info("게시글 수정");
        try {
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
    @DeleteMapping("/")
    public ResponseEntity<?> deleteArticle(int articleNo) {
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