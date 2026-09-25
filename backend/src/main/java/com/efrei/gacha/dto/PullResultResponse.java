package com.efrei.gacha.dto;

public record PullResultResponse(
        Long itemId,
        String itemName,
        String itemImageUrl,
        String itemDescription,
        String itemWikipediaUrl,
        String rarityName,
        String rarityColorHex,
        Integer sellPrice,
        Integer remainingCredits) {}
