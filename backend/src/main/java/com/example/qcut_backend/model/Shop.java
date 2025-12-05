package com.example.qcut_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "shops")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    private String phoneNumber;

    private String openingTime; // Format: "09:00"
    private String closingTime; // Format: "20:00"

    private String imageUrl; // Shop image URL

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
}
