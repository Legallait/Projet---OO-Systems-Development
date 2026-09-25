package com.efrei.gacha.repository;

import com.efrei.gacha.model.Stats;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatsRepository extends JpaRepository<Stats, Long> {

    Optional<Stats> findByPlayerId(Long playerId);
}
