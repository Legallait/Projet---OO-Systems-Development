package com.efrei.gacha.service;

import com.efrei.gacha.dto.InventoryItemResponse;
import com.efrei.gacha.dto.PlayerResponse;
import com.efrei.gacha.dto.PullHistoryResponse;
import com.efrei.gacha.dto.SellItemResponse;
import java.util.List;

public interface PlayerService {

    PlayerResponse createPlayer(String username, String password);

    PlayerResponse login(String username, String password);

    PlayerResponse getPlayer(Long id);

    List<InventoryItemResponse> getInventory(Long playerId);

    List<PullHistoryResponse> getHistory(Long playerId);

    SellItemResponse sellItem(Long playerId, Long itemId);
}
