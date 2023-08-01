package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("전화 요청후 받을 객체")
public class CallSendResponse {

    @ApiModelProperty(value="고유한 세션id", required = true)
    private String sessionId;
    @ApiModelProperty(value="callNo(키값)", required = true)
    private int callNo;
}
