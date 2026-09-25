package com.efrei.gacha.dto;

import com.efrei.gacha.model.Box;

public record BoxResponse(Long id, String name, Integer price, String description) {

    public static BoxResponse from(Box box) {
        return new BoxResponse(box.getId(), box.getName(), box.getPrice(), box.getDescription());
    }
}
