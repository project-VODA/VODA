package com.voda.calling.repository.custom;

import com.voda.calling.model.dto.CallHistory;

public interface CallingHistoryRepositoryCustom {

    CallHistory findCallHistoryBySenderEmail(String email); //송신자에게 걸려온 통화가 있는지 조회

    CallHistory findCallHistoryByReceiverEmail(String email); //수신자의 통화상태가 0(대기중), 1(통화중)인 데이터 조회

    CallHistory findCurrentCallHistoryByReceiverEmail(String email); //전화 받을때 찾아오는 callhistorynum;

}
