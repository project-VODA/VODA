package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("댓글 목록 조회 결과")
public class CommentSearchResponse {

    @ApiModelProperty(value="댓글 번호", example = "1", required = true)
    private int commentNo;
    @ApiModelProperty(value="회원 이름", example = "김이름", required = true)
    private String userName;
    @ApiModelProperty(value="댓글 내용", example = "굳", required = true)
    private String commentContent;
    @ApiModelProperty(value="작성 시간", example = "2023-07-24", required = true)
    private String commentRegTime;
}
