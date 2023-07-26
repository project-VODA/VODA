package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "callhistory")
@ApiModel(value  = "통화목록" ,description = "통화목록번호, 송신자, 수신자, 통화시작시간, 통화종료시간, 통화데이터삭제여부, 통화상태 값을 가진 class")
public class CallHistory {

    @Id
    @Column(name = "call_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="통화목록 번호")
    private int callNo;

    @Column(name = "call_sender")
    @ApiModelProperty(value="송신자")
    private  String callSender;

    @Column(name = "call_receiver")
    @ApiModelProperty(value="수신자")
    private String callReceiver;

    @Column(name = "call_starttime")
    @ApiModelProperty(value="통화시작시간")
    private Timestamp callStarttime;

    @Column(name = "call_endtime")
    @ApiModelProperty(value="통화종료시간")
    private Timestamp callEndtime;

    @Column(name = "call_url")
    @ApiModelProperty(value="통화링크url")
    private String callUrl;

    @Column(name = "call_cancel")
    @ApiModelProperty(value="통화데이터 삭제여부")
    private int callCancel;

    @Column(name = "call_status")
    @ApiModelProperty(value="통화상태")
    private int callStatus;

}
