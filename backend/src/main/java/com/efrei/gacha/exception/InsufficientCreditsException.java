package com.efrei.gacha.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InsufficientCreditsException extends RuntimeException {
    public InsufficientCreditsException(Long playerId) {
        super("Player " + playerId + " does not have enough credits");
    }
}
