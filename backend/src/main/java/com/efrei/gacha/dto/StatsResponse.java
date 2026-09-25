package com.efrei.gacha.dto;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatsResponse {

    private Long playerId;
    private Integer boxOpened;
    private Map<String, Integer> boxOpenedByType;
    private List<RarestCardResponse> rareCards;
    private Map<String, Long> cardsByRarity;
    private Long cardsSold;
    private Long creditsEarned;
}
