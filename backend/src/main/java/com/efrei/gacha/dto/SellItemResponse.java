package com.efrei.gacha.dto;

public record SellItemResponse(
        Long itemId, Integer creditsEarned, Integer remainingCredits, Integer remainingQuantity) {}
