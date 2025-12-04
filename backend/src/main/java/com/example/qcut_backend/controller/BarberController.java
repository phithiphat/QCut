package com.example.qcut_backend.controller;

import com.example.qcut_backend.model.Barber;
import com.example.qcut_backend.model.Shop;
import com.example.qcut_backend.repository.BarberRepository;
import com.example.qcut_backend.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BarberController {

    @Autowired
    BarberRepository barberRepository;

    @Autowired
    ShopRepository shopRepository;

    @GetMapping("/shops/{shopId}/barbers")
    public List<Barber> getBarbersByShop(@PathVariable Long shopId) {
        return barberRepository.findByShopId(shopId);
    }

    @PostMapping("/shops/{shopId}/barbers")
    public ResponseEntity<?> addBarber(@PathVariable Long shopId, @RequestBody Barber barber) {
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        barber.setShop(shop);
        barber.setStatus(Barber.Status.AVAILABLE);

        return ResponseEntity.ok(barberRepository.save(barber));
    }

    @DeleteMapping("/barbers/{id}")
    public ResponseEntity<?> deleteBarber(@PathVariable Long id) {
        barberRepository.deleteById(id);
        return ResponseEntity.ok("Barber deleted successfully");
    }
}
