package com.example.qcut_backend.controller;

import com.example.qcut_backend.dto.BookingRequest;
import com.example.qcut_backend.model.*;
import com.example.qcut_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ShopRepository shopRepository;

    @Autowired
    BarberServiceRepository serviceRepository;

    @Autowired
    BarberRepository barberRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        Shop shop = shopRepository.findById(request.getShopId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        BarberService service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        Barber barber = null;
        if (request.getBarberId() != null) {
            barber = barberRepository.findById(request.getBarberId())
                    .orElseThrow(() -> new RuntimeException("Barber not found"));
        }

        // Calculate End Time
        LocalDateTime endTime = request.getStartTime().plusMinutes(service.getDurationMinutes());

        // Check for overlaps (Simple version: Check if *this* barber is busy, or if
        // *any* booking exists if no barber logic is strict)
        // For now, let's assume if barber is selected, we check that barber.
        // If no barber selected, we might need logic to find an available one, but
        // let's stick to "User selects Barber" for now.

        if (barber != null) {
            // TODO: Add repository method to check barber availability
        }

        // Re-using existing check for now, but ideally should be specific to Barber if
        // selected.
        // existing: findByShopIdAndStatusNotAndStartTimeBeforeAndEndTimeAfter
        // We should probably refine this to check Barber availability.

        List<Booking> overlaps = bookingRepository.findByShopIdAndStatusNotAndStartTimeBeforeAndEndTimeAfter(
                shop.getId(), Booking.Status.REJECTED, endTime, request.getStartTime());

        // Filter overlaps by barber if barber is selected
        if (barber != null) {
            Barber finalBarber = barber;
            boolean isBarberBusy = overlaps.stream()
                    .anyMatch(b -> b.getBarber() != null && b.getBarber().getId().equals(finalBarber.getId()));
            if (isBarberBusy) {
                return ResponseEntity.badRequest().body("Selected barber is busy at this time!");
            }
        } else {
            // If no barber selected, maybe we don't check specific barber overlap?
            // Or maybe we check if ALL barbers are busy?
            // For MVP, let's just warn if the SHOP is fully booked? No, that's hard.
            // Let's enforce Barber selection for now or allow overlap if different barbers.
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShop(shop);
        booking.setService(service);
        booking.setBarber(barber);
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(endTime);
        booking.setStatus(Booking.Status.PENDING);

        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @GetMapping("/my-bookings")
    public List<Booking> getMyBookings() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        return bookingRepository.findByUserId(user.getId());
    }

    @GetMapping("/shop/{shopId}")
    public List<Booking> getShopBookings(@PathVariable Long shopId) {
        return bookingRepository.findByShopId(shopId);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        try {
            Booking.Status newStatus = Booking.Status.valueOf(status.toUpperCase());

            // Authorization Logic
            if (newStatus == Booking.Status.CANCELLED) {
                System.out.println("DEBUG: Cancel Request - Booking ID: " + booking.getId());
                System.out.println("DEBUG: Current User ID: " + currentUser.getId());
                System.out.println("DEBUG: Booking User ID: " + booking.getUser().getId());
                System.out.println("DEBUG: Shop Owner ID: " + booking.getShop().getOwner().getId());

                // Only the user who made the booking or the shop owner can cancel
                if (!booking.getUser().getId().equals(currentUser.getId()) &&
                        !booking.getShop().getOwner().getId().equals(currentUser.getId())) {
                    return ResponseEntity.status(403).body("You are not authorized to cancel this booking.");
                }
            } else {
                // Only the shop owner can change other statuses (CONFIRMED, REJECTED,
                // COMPLETED)
                if (!booking.getShop().getOwner().getId().equals(currentUser.getId())) {
                    return ResponseEntity.status(403).body("You are not authorized to manage this booking.");
                }
            }

            booking.setStatus(newStatus);
            return ResponseEntity.ok(bookingRepository.save(booking));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status");
        }
    }
}
