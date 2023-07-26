package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "articles")
@ApiModel(value  = "게시글")
public class Article {

    @Id
    @Column(name = "article_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="게시글 번호")
    private int articleNo;

    @Column(name = "article_title")
    @ApiModelProperty(value="게시글 제목", example = "게시글 제목", required = true)
    private String articleTitle;

    @Column(name = "user_email")
    @ApiModelProperty(value="작성자 이메일", example = "voda@voda.com", required = true)
    private String userEmail;

    @Column(name = "article_content")
    @ApiModelProperty(value="게시글 내용", example = "게시글 내용입니다.", required = true)
    private String articleContent;

    @CreationTimestamp // INSERT 시 자동으로 값을 채워줌
    @Column(name = "article_regtime")
    @ApiModelProperty(value="게시글 작성일", example = "2023/07/24", required = true)
    private Timestamp articleRegTime;

    @Column(name = "article_modified")
    @ApiModelProperty(value="게시글 수정 여부 (기본값 0, 수정된 게시글이면 1)", example = "0", required = true)
    private int articleModified;

    @Column(name = "article_cancel")
    @ApiModelProperty(value="게시글 삭제 여부 (기본값 0, 삭제된 게시글이면 1)", example = "0", required = true)
    private int articleCancel;
}