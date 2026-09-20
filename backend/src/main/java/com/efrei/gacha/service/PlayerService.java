package com.efrei.gacha.service;

import com.efrei.gacha.dto.InventoryItemResponse;
import com.efrei.gacha.dto.PullHistoryResponse;
import com.efrei.gacha.dto.SellItemResponse;
import com.efrei.gacha.model.Player;

import java.util.List;

public interface PlayerService {

    Player createPlayer(String username, String password);

    Player login(String username, String password);

    Player getPlayer(Long id);

    List<InventoryItemResponse> getInventory(Long playerId);

    List<PullHistoryResponse> getHistory(Long playerId);

    SellItemResponse sellItem(Long playerId, Long itemId);
}