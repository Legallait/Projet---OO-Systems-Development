package com.efrei.gacha.dto;

public record PullResultResponse(
        Long itemId,
        String itemName,
        String itemImageUrl,
        String rarityName,
        String rarityColorHex,
        Integer remainingCredits
) {
}
