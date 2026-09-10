package com.efrei.gacha.dto;

import java.time.LocalDateTime;

public record PullHistoryResponse(
        String boxName,
        String itemName,
        String rarityName,
        LocalDateTime pulledAt
) {
}
