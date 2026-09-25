package com.efrei.gacha.exception;

public class EmptyBoxException extends RuntimeException {
    public EmptyBoxException(Long boxId) {
        super("Box " + boxId + " has no items configured");
    }
}
