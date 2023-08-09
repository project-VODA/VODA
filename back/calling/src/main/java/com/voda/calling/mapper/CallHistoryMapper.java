package com.voda.calling.mapper;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@MapperScan
@Repository
public interface CallHistoryMapper {

    List<Map<String, Object>> findRecentCall(String userEmail);
}
