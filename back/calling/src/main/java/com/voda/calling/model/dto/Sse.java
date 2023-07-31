package com.voda.calling.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "sses")
@ApiModel(value = "SSE")
public class Sse {
    @Id
    @Column(name = "sse_id")
    @ApiModelProperty(value = "sse id", notes = "{사용자 이메일}_{시간}으로 구성", example = "voda@voda.com_...", required = true)
    private String sseId;
    @Column(name = "sse_emitter")
    @ApiModelProperty(value = "sse emitter", notes = "sse emitter 객체", required = true)
    private String sseEmitter;
}
