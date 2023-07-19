package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@ApiModel(value  = "회원")
public class User {

    @Id
    @Column(name = "user_email")
    @ApiModelProperty(value="회원 이메일", example = "voda@voda.com", required = true)
    private String userEmail;
    @Column(name = "user_pass")
    @ApiModelProperty(value="회원 비밀번호", example = "voda1234", required = true)
    private String userPass;
    @Column(name = "user_name")
    @ApiModelProperty(value="회원 이름", example = "김이름", required = true)
    private String userName;
    @Column(name = "user_token")
    @ApiModelProperty(value="로그인 시 발행되는 refresh token", example = "ajfbafjkbiuqfugkh", required = false)
    private String userToken;
    @Column(name = "user_handicap")
    @ApiModelProperty(value="시각장애 여부 (0:시각 장애인, 1:비장애인)", example = "0", required = true)
    private int userHandicap;
    @Column(name = "user_cancel")
    @ApiModelProperty(value="회원 탈퇴 여부 (0: 탈퇴안함, 1: 탈퇴함, 기본값 0)", example = "0", required = false)
    private int userCancel;
    @Column(name = "user_regtime")
    @ApiModelProperty(value="회원가입일", example = "2023-07-09", required = true)
    private String userRegTime;

}
