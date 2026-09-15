package com.efrei.gacha.repository;

import com.efrei.gacha.model.BoxItem;
import com.efrei.gacha.model.BoxItemId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoxItemRepository extends JpaRepository<BoxItem, BoxItemId> {

    List<BoxItem> findById_BoxId(Long boxId);

    List<BoxItem> findById_ItemId(Long itemId);
}