package com.voda.calling.repository.custom;

import com.querydsl.core.Tuple;
import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.model.dto.RecentCall;

import java.util.List;

public interface CallingHistoryRepositoryCustom {

    CallHistory findCallHistoryBySenderEmail(String email); //송신자에게 걸려온 통화가 있는지 조회

    CallHistory findCallHistoryByReceiverEmail(String email); //수신자의 통화상태가 0(대기중), 1(통화중)인 데이터 조회

    CallHistory findCallHistoryByCallNo(int callNo); //callNo으로 특정 callhostory 찾기

    List<RecentCall> findAllByUserEmail(String userEmail); //요청한 사용자의 최근 통화목록 가져오기


}
