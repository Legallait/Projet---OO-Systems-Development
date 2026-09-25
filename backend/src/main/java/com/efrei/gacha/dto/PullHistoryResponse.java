package com.efrei.gacha.dto;

import java.time.LocalDateTime;

public record PullHistoryResponse(
        Long pullId,
        Long itemId,
        String boxName,
        String itemName,
        String rarityName,
        Integer sellPrice,
        Boolean sold,
        LocalDateTime pulledAt,
        Integer soldPrice,
        LocalDateTime soldAt) {}
