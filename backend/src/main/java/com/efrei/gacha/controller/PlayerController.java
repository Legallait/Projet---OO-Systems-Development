package com.efrei.gacha.controller;

import com.efrei.gacha.dto.InventoryItemResponse;
import com.efrei.gacha.dto.PlayerResponse;
import com.efrei.gacha.dto.PullHistoryResponse;
import com.efrei.gacha.dto.SellItemResponse;
import com.efrei.gacha.service.PlayerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/{playerId}")
    @ResponseStatus(HttpStatus.OK)
    public PlayerResponse getPlayer(@PathVariable Long playerId) {
        return playerService.getPlayer(playerId);
    }

    @GetMapping("/{playerId}/inventory")
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryItemResponse> getInventory(@PathVariable Long playerId) {
        return playerService.getInventory(playerId);
    }

    @GetMapping("/{playerId}/history")
    @ResponseStatus(HttpStatus.OK)
    public List<PullHistoryResponse> getHistory(@PathVariable Long playerId) {
        return playerService.getHistory(playerId);
    }

    @PostMapping("/{playerId}/inventory/{itemId}/sell")
    @ResponseStatus(HttpStatus.OK)
    public SellItemResponse sellItem(@PathVariable Long playerId, @PathVariable Long itemId) {
        return playerService.sellItem(playerId, itemId);
    }
}
