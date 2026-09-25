package com.efrei.gacha.exception;

public class BoxNotFoundException extends RuntimeException {
    public BoxNotFoundException(Long id) {
        super("Box not found: " + id);
    }
}
