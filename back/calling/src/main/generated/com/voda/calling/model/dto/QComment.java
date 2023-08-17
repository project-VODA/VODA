package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComment extends EntityPathBase<Comment> {

    private static final long serialVersionUID = 2132344406L;

    public static final QComment comment = new QComment("comment");

    public final NumberPath<Integer> articleNo = createNumber("articleNo", Integer.class);

    public final StringPath commentContent = createString("commentContent");

    public final NumberPath<Integer> commentModified = createNumber("commentModified", Integer.class);

    public final NumberPath<Integer> commentNo = createNumber("commentNo", Integer.class);

    public final StringPath commentRegTime = createString("commentRegTime");

    public final StringPath userEmail = createString("userEmail");

    public QComment(String variable) {
        super(Comment.class, forVariable(variable));
    }

    public QComment(Path<? extends Comment> path) {
        super(path.getType(), path.getMetadata());
    }

    public QComment(PathMetadata metadata) {
        super(Comment.class, metadata);
    }

}

