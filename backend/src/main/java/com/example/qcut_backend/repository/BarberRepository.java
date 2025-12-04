package com.example.qcut_backend.repository;

import com.example.qcut_backend.model.Barber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Long> {
    List<Barber> findByShopId(Long shopId);
}
