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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "comments")
@ApiModel(value  = "댓글")
public class Comment {

    @Id
    @Column(name = "comment_no")
    @ApiModelProperty(value="댓글 번호", example = "1", required = true)
    private int commentNo;

    @Column(name = "user_email")
    @ApiModelProperty(value="회원 이메일", example = "voda@voda.com", required = true)
    private String userEmail;

    @Column(name = "article_no")
    @ApiModelProperty(value="글 번호", example = "2", required = true)
    private int articleNo;

    @Column(name = "comment_content")
    @ApiModelProperty(value="댓글 내용", example = "좋은 의견 감사합니다.", required = true)
    private String commentContent;

    @Column(name = "comment_regtime")
    @ApiModelProperty(value="댓글 작성 시간", example = "2023-07-24 14:33", required = false)
    private String commentRegTime;

}
