package com.efrei.gacha.repository;

import com.efrei.gacha.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByRarityId(Long rarityId);
}