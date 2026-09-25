package com.efrei.gacha.service;

import com.efrei.gacha.dto.StatsResponse;
import com.efrei.gacha.model.Player;

public interface StatsService {

    void createStatsFor(Player player);

    void recordOpening(Long playerId, String boxType);

    StatsResponse getStats(Long playerId);
}
