package com.efrei.gacha.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BoxNotFoundException extends RuntimeException {
    public BoxNotFoundException(Long id) {
        super("Box not found: " + id);
    }
}
