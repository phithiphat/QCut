package com.example.qcut_backend.controller;

import com.example.qcut_backend.model.Shop;
import com.example.qcut_backend.model.User;
import com.example.qcut_backend.repository.ShopRepository;
import com.example.qcut_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shops")
public class ShopController {

    @Autowired
    ShopRepository shopRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    com.example.qcut_backend.repository.BarberServiceRepository serviceRepository;

    @GetMapping
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @GetMapping("/my-shops")
    public ResponseEntity<?> getMyShops() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(shopRepository.findByOwnerId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<?> createShop(@RequestBody Shop shop) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        shop.setOwner(user);
        Shop savedShop = shopRepository.save(shop);

        // Create Default Services
        createDefaultService(savedShop, "Haircut", new java.math.BigDecimal("150.00"), 30);
        createDefaultService(savedShop, "Shave", new java.math.BigDecimal("100.00"), 20);
        createDefaultService(savedShop, "Full Service", new java.math.BigDecimal("300.00"), 60);

        return ResponseEntity.ok(savedShop);
    }

    private void createDefaultService(Shop shop, String name, java.math.BigDecimal price, Integer duration) {
        com.example.qcut_backend.model.BarberService service = new com.example.qcut_backend.model.BarberService();
        service.setShop(shop);
        service.setName(name);
        service.setPrice(price);
        service.setDurationMinutes(duration);
        serviceRepository.save(service);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShopById(@PathVariable Long id) {
        return shopRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/services")
    public ResponseEntity<List<com.example.qcut_backend.model.BarberService>> getShopServices(@PathVariable Long id) {
        return ResponseEntity.ok(serviceRepository.findByShopId(id));
    }
}
