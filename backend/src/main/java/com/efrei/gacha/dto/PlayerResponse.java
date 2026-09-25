package com.efrei.gacha.dto;

import com.efrei.gacha.model.Player;
import java.time.LocalDateTime;

public record PlayerResponse(Long id, String username, Integer credits, LocalDateTime createdAt) {

    public static PlayerResponse from(Player player) {
        return new PlayerResponse(player.getId(), player.getUsername(), player.getCredits(), player.getCreatedAt());
    }
}
