package com.voda.calling.model.dto;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QArticle is a Querydsl query type for Article
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticle extends EntityPathBase<Article> {

    private static final long serialVersionUID = 449567981L;

    public static final QArticle article = new QArticle("article");

    public final NumberPath<Integer> articleCancel = createNumber("articleCancel", Integer.class);

    public final StringPath articleContent = createString("articleContent");

    public final NumberPath<Integer> articleModified = createNumber("articleModified", Integer.class);

    public final NumberPath<Integer> articleNo = createNumber("articleNo", Integer.class);

    public final DateTimePath<java.sql.Timestamp> articleRegTime = createDateTime("articleRegTime", java.sql.Timestamp.class);

    public final StringPath articleTitle = createString("articleTitle");

    public final StringPath userEmail = createString("userEmail");

    public QArticle(String variable) {
        super(Article.class, forVariable(variable));
    }

    public QArticle(Path<? extends Article> path) {
        super(path.getType(), path.getMetadata());
    }

    public QArticle(PathMetadata metadata) {
        super(Article.class, metadata);
    }

}

