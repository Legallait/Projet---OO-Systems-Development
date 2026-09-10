package com.efrei.gacha.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmptyBoxException extends RuntimeException {
    public EmptyBoxException(Long boxId) {
        super("Box " + boxId + " has no items configured");
    }
}
