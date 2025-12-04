package com.example.qcut_backend.repository;

import com.example.qcut_backend.model.BarberService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarberServiceRepository extends JpaRepository<BarberService, Long> {
    List<BarberService> findByShopId(Long shopId);
}
