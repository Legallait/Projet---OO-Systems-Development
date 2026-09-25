package com.efrei.gacha.controller;

import com.efrei.gacha.exception.BoxNotFoundException;
import com.efrei.gacha.model.Box;
import com.efrei.gacha.service.BoxService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boxes")
public class BoxController {

    private final BoxService boxService;

    @Autowired
    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    @ExceptionHandler(BoxNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleBoxNotFound(BoxNotFoundException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return response;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Box> listBoxes() {
        return boxService.getAllBoxes();
    }

    @GetMapping("/{boxId}")
    @ResponseStatus(HttpStatus.OK)
    public Box getBox(@PathVariable Long boxId) {
        return boxService.getBox(boxId);
    }
}
