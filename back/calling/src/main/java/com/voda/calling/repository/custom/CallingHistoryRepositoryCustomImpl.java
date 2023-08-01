package com.voda.calling.repository.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.voda.calling.model.dto.CallHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
