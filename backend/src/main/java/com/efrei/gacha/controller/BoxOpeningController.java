package com.efrei.gacha.controller;

import com.efrei.gacha.dto.PullResultResponse;
import com.efrei.gacha.service.BoxOpeningService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/players/{playerId}/boxes/{boxId}/openings")
public class BoxOpeningController {

    private final BoxOpeningService boxOpeningService;

    @Autowired
    public BoxOpeningController(BoxOpeningService boxOpeningService) {
        this.boxOpeningService = boxOpeningService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<PullResultResponse> openBox(@PathVariable Long playerId, @PathVariable Long boxId) {
        return boxOpeningService.openBox(playerId, boxId);
    }
}
