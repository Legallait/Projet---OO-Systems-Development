package com.efrei.gacha.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatsResponse {

    private Long playerId;
    private Integer boxOpened;
    private Map<String, Integer> boxOpenedByType;
    private RarestCardResponse rarestCard;
    private Map<String, Long> cardsByRarity;
}