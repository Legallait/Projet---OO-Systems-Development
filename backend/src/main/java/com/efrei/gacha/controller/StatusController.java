package com.efrei.gacha.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.availability.ApplicationAvailability;
import org.springframework.boot.availability.ReadinessState;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
public class StatusController {

    private final ApplicationAvailability availability;

    @Autowired
    public StatusController(ApplicationAvailability availability) {
        this.availability = availability;
    }

    // Spring only switches to ACCEPTING_TRAFFIC once every CommandLineRunner (DataSeeder) has finished.
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Boolean> getStatus() {
        return Map.of("ready", availability.getReadinessState() == ReadinessState.ACCEPTING_TRAFFIC);
    }
}
