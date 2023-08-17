package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1212434636L;

    public static final QUser user = new QUser("user");

    public final NumberPath<Integer> userCancel = createNumber("userCancel", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Integer> userHandicap = createNumber("userHandicap", Integer.class);

    public final StringPath userName = createString("userName");

    public final StringPath userPass = createString("userPass");

    public final StringPath userRegTime = createString("userRegTime");

    public final StringPath userToken = createString("userToken");

    public final NumberPath<Integer> role = createNumber("role", Integer.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

