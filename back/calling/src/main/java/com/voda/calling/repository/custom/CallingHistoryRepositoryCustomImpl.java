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

//    @Override
//    public List<RecentCall> findAllByUserEmail(String userEmail) {
//        List<RecentCall> recentCallList = new ArrayList<>();
//        List<Tuple> tempList;
//
//        QUser user1 = new QUser("user1");
//        QUser user2 = new QUser("user2");
//        QCallHistory qCallHistory = new QCallHistory("qCallHistory");
//
//        StringExpression formattedStartTime = Expressions.stringTemplate("CASE " +
//                "WHEN {0} IS NULL THEN NULL " +
//                "WHEN DATE({0}) = CURRENT_DATE() THEN TIME({0}) " +
//                "ELSE DATE_FORMAT({0}, '%Y-%m-%d') END", qCallHistory.callStarttime);
//
//        StringExpression formattedEndTime = Expressions.stringTemplate("CASE " +
//                "WHEN {0} IS NULL THEN NULL " +
//                "WHEN DATE({0}) = CURRENT_DATE() THEN TIME({0}) " +
//                "ELSE DATE_FORMAT({0}, '%Y-%m-%d') END", qCallHistory.callEndtime);
//
//
//        tempList = queryFactory
//                .select(
//                        user1.userEmail,
//                        user1.userName,
//                        user2.userEmail,
//                        user2.userName,
//                        qCallHistory.callNo.max().as("recentCallNo"),
//                        formattedStartTime.max().as("formattedStartTime"),
//                        formattedEndTime.max().as("formattedEndTime")
//                )
//                .from(qCallHistory)
//                .join(user1).on(user1.userEmail.eq(qCallHistory.callSender))
//                .join(user2).on(user2.userEmail.eq(qCallHistory.callReceiver))
//                .where(
//                        qCallHistory.callStatus.eq(2),
//                        qCallHistory.callSender.eq(userEmail).or(qCallHistory.callReceiver.eq(userEmail))
//                )
//                .groupBy(
//                        user1.userEmail,
//                        user1.userName,
//                        user2.userEmail,
//                        user2.userName
//                )
//                .orderBy(qCallHistory.callNo.max().desc())
//                .limit(50)
//                .fetch();
//
////        for(Tuple t : tempList){
////            RecentCall r = new RecentCall(t.get(user1.userEmail),t.get(user1.userName),t.get(user2.userEmail),t.get(user2.userName),
////                                            t.get(qCallHistory.callStarttime).to, t.get(qCallHistory.callEndtime)
////            );
////            System.out.println(t.toString());
////            recentCallList.add(r);
////        }
//
//        return recentCallList;
//    }

}
