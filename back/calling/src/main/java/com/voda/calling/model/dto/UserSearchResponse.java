package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel("회원 검색 결과")
public class UserSearchResponse {
    
    private String userEmail;
    private String userName;
    private boolean isFriend;//친구 여부

    public UserSearchResponse(String userEmail, String userName, boolean isFriend) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.isFriend = isFriend;
    }
}
