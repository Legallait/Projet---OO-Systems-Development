package com.efrei.gacha.service;

import com.efrei.gacha.dto.StatsResponse;

public interface StatsService {

    void recordOpening(Long playerId, String boxType);

    StatsResponse getStats(Long playerId);
}
