package com.efrei.gacha.controller;

import com.efrei.gacha.dto.BoxResponse;
import com.efrei.gacha.service.BoxService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/boxes")
public class BoxController {

    private final BoxService boxService;

    @Autowired
    public BoxController(BoxService boxService) {
        this.boxService = boxService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BoxResponse> listBoxes() {
        return boxService.getAllBoxes();
    }

    @GetMapping("/{boxId}")
    @ResponseStatus(HttpStatus.OK)
    public BoxResponse getBox(@PathVariable Long boxId) {
        return boxService.getBox(boxId);
    }
}
