package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.PullResultResponse;
import com.efrei.gacha.exception.BoxNotFoundException;
import com.efrei.gacha.exception.EmptyBoxException;
import com.efrei.gacha.exception.InsufficientCreditsException;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.model.Box;
import com.efrei.gacha.model.BoxItem;
import com.efrei.gacha.model.InventoryItem;
import com.efrei.gacha.model.Item;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.model.PullHistory;
import com.efrei.gacha.repository.BoxItemRepository;
import com.efrei.gacha.repository.BoxRepository;
import com.efrei.gacha.repository.InventoryItemRepository;
import com.efrei.gacha.repository.PlayerRepository;
import com.efrei.gacha.repository.PullHistoryRepository;
import com.efrei.gacha.service.BoxOpeningService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoxOpeningServiceImpl implements BoxOpeningService {

    private static final Logger log = LoggerFactory.getLogger(BoxOpeningServiceImpl.class);
    private static final int PULLS_PER_OPENING = 5;

    private final PlayerRepository playerRepository;
    private final BoxRepository boxRepository;
    private final BoxItemRepository boxItemRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final PullHistoryRepository pullHistoryRepository;

    @Autowired
    public BoxOpeningServiceImpl(PlayerRepository playerRepository,
                                 BoxRepository boxRepository,
                                 BoxItemRepository boxItemRepository,
                                 InventoryItemRepository inventoryItemRepository,
                                 PullHistoryRepository pullHistoryRepository) {
        this.playerRepository = playerRepository;
        this.boxRepository = boxRepository;
        this.boxItemRepository = boxItemRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.pullHistoryRepository = pullHistoryRepository;
    }

    @Override
    @Transactional
    public List<PullResultResponse> openBox(Long playerId, Long boxId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
        Box box = boxRepository.findById(boxId)
                .orElseThrow(() -> new BoxNotFoundException(boxId));

        if (player.getCredits() < box.getPrice()) {
            throw new InsufficientCreditsException(playerId);
        }

        List<BoxItem> boxItems = boxItemRepository.findById_BoxId(boxId);
        if (boxItems.isEmpty()) {
            throw new EmptyBoxException(boxId);
        }

        player.setCredits(player.getCredits() - box.getPrice());
        playerRepository.save(player);

        List<PullResultResponse> results = new ArrayList<>();
        for (int i = 0; i < PULLS_PER_OPENING; i++) {
            Item drawnItem = drawItem(boxItems);

            InventoryItem inventoryItem = inventoryItemRepository
                    .findByPlayerIdAndItemId(playerId, drawnItem.getId())
                    .orElseGet(() -> InventoryItem.builder()
                            .player(player)
                            .item(drawnItem)
                            .quantity(0)
                            .build());
            inventoryItem.setQuantity(inventoryItem.getQuantity() + 1);
            inventoryItemRepository.save(inventoryItem);

            pullHistoryRepository.save(PullHistory.builder()
                    .player(player)
                    .box(box)
                    .item(drawnItem)
                    .pulledAt(LocalDateTime.now())
                    .build());

            results.add(new PullResultResponse(
                    drawnItem.getId(),
                    drawnItem.getName(),
                    drawnItem.getImageUrl(),
                    drawnItem.getRarity().getName(),
                    drawnItem.getRarity().getColorHex(),
                    drawnItem.getSellPrice(),
                    player.getCredits()
            ));

            log.info("Player {} opened box {} and got item {}", playerId, boxId, drawnItem.getId());
        }

        return results;
    }

    private Item drawItem(List<BoxItem> boxItems) {
        double totalWeight = boxItems.stream()
                .mapToDouble(bi -> bi.getItem().getRarity().getDropRate())
                .sum();

        double roll = Math.random() * totalWeight;
        double cumulative = 0;

        for (BoxItem boxItem : boxItems) {
            cumulative += boxItem.getItem().getRarity().getDropRate();
            if (roll <= cumulative) {
                return boxItem.getItem();
            }
        }
        return boxItems.get(boxItems.size() - 1).getItem();
    }
}