package com.efrei.gacha.service.impl;

import com.efrei.gacha.dto.StatsResponse;
import com.efrei.gacha.exception.PlayerNotFoundException;
import com.efrei.gacha.model.Player;
import com.efrei.gacha.model.Stats;
import com.efrei.gacha.repository.PlayerRepository;
import com.efrei.gacha.repository.StatsRepository;
import com.efrei.gacha.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;

@Service
public class StatsServiceImpl implements StatsService {

    private final StatsRepository statsRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public StatsServiceImpl(StatsRepository statsRepository, PlayerRepository playerRepository) {
        this.statsRepository = statsRepository;
        this.playerRepository = playerRepository;
    }

    @Override
    @Transactional
    public void createStatsFor(Player player) {
        Stats stats = Stats.builder()
                .player(player)
                .build();
        statsRepository.save(stats);
    }

    @Override
    @Transactional
    public void recordOpening(Long playerId, String boxType) {
        Stats stats = statsRepository.findByPlayerId(playerId)
                .orElseGet(() -> {
                    Player player = playerRepository.findById(playerId)
                            .orElseThrow(() -> new PlayerNotFoundException(playerId));
                    return statsRepository.save(Stats.builder().player(player).build());
                });

        stats.setBoxOpened(stats.getBoxOpened() + 1);
        stats.getBoxOpenedByType().merge(boxType, 1, Integer::sum);

        statsRepository.save(stats);
    }

    @Override
    @Transactional(readOnly = true)
    public StatsResponse getStats(Long playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new PlayerNotFoundException(playerId);
        }

        return statsRepository.findByPlayerId(playerId)
                .map(stats -> new StatsResponse(playerId, stats.getBoxOpened(), stats.getBoxOpenedByType()))
                .orElseGet(() -> new StatsResponse(playerId, 0, new HashMap<>()));
    }
}