package com.efrei.gacha.service;

import com.efrei.gacha.dto.BoxResponse;
import java.util.List;

public interface BoxService {

    List<BoxResponse> getAllBoxes();

    BoxResponse getBox(Long id);
}
