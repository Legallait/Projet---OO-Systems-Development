package com.efrei.gacha.repository;

import com.efrei.gacha.model.Item;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByRarityId(Long rarityId);
}
