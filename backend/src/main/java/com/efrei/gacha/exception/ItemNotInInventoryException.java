package com.efrei.gacha.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ItemNotInInventoryException extends RuntimeException {

    public ItemNotInInventoryException(Long playerId, Long itemId) {
        super("Item " + itemId + " non trouve dans l'inventaire du joueur " + playerId);
    }
}