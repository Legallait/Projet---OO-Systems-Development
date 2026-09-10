package com.efrei.gacha.service.impl;

import com.efrei.gacha.exception.BoxNotFoundException;
import com.efrei.gacha.model.Box;
import com.efrei.gacha.repository.BoxRepository;
import com.efrei.gacha.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;

    @Autowired
    public BoxServiceImpl(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    @Override
    public List<Box> getAllBoxes() {
        return boxRepository.findAll();
    }

    @Override
    public Box getBox(Long id) {
        return boxRepository.findById(id)
                .orElseThrow(() -> new BoxNotFoundException(id));
    }
}
