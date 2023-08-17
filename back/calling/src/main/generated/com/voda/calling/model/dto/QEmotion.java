package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEmotion is a Querydsl query type for Emotion
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmotion extends EntityPathBase<Emotion> {

    private static final long serialVersionUID = -442814382L;

    public static final QEmotion emotion = new QEmotion("emotion");

    public final StringPath emotionName = createString("emotionName");

    public final NumberPath<Integer> emotionNo = createNumber("emotionNo", Integer.class);

    public final StringPath emotionSound = createString("emotionSound");

    public final StringPath emotionVoice = createString("emotionVoice");

    public final StringPath emotionVoiceAdvice = createString("emotionVoiceAdvice");

    public QEmotion(String variable) {
        super(Emotion.class, forVariable(variable));
    }

    public QEmotion(Path<? extends Emotion> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEmotion(PathMetadata metadata) {
        super(Emotion.class, metadata);
    }

}

