package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.RarestCardResponse;
import com.efrei.gacha.dto.StatsResponse;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.model.InventoryItem;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.model.Stats;
import com.efrei.gacha.repository.InventoryItemRepository;
import com.efrei.gacha.repository.PlayerRepository;
import com.efrei.gacha.repository.StatsRepository;
import com.efrei.gacha.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatsServiceImpl implements StatsService {

    private final StatsRepository statsRepository;
    private final PlayerRepository playerRepository;
    private final InventoryItemRepository inventoryItemRepository;

    @Autowired
    public StatsServiceImpl(StatsRepository statsRepository,
                            PlayerRepository playerRepository,
                            InventoryItemRepository inventoryItemRepository) {
        this.statsRepository = statsRepository;
        this.playerRepository = playerRepository;
        this.inventoryItemRepository = inventoryItemRepository;
    }

    @Override
    @Transactional
    public void createStatsFor(Player player) {
        Stats stats = Stats.builder()
                .player(player)
                .build();
        statsRepository.save(stats);
    }

    @Override
    @Transactional
    public void recordOpening(Long playerId, String boxType) {
        Stats stats = statsRepository.findByPlayerId(playerId)
                .orElseGet(() -> {
                    Player player = playerRepository.findById(playerId)
                            .orElseThrow(() -> new PlayerNotFoundException(playerId));
                    return statsRepository.save(Stats.builder().player(player).build());
                });

        stats.setBoxOpened(stats.getBoxOpened() + 1);
        stats.getBoxOpenedByType().merge(boxType, 1, Integer::sum);

        statsRepository.save(stats);
    }

    @Override
    @Transactional(readOnly = true)
    public StatsResponse getStats(Long playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new PlayerNotFoundException(playerId);
        }

        Stats stats = statsRepository.findByPlayerId(playerId).orElse(null);
        Integer boxOpened = stats != null ? stats.getBoxOpened() : 0;
        Map<String, Integer> boxOpenedByType = stats != null ? stats.getBoxOpenedByType() : new HashMap<>();

        List<InventoryItem> inventory = inventoryItemRepository.findByPlayerId(playerId);

        RarestCardResponse rarestCard = inventoryItemRepository
                .findFirstByPlayerIdAndQuantityGreaterThanOrderByItemRarityDropRateAsc(playerId, 0)
                .map(this::toRarestCardResponse)
                .orElse(null);

        Map<String, Long> cardsByRarity = new HashMap<>();
        for (InventoryItem inv : inventory) {
            String rarityName = inv.getItem().getRarity().getName();
            cardsByRarity.merge(rarityName, (long) inv.getQuantity(), Long::sum);
        }

        return new StatsResponse(playerId, boxOpened, boxOpenedByType, rarestCard, cardsByRarity);
    }

    private RarestCardResponse toRarestCardResponse(InventoryItem inventoryItem) {
        return new RarestCardResponse(
                inventoryItem.getItem().getId(),
                inventoryItem.getItem().getName(),
                inventoryItem.getItem().getRarity().getName(),
                inventoryItem.getItem().getRarity().getColorHex()
        );
    }
}