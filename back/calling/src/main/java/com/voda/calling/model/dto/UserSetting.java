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
@Table(name = "usersetting")
@ApiModel(value  = "사용자 환경설정")
public class UserSetting {

    @Id
    @Column(name = "user_email")
    @ApiModelProperty(value="회원 이메일", example = "voda@voda.com", required = true)
    private String userEmail;

    @Column(name = "usersetting_type_no")
    @ApiModelProperty(value="알림 타입 설정", example = "1")
    private int usersettingTypeNo;

    @Column(name = "usersetting_screen_type")
    @ApiModelProperty(value="화면 타입 설정", example = "1")
    private int usersettingScreenType;
}
