package com.voda.calling.controller;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.dto.UserSearch;
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

@RestController
@Api(tags = "Friend")
@RequestMapping("/friends")
@CrossOrigin("*")
@Slf4j
public class FriendController {

    @Autowired
    FriendService friendService;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";


    @ApiOperation(value = "친구 추가", notes = "사용자 이메일과 친구 이메일로 친구 추가하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "친구 추가 성공"),
            @ApiResponse(code = 500, message = "친구 추가 실패 - 서버(DB)오류")
    })
    @PostMapping("/regist")
    public ResponseEntity<?> registFriend(String userEmail, String friendEmail) {
        log.info("친구 추가 시도");
        try {
            friendService.registFriend(userEmail, friendEmail);
            log.info("친구 추가 성공");
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("친구 추가 실패");
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @ApiOperation(value = "유저 검색", notes = "이메일로 유저 검색하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저 검색 성공"),
            @ApiResponse(code = 204, message = "유저 검색 실패 - 유저 없음"),
            @ApiResponse(code = 500, message = "유저 검색 실패 - 서버(DB)오류")
    })
    @GetMapping("/{keyword}")
    public ResponseEntity<?> searchUser(@PathVariable String keyword) {
        log.info("유저 검색");
        try {
            List<UserSearch> searchUserlist = friendService.searchUser(keyword);
            if (searchUserlist == null || searchUserlist.size() == 0) {
                log.info("유저 검색 실패 - {} 해당하는 유저 없음", keyword);
                return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
            }
            log.info("유저 검색 성공");
            return new ResponseEntity<List<UserSearch>>(searchUserlist, HttpStatus.OK);
        } catch (Exception e) {
            log.info("유저 검색 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
