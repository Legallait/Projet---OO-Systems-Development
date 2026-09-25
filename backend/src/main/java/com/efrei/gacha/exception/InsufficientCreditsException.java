package com.efrei.gacha.exception;

public class InsufficientCreditsException extends RuntimeException {
    public InsufficientCreditsException(Long playerId) {
        super("Player " + playerId + " does not have enough credits");
    }
}
