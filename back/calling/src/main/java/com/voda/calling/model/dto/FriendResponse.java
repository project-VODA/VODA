package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("친구 목록 결과")
public class FriendResponse {

    private int friendNo;
    private String userEmail;
    private String userName;
}