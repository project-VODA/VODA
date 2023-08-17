package com.voda.calling.repository.custom;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.model.dto.QCallHistory;
import com.voda.calling.model.dto.QUser;
import com.voda.calling.model.dto.RecentCall;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.voda.calling.model.dto.QCallHistory.callHistory;

@Repository
@RequiredArgsConstructor
public class CallingHistoryRepositoryCustomImpl implements CallingHistoryRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public CallHistory findCallHistoryBySenderEmail(String email) {
        return queryFactory
                .selectFrom(callHistory)
                .where(callHistory.callReceiver.eq(email)
                        .and(callHistory.callStatus.eq(0)))
                .fetchOne();
    }

    @Override
    public CallHistory findCallHistoryByReceiverEmail(String email) {
        return queryFactory
                .selectFrom(callHistory)
                .where(callHistory.callStatus.in(0,1)
                        .and((callHistory.callSender.eq(email)).or(callHistory.callReceiver.eq(email))))
                .fetchOne();
    }

    @Override
    public CallHistory findCallHistoryByCallNo(int callNo) {
        return queryFactory
                .selectFrom(callHistory)
                .where(callHistory.callNo.eq(callNo)
                        .and(callHistory.callCancel.eq(0)))
                .fetchOne();

    }

}
