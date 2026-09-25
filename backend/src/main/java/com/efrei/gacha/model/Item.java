package com.efrei.gacha.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String imageUrl;

    private Integer sellPrice;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String wikipediaUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rarity_id", nullable = false)
    private Rarity rarity;
}
