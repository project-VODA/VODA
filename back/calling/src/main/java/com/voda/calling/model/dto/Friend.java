package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "friends")
@ApiModel(value  = "친구목록")
public class Friend {

    @Id
    @Column(name = "friend_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="친구목록 번호")
    private int friendNo;

    @Column(name = "user_email")
    @ApiModelProperty(value="사용자 이메일", example = "voda@voda.com", required = true)
    private String userEmail;

    @Column(name = "friend_email")
    @ApiModelProperty(value="친구 이메일", example = "ssafy@gmail.com", required = true)
    private String friendEmail;

    @Column(name = "friend_regtime")
    @ApiModelProperty(value="친구 등록일자", example = "2023-07-23")
    private String friendRegtime;

}
