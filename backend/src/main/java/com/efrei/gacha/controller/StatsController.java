package com.efrei.gacha.controller;

import com.efrei.gacha.dto.StatsResponse;
import com.efrei.gacha.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/players/{playerId}/stats")
public class StatsController {

    private final StatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public StatsResponse getStats(@PathVariable Long playerId) {
        return statsService.getStats(playerId);
    }
}
