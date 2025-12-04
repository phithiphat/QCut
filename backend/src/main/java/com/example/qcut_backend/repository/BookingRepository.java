package com.example.qcut_backend.repository;

import com.example.qcut_backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);

    List<Booking> findByShopId(Long shopId);

    // Find overlapping bookings to prevent double booking
    // WHERE shop_id = ? AND status != REJECTED AND ((start < newEnd) AND (end >
    // newStart))
    List<Booking> findByShopIdAndStatusNotAndStartTimeBeforeAndEndTimeAfter(
            Long shopId,
            Booking.Status status,
            LocalDateTime endTime,
            LocalDateTime startTime);
}
