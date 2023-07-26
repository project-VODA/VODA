package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserSetting is a Querydsl query type for UserSetting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserSetting extends EntityPathBase<UserSetting> {

    private static final long serialVersionUID = 441265276L;

    public static final QUserSetting userSetting = new QUserSetting("userSetting");

    public final StringPath userEmail = createString("userEmail");

    public final NumberPath<Integer> usersettingScreenType = createNumber("usersettingScreenType", Integer.class);

    public final NumberPath<Integer> usersettingTypeNo = createNumber("usersettingTypeNo", Integer.class);

    public QUserSetting(String variable) {
        super(UserSetting.class, forVariable(variable));
    }

    public QUserSetting(Path<? extends UserSetting> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserSetting(PathMetadata metadata) {
        super(UserSetting.class, metadata);
    }

}

