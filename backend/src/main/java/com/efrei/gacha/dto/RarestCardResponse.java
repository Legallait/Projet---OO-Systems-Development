package com.efrei.gacha.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RarestCardResponse {

    private Long itemId;
    private String itemName;
    private String rarityName;
    private String rarityColorHex;
    private String itemImageUrl;
    private Integer quantity;
}
