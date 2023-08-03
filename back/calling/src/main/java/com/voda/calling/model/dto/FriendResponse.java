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
    private boolean isFriend;//친구 여부

    public FriendResponse(int friendNo, String userEmail, String userName) {
        this.friendNo = friendNo;
        this.userEmail = userEmail;
        this.userName = userName;
    }

    public FriendResponse(String userEmail, String userName, boolean isFriend) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.isFriend = isFriend;
    }
}