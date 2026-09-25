package com.efrei.gacha.controller;

import com.efrei.gacha.dto.CreatePlayerRequest;
import com.efrei.gacha.dto.LoginRequest;
import com.efrei.gacha.exception.InvalidCredentialsException;
import com.efrei.gacha.exception.UsernameAlreadyExistsException;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.service.PlayerService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final PlayerService playerService;

    @Autowired
    public AuthController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleUsernameAlreadyExists(UsernameAlreadyExistsException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return response;
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleInvalidCredentials(InvalidCredentialsException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return response;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Player register(@RequestBody CreatePlayerRequest request) {
        return playerService.createPlayer(request.username(), request.password());
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public Player login(@RequestBody LoginRequest request) {
        return playerService.login(request.username(), request.password());
    }
}
