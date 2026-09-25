package com.efrei.gacha.service;

import com.efrei.gacha.model.Box;
import java.util.List;

public interface BoxService {

    List<Box> getAllBoxes();

    Box getBox(Long id);
}
