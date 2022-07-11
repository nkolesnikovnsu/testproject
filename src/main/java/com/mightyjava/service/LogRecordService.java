package com.mightyjava.service;

import com.mightyjava.domain.LogRecord;

import java.util.List;

public interface LogRecordService {

    LogRecord save(LogRecord logRecord);

    List<LogRecord> getTodayRecords(String ip, String userAgent);

}
