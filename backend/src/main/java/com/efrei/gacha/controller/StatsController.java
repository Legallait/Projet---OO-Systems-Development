package com.efrei.gacha.controller;

import com.efrei.gacha.dto.StatsResponse;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.service.StatsService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/players/{playerId}/stats")
public class StatsController {

    private final StatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @ExceptionHandler(PlayerNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNotFound(PlayerNotFoundException e) {
        return errorBody(e);
    }

    @GetMapping
    public StatsResponse getStats(@PathVariable Long playerId) {
        return statsService.getStats(playerId);
    }

    private Map<String, String> errorBody(RuntimeException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return response;
    }
}
