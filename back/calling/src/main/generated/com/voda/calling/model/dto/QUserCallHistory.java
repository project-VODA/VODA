package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserCallHistory is a Querydsl query type for UserCallHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserCallHistory extends EntityPathBase<UserCallHistory> {

    private static final long serialVersionUID = -994679678L;

    public static final QUserCallHistory userCallHistory = new QUserCallHistory("userCallHistory");

    public final NumberPath<Integer> callNo = createNumber("callNo", Integer.class);

    public final NumberPath<Integer> userCallNo = createNumber("userCallNo", Integer.class);

    public final StringPath userEmail = createString("userEmail");

    public QUserCallHistory(String variable) {
        super(UserCallHistory.class, forVariable(variable));
    }

    public QUserCallHistory(Path<? extends UserCallHistory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserCallHistory(PathMetadata metadata) {
        super(UserCallHistory.class, metadata);
    }

}

