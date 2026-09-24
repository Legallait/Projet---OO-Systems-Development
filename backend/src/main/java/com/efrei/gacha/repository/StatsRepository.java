package com.efrei.gacha.repository;

import com.efrei.gacha.model.Stats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatsRepository extends JpaRepository<Stats, Long> {

    Optional<Stats> findByPlayerId(Long playerId);
}