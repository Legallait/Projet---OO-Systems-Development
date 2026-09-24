package com.efrei.gacha.repository;

import com.efrei.gacha.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByPlayerId(Long playerId);

    Optional<InventoryItem> findByPlayerIdAndItemId(Long playerId, Long itemId);

    Optional<InventoryItem> findFirstByPlayerIdAndQuantityGreaterThanOrderByItemRarityDropRateAsc(Long playerId, Integer quantity);
}