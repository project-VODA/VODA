package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("비밀번호 변경 요청")
public class UserChangePasswordRequest {

    @ApiModelProperty(value="회원 이메일", example = "voda@voda.com", required = true)
    private String userEmail;
    @ApiModelProperty(value="기존 비밀번호", example = "1234", required = true)
    private String originalPass;
    @ApiModelProperty(value="새 비밀번호", example = "12345", required = true)
    private String newPass;
}
