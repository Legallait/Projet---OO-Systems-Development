package com.efrei.gacha.repository;

import com.efrei.gacha.model.BoxItem;
import com.efrei.gacha.model.BoxItemId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoxItemRepository extends JpaRepository<BoxItem, BoxItemId> {

    List<BoxItem> findById_BoxId(Long boxId);
}
