package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCallHistory is a Querydsl query type for CallHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCallHistory extends EntityPathBase<CallHistory> {

    private static final long serialVersionUID = -729319219L;

    public static final QCallHistory callHistory = new QCallHistory("callHistory");

    public final NumberPath<Integer> callCancel = createNumber("callCancel", Integer.class);

    public final DateTimePath<java.sql.Timestamp> callEndtime = createDateTime("callEndtime", java.sql.Timestamp.class);

    public final NumberPath<Integer> callNo = createNumber("callNo", Integer.class);

    public final StringPath callReceiver = createString("callReceiver");

    public final StringPath callSender = createString("callSender");

    public final DateTimePath<java.sql.Timestamp> callStarttime = createDateTime("callStarttime", java.sql.Timestamp.class);

    public final NumberPath<Integer> callStatus = createNumber("callStatus", Integer.class);

    public final StringPath callUrl = createString("callUrl");

    public QCallHistory(String variable) {
        super(CallHistory.class, forVariable(variable));
    }

    public QCallHistory(Path<? extends CallHistory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCallHistory(PathMetadata metadata) {
        super(CallHistory.class, metadata);
    }

}

