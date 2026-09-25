package com.efrei.gacha.controller;

import com.efrei.gacha.dto.PullResultResponse;
import com.efrei.gacha.exception.BoxNotFoundException;
import com.efrei.gacha.exception.EmptyBoxException;
import com.efrei.gacha.exception.InsufficientCreditsException;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.service.BoxOpeningService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/players/{playerId}/boxes/{boxId}/openings")
public class BoxOpeningController {

    private final BoxOpeningService boxOpeningService;

    @Autowired
    public BoxOpeningController(BoxOpeningService boxOpeningService) {
        this.boxOpeningService = boxOpeningService;
    }

    @ExceptionHandler({PlayerNotFoundException.class, BoxNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNotFound(RuntimeException e) {
        return errorBody(e);
    }

    @ExceptionHandler(InsufficientCreditsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleInsufficientCredits(InsufficientCreditsException e) {
        return errorBody(e);
    }

    @ExceptionHandler(EmptyBoxException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleEmptyBox(EmptyBoxException e) {
        return errorBody(e);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<PullResultResponse> openBox(@PathVariable Long playerId, @PathVariable Long boxId) {
        return boxOpeningService.openBox(playerId, boxId);
    }

    private Map<String, String> errorBody(RuntimeException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return response;
    }
}
