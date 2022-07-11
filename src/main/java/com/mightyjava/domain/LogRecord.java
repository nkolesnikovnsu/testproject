package com.mightyjava.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "request_log")
@Data
public class LogRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="record_id", unique = true, nullable = false)
    private long id;

    @Column(name="ip_address")
    private String ipAddress;

    @Column(name = "date")
    private Date date;

    @Column(name = "user_agent")
    private String userAgent;

    @Column(name = "no_content")
    private String noContent;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "banner_id", referencedColumnName = "id")
    private Banner banner;

}
