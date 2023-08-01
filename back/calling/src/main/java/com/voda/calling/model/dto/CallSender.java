package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("전화 요청시 전달할 객체")
public class CallSender {

    @ApiModelProperty(value="송신자(전화를 건 사람)", required = true)
    private String senderEmail;
    @ApiModelProperty(value="수신자(전화를 받는 사람)", required = true)
    private String receiverEmail;

}
