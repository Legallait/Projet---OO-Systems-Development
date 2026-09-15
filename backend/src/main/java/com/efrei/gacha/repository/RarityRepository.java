package com.efrei.gacha.repository;

import com.efrei.gacha.model.Rarity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RarityRepository extends JpaRepository<Rarity, Long> {
}