package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;

@ApiModel("댓글 목록 조회 결과")
public interface CommentSearchResponse {

    int getCommentNo();
    String getUserName();
    String getCommentContent();
    String getCommentRegTime();
}
