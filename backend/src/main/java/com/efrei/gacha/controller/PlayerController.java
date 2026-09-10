package com.efrei.gacha.controller;

import com.efrei.gacha.dto.CreatePlayerRequest;
import com.efrei.gacha.dto.InventoryItemResponse;
import com.efrei.gacha.dto.PullHistoryResponse;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @ExceptionHandler(PlayerNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handlePlayerNotFound(PlayerNotFoundException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return response;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Player createPlayer(@RequestBody CreatePlayerRequest request) {
        return playerService.createPlayer(request.username());
    }

    @GetMapping("/{playerId}")
    @ResponseStatus(HttpStatus.OK)
    public Player getPlayer(@PathVariable Long playerId) {
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
}
