package com.mightyjava.service.impl;

import com.mightyjava.domain.LogRecord;
import com.mightyjava.repository.LogRecordRepository;
import com.mightyjava.service.LogRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LogRecordServiceImpl implements LogRecordService {
    private final LogRecordRepository logRecordRepository;

    @Autowired
    LogRecordServiceImpl(LogRecordRepository logRecordRepository) {
        this.logRecordRepository = logRecordRepository;
    }

    @Override
    public LogRecord save(LogRecord logRecord) {
        return logRecordRepository.save(logRecord);
    }

    @Override
    public List<LogRecord> getTodayRecords(String ipAddress, String userAgent) {
        return logRecordRepository.getRecordByDateAndIpAddress(new Date(), ipAddress, userAgent);
    }
}