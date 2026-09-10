package com.efrei.gacha.repository;

import com.efrei.gacha.model.PullHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PullHistoryRepository extends JpaRepository<PullHistory, Long> {

    List<PullHistory> findByPlayerIdOrderByPulledAtDesc(Long playerId);
}