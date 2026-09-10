package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.InventoryItemResponse;
import com.efrei.gacha.dto.PullHistoryResponse;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.repository.InventoryItemRepository;
import com.efrei.gacha.repository.PlayerRepository;
import com.efrei.gacha.repository.PullHistoryRepository;
import com.efrei.gacha.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {

    private static final int STARTING_CREDITS = 1000;

    private final PlayerRepository playerRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final PullHistoryRepository pullHistoryRepository;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepository,
                              InventoryItemRepository inventoryItemRepository,
                              PullHistoryRepository pullHistoryRepository) {
        this.playerRepository = playerRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.pullHistoryRepository = pullHistoryRepository;
    }

    @Override
    public Player createPlayer(String username) {
        Player player = Player.builder()
                .username(username)
                .credits(STARTING_CREDITS)
                .createdAt(LocalDateTime.now())
                .build();
        return playerRepository.save(player);
    }

    @Override
    public Player getPlayer(Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException(id));
    }

    @Override
    public List<InventoryItemResponse> getInventory(Long playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new PlayerNotFoundException(playerId);
        }
        return inventoryItemRepository.findByPlayerId(playerId).stream()
                .map(inv -> new InventoryItemResponse(
                        inv.getItem().getId(),
                        inv.getItem().getName(),
                        inv.getItem().getRarity().getName(),
                        inv.getItem().getRarity().getColorHex(),
                        inv.getQuantity()
                ))
                .toList();
    }

    @Override
    public List<PullHistoryResponse> getHistory(Long playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new PlayerNotFoundException(playerId);
        }
        return pullHistoryRepository.findByPlayerIdOrderByPulledAtDesc(playerId).stream()
                .map(pull -> new PullHistoryResponse(
                        pull.getBox().getName(),
                        pull.getItem().getName(),
                        pull.getItem().getRarity().getName(),
                        pull.getPulledAt()
                ))
                .toList();
    }
}
