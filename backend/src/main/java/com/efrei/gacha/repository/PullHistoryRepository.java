package com.efrei.gacha.repository;

import com.efrei.gacha.model.PullHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PullHistoryRepository extends JpaRepository<PullHistory, Long> {

    List<PullHistory> findByPlayerIdOrderByPulledAtDesc(Long playerId);

    List<PullHistory> findByPlayerIdAndSoldTrue(Long playerId);

    Optional<PullHistory> findFirstByPlayerIdAndItemIdAndSoldFalse(Long playerId, Long itemId);
}
