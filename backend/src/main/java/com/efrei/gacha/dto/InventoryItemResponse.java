package com.efrei.gacha.dto;

public record InventoryItemResponse(
        Long itemId,
        String itemName,
        String rarityName,
        String rarityColorHex,
        Integer quantity
) {
}
