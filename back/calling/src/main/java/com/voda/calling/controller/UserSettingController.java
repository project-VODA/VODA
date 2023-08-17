package com.voda.calling.controller;

import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.model.dto.UserSetting;
import com.voda.calling.model.service.UserSettingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Api(tags = "User Setting")
@RequestMapping("/settings")
@CrossOrigin("*")
@Slf4j
public class UserSettingController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserSettingService userSettingService;

    @ApiOperation(value = "사용자 설정 정보 조회", notes = "userEmail로 설정 정보 조회하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "설정 정보 조회 성공"),
            @ApiResponse(code = 404, message = "설정 정보 조회 실패 - 존재하지 않는 사용자"),
            @ApiResponse(code = 500, message = "설정 정보 조회 실패 - 서버(DB)오류")
    })
    @GetMapping("/{userEmail}")
    public ResponseEntity<?> getUserSetting(@PathVariable String userEmail) {
        log.info("UserSettingController - getUserSetting : 사용자 설정 정보 조회");
        try {
            Optional<UserSetting> userSetting = userSettingService.getUserSetting(userEmail);
            log.info("설정 정보 조회 성공");
            return new ResponseEntity<Optional<UserSetting>>(userSetting, HttpStatus.OK);
        } catch (NotRegisteredException e){
            //UserSetting 테이블에 해당 이메일이 없는 경우
            log.info("설정 정보 조회 실패 - 존재하지 않는 사용자");
            return new ResponseEntity<>(FAIL, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            log.info("설정 정보 조회 실패 - 서버(DB)오류");
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "사용자 설정 변경", notes = "사용자 설정 변경하는 API")
    @ApiResponses({
            @ApiResponse(code = 200, message = "사용자 설정 변경 성공"),
            @ApiResponse(code = 500, message = "사용자 설정 변경 실패 - 서버(DB)오류")
    })
    @PutMapping()
    public ResponseEntity<?> updateUserSetting(@RequestBody UserSetting userSetting) {
        log.info("UserSettingController - changeUserSetting : 사용자 설정 변경");
        try {
            userSettingService.updateUserSetting(userSetting);
            log.info("설정 변경 성공");
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("설정 변경 실패");
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
