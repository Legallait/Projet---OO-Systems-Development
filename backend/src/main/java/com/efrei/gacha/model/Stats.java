package com.efrei.gacha.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "stats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false, unique = true)
    private Player player;

    @Builder.Default
    private Integer boxOpened = 0;

    @ElementCollection
    @CollectionTable(
            name = "stats_box_opened_by_type",
            joinColumns = @JoinColumn(name = "stats_id")
    )
    @MapKeyColumn(name = "box_type")
    @Column(name = "count")
    @Builder.Default
    private Map<String, Integer> boxOpenedByType = new HashMap<>();
}