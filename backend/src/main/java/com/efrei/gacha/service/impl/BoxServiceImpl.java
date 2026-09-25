package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.BoxResponse;
import com.efrei.gacha.exception.BoxNotFoundException;
import com.efrei.gacha.repository.BoxRepository;
import com.efrei.gacha.service.BoxService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;

    @Autowired
    public BoxServiceImpl(BoxRepository boxRepository) {
        this.boxRepository = boxRepository;
    }

    @Override
    public List<BoxResponse> getAllBoxes() {
        return boxRepository.findAll().stream().map(BoxResponse::from).toList();
    }

    @Override
    public BoxResponse getBox(Long id) {
        return boxRepository.findById(id).map(BoxResponse::from).orElseThrow(() -> new BoxNotFoundException(id));
    }
}
