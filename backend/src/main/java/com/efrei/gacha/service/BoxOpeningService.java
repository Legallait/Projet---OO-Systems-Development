package com.efrei.gacha.service;

import com.efrei.gacha.dto.PullResultResponse;

public interface BoxOpeningService {

    PullResultResponse openBox(Long playerId, Long boxId);
}
