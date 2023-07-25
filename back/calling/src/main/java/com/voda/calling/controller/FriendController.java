package com.voda.calling.controller;

import com.voda.calling.exception.NoContentException;
import com.voda.calling.model.dto.Article;
import com.voda.calling.model.dto.Comment;
import com.voda.calling.model.dto.Friend;
import com.voda.calling.model.service.FriendService;
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
@Api(tags = "Friend")
@RequestMapping("/friends")
@CrossOrigin("*")
@Slf4j
public class FriendController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    FriendService friendService;


    @ApiOperation(value = "친구 추가", notes = "사용자 이메일과 친구 이메일로 친구 추가하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "친구 추가 성공"),
            @ApiResponse(code = 500, message = "친구 추가 실패 - 서버(DB)오류")
    })
    @PostMapping("/regist")
    public ResponseEntity<?> registFriend(String userEmail, String friendEmail) {
        log.info("친구 추가 시도");
        try {
            friendService.
            log.info("친구 추가 성공");
            return new ResponseEntity<>(newArticle, HttpStatus.OK);
        } catch (Exception e) {
            log.info("친구 추가 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //유저검색
    @ApiOperation(value = "유저 검색", notes = "이메일로 유저 검색하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저 검색 성공"),
            @ApiResponse(code = 204, message = "유저 검색 실패 - 유저 없음"),
            @ApiResponse(code = 500, message = "유저 검색 실패 - 서버(DB)오류")
    })
    @GetMapping("/{userEmail}")
    public ResponseEntity<?> searchUser(@PathVariable String userEmail) {
        log.info("유저 검색");
        try {
            Optional<Article> article = articleService.getArticleDetail(articleNo);
            log.info("유저 검색 성공");
            return new ResponseEntity<Article>(article.get(), HttpStatus.OK);
        } catch (NoContentException e) {
            log.info("유저 검색 실패 - {} 존재하지 않는 이메일", userEmail);
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.info("유저 검색 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation( value = "친구 목록", notes = "이메일에 해당되는 친구 목록을 불러오는 api")
    @ApiResponses({
            @ApiResponse(code=200, message="친구 목록 호출 성공"),
            @ApiResponse(code=204, message="친구 목록 없음 - 친구가 존재하지 않는 상태"),
            @ApiResponse(code=500, message="친구 목록 호출 실패 - 서버(DB) 오류")
    })
    @GetMapping("/{userEmail}")
    public ResponseEntity<?> searchAllFriend(@PathVariable String userEmail) {
        log.info("FriendController - searchAllFriend : 친구 목록");

        try{
            List<Friend> friendList = friendService.searchAllFriend(userEmail);

            if (friendList == null || friendList.size() == 0) {
                return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<List<Friend>>(friendList, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ApiOperation( value = "친구 삭제", notes = "이메일에 해당되는 친구를 삭제하는 api")
    @ApiResponses({
            @ApiResponse(code=200, message="친구 삭제 성공"),
            @ApiResponse(code=204, message="친구 삭제 실패 - 존재하지 않는 친구 관계"),
            @ApiResponse(code=500, message="친구 삭제 실패 - 서버(DB) 오류")
    })
    @DeleteMapping()
    public ResponseEntity<String> deleteFriend(String userEmail, String friendEmail) {
        log.info("FriendController - deleteFriend : 친구 삭제");

        Friend find = friendService.searchRelationship(userEmail, friendEmail);

        if (find == null) {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
        try{
            friendService.deleteFriend(userEmail, friendEmail);

            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
