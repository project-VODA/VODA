package com.voda.calling.model.dto;

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
@Table(name = "emotion")
public class Emotion {

    @Id
    @Column(name = "emotion_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int emotionNo;
    @Column(name = "emotion_name")
    private String emotionName;
    @Column(name = "emotion_sound")
    private String emotionSound;
    @Column(name = "emotion_voice")
    private String emotionVoice;
    @Column(name = "emotion_voice_advice")
    private String emotionVoiceAdvice;

}
