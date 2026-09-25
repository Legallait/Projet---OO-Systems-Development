package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.InventoryItemResponse;
import com.efrei.gacha.dto.PlayerResponse;
import com.efrei.gacha.dto.PullHistoryResponse;
import com.efrei.gacha.dto.SellItemResponse;
import com.efrei.gacha.exception.InvalidCredentialsException;
import com.efrei.gacha.exception.ItemNotInInventoryException;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.exception.UsernameAlreadyExistsException;
import com.efrei.gacha.model.InventoryItem;
import com.efrei.gacha.model.Item;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.repository.InventoryItemRepository;
import com.efrei.gacha.repository.PlayerRepository;
import com.efrei.gacha.repository.PullHistoryRepository;
import com.efrei.gacha.service.PlayerService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlayerServiceImpl implements PlayerService {

    private static final Logger log = LoggerFactory.getLogger(PlayerServiceImpl.class);
    private static final int STARTING_CREDITS = 2500;

    private final PlayerRepository playerRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final PullHistoryRepository pullHistoryRepository;

    @Autowired
    public PlayerServiceImpl(
            PlayerRepository playerRepository,
            InventoryItemRepository inventoryItemRepository,
            PullHistoryRepository pullHistoryRepository) {
        this.playerRepository = playerRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.pullHistoryRepository = pullHistoryRepository;
    }

    @Override
    public PlayerResponse createPlayer(String username, String password) {
        if (playerRepository.findByUsername(username).isPresent()) {
            log.warn("Registration refused: username '{}' already taken", username);
            throw new UsernameAlreadyExistsException(username);
        }
        Player player = Player.builder()
                .username(username)
                .password(password)
                .credits(STARTING_CREDITS)
                .createdAt(LocalDateTime.now())
                .build();
        Player saved = playerRepository.save(player);
        log.info("Player {} registered as '{}' with {} credits", saved.getId(), username, STARTING_CREDITS);
        return PlayerResponse.from(saved);
    }

    @Override
    public PlayerResponse login(String username, String password) {
        Player player = playerRepository.findByUsername(username).orElse(null);
        if (player == null || !Objects.equals(player.getPassword(), password)) {
            log.warn("Failed login attempt for username '{}'", username);
            throw new InvalidCredentialsException();
        }
        log.info("Player {} ('{}') logged in", player.getId(), username);
        return PlayerResponse.from(player);
    }

    @Override
    public PlayerResponse getPlayer(Long id) {
        return playerRepository
                .findById(id)
                .map(PlayerResponse::from)
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
                        inv.getItem().getImageUrl(),
                        inv.getItem().getDescription(),
                        inv.getItem().getWikipediaUrl(),
                        inv.getItem().getRarity().getName(),
                        inv.getItem().getRarity().getColorHex(),
                        inv.getItem().getSellPrice(),
                        inv.getQuantity()))
                .toList();
    }

    @Override
    public List<PullHistoryResponse> getHistory(Long playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new PlayerNotFoundException(playerId);
        }
        return pullHistoryRepository.findByPlayerIdOrderByPulledAtDesc(playerId).stream()
                .map(pull -> new PullHistoryResponse(
                        pull.getId(),
                        pull.getItem().getId(),
                        pull.getBox().getName(),
                        pull.getItem().getName(),
                        pull.getItem().getRarity().getName(),
                        pull.getItem().getSellPrice(),
                        pull.getSold(),
                        pull.getPulledAt(),
                        pull.getSoldPrice(),
                        pull.getSoldAt()))
                .toList();
    }

    @Override
    @Transactional
    public SellItemResponse sellItem(Long playerId, Long itemId) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new PlayerNotFoundException(playerId));

        InventoryItem inventoryItem = inventoryItemRepository
                .findByPlayerIdAndItemId(playerId, itemId)
                .filter(inv -> inv.getQuantity() > 0)
                .orElseThrow(() -> new ItemNotInInventoryException(playerId, itemId));

        Item item = inventoryItem.getItem();
        int sellPrice = item.getSellPrice();

        player.setCredits(player.getCredits() + sellPrice);
        playerRepository.save(player);

        int remainingQuantity = inventoryItem.getQuantity() - 1;
        if (remainingQuantity <= 0) {
            inventoryItemRepository.delete(inventoryItem);
        } else {
            inventoryItem.setQuantity(remainingQuantity);
            inventoryItemRepository.save(inventoryItem);
        }

        pullHistoryRepository
                .findFirstByPlayerIdAndItemIdAndSoldFalse(playerId, itemId)
                .ifPresent(pull -> {
                    pull.setSold(true);
                    pull.setSoldAt(LocalDateTime.now());
                    pull.setSoldPrice(sellPrice);
                    pullHistoryRepository.save(pull);
                });

        log.info(
                "Player {} sold item {} ('{}') for {} credits, {} left, balance {}",
                playerId,
                itemId,
                item.getName(),
                sellPrice,
                Math.max(remainingQuantity, 0),
                player.getCredits());
        return new SellItemResponse(itemId, sellPrice, player.getCredits(), Math.max(remainingQuantity, 0));
    }
}
