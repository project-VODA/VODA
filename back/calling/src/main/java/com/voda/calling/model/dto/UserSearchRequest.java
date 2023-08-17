package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("회원 검색 요청")
public class UserSearchRequest {

    @ApiModelProperty(value="검색어", example = "vo", required = true)
    private String keyword;
    @ApiModelProperty(value="회원 이메일", example = "voda@voda.com", required = true)
    private String userEmail;

}
