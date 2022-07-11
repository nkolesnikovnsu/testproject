package com.mightyjava.repository;

import com.mightyjava.domain.LogRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface LogRecordRepository extends JpaRepository<LogRecord, Long> {
    @Query(value = "select * from request_log l where datediff(l.date, :date) = 0 and ip_address = :ipAddress and user_agent = :userAgent", nativeQuery = true)
    List<LogRecord> getRecordByDateAndIpAddress(Date date, String ipAddress, String userAgent);
}
