package com.efrei.gacha.service;

import com.efrei.gacha.dto.PullResultResponse;

import java.util.List;

public interface BoxOpeningService {

    List<PullResultResponse> openBox(Long playerId, Long boxId);
}