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
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user_callhistory")
@ApiModel(value  = "통화목록 맵핑테이블")
public class UserCallHistory {

    @Id
    @Column(name = "user_call_no")
    @ApiModelProperty(value="통화목록 번호")
    private int userCallNo;

    @Column(name = "call_no")
    @ApiModelProperty(value="통화 일련번호")
    private int callNo;

    @Column(name = "user_email")
    @ApiModelProperty(value="송신자 이메일")
    private String userEmail;


}
