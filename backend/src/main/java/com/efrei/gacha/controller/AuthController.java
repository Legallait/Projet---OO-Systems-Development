package com.efrei.gacha.controller;

import com.efrei.gacha.dto.CreatePlayerRequest;
import com.efrei.gacha.dto.LoginRequest;
import com.efrei.gacha.dto.PlayerResponse;
import com.efrei.gacha.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final PlayerService playerService;

    @Autowired
    public AuthController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public PlayerResponse register(@RequestBody CreatePlayerRequest request) {
        return playerService.createPlayer(request.username(), request.password());
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public PlayerResponse login(@RequestBody LoginRequest request) {
        return playerService.login(request.username(), request.password());
    }
}
