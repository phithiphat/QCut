package com.example.qcut_backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingRequest {
    private Long shopId;
    private Long serviceId;
    private Long barberId;
    private LocalDateTime startTime;
}
