package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("최근 통화 목록")
public class RecentCall {

    @ApiModelProperty(value="송신자 이메일(전화를 건 사람)", required = true)
    private String senderEmail;
    @ApiModelProperty(value="송신자 이름", required = true)
    private String senderName;
    @ApiModelProperty(value="수신자 이메일(전화를 받는 사람)", required = true)
    private String receiverEmail;
    @ApiModelProperty(value="수신자 이름", required = true)
    private String receiverName;
    @ApiModelProperty(value="통화시작시간", required = true)
    private String startTime;
    @ApiModelProperty(value="통화종료시간", required = true)
    private String endTime;


}
