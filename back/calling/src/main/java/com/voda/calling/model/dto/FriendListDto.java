package com.voda.calling.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class FriendListDto {

    private List<FriendResponse> friendResponseList = new ArrayList<>();

    private int totalPages;

    private int totalCount;

    @Builder
    public FriendListDto(List<FriendResponse> friendResponseList, int totalPages, int totalCount){
        this.friendResponseList = friendResponseList.stream().map(FriendResponse::new).collect(Collectors.toList());
    }
}
