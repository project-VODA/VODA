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
public class CallReceiver {

    @ApiModelProperty(value="수신자(전화를 받는 사람)", required = true)
    private String receiverEmail;
    @ApiModelProperty(value="유니크한 세션id", required = true)
    private String sessionId;
}
