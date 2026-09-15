package com.efrei.gacha.repository;

import com.efrei.gacha.model.PullHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PullHistoryRepository extends JpaRepository<PullHistory, Long> {

    List<PullHistory> findByPlayerIdOrderByPulledAtDesc(Long playerId);
    Optional<PullHistory> findFirstByPlayerIdAndItemIdAndSoldFalse(Long playerId, Long itemId);
}