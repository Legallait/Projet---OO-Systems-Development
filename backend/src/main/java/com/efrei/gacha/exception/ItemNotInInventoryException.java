package com.efrei.gacha.exception;

public class ItemNotInInventoryException extends RuntimeException {

    public ItemNotInInventoryException(Long playerId, Long itemId) {
        super("Item " + itemId + " non trouve dans l'inventaire du joueur " + playerId);
    }
}
