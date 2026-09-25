package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.RarestCardResponse;
import com.efrei.gacha.dto.StatsResponse;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.model.InventoryItem;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.model.PullHistory;
import com.efrei.gacha.model.Stats;
import com.efrei.gacha.repository.InventoryItemRepository;
import com.efrei.gacha.repository.PlayerRepository;
import com.efrei.gacha.repository.PullHistoryRepository;
import com.efrei.gacha.repository.StatsRepository;
import com.efrei.gacha.service.StatsService;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StatsServiceImpl implements StatsService {

    private static final Logger log = LoggerFactory.getLogger(StatsServiceImpl.class);

    // Rarities listed in full on the dashboard.
    private static final Set<String> HIGH_TIER_RARITIES = Set.of("Épique", "Légendaire");

    private final StatsRepository statsRepository;
    private final PlayerRepository playerRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final PullHistoryRepository pullHistoryRepository;

    @Autowired
    public StatsServiceImpl(
            StatsRepository statsRepository,
            PlayerRepository playerRepository,
            InventoryItemRepository inventoryItemRepository,
            PullHistoryRepository pullHistoryRepository) {
        this.statsRepository = statsRepository;
        this.playerRepository = playerRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.pullHistoryRepository = pullHistoryRepository;
    }

    @Override
    @Transactional
    public void recordOpening(Long playerId, String boxType) {
        Stats stats = statsRepository.findByPlayerId(playerId).orElseGet(() -> {
            Player player =
                    playerRepository.findById(playerId).orElseThrow(() -> new PlayerNotFoundException(playerId));
            log.info("Creating stats for player {}", playerId);
            return statsRepository.save(Stats.builder().player(player).build());
        });

        stats.setBoxOpened(stats.getBoxOpened() + 1);
        stats.getBoxOpenedByType().merge(boxType, 1, Integer::sum);

        statsRepository.save(stats);
        log.debug(
                "Player {} stats: {} boxes opened ({} x {})",
                playerId,
                stats.getBoxOpened(),
                stats.getBoxOpenedByType().get(boxType),
                boxType);
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

        // Rarest first (lowest drop rate), then alphabetical.
        List<RarestCardResponse> rareCards = inventory.stream()
                .filter(inv -> inv.getQuantity() > 0)
                .filter(inv ->
                        HIGH_TIER_RARITIES.contains(inv.getItem().getRarity().getName()))
                .sorted(Comparator.comparing(
                                (InventoryItem inv) -> inv.getItem().getRarity().getDropRate())
                        .thenComparing(inv -> inv.getItem().getName()))
                .map(this::toRarestCardResponse)
                .toList();

        Map<String, Long> cardsByRarity = new HashMap<>();
        for (InventoryItem inv : inventory) {
            String rarityName = inv.getItem().getRarity().getName();
            cardsByRarity.merge(rarityName, (long) inv.getQuantity(), Long::sum);
        }

        List<PullHistory> soldPulls = pullHistoryRepository.findByPlayerIdAndSoldTrue(playerId);
        long cardsSold = soldPulls.size();
        // Sales made before soldPrice was recorded fall back to the item's rarity-based sell price.
        long creditsEarned = soldPulls.stream()
                .mapToLong(pull -> pull.getSoldPrice() != null
                        ? pull.getSoldPrice()
                        : pull.getItem().getSellPrice())
                .sum();

        log.debug("Stats computed for player {}: {} boxes opened, {} cards sold", playerId, boxOpened, cardsSold);
        return new StatsResponse(
                playerId, boxOpened, boxOpenedByType, rareCards, cardsByRarity, cardsSold, creditsEarned);
    }

    private RarestCardResponse toRarestCardResponse(InventoryItem inventoryItem) {
        return new RarestCardResponse(
                inventoryItem.getItem().getId(),
                inventoryItem.getItem().getName(),
                inventoryItem.getItem().getRarity().getName(),
                inventoryItem.getItem().getRarity().getColorHex(),
                inventoryItem.getItem().getImageUrl(),
                inventoryItem.getQuantity());
    }
}
