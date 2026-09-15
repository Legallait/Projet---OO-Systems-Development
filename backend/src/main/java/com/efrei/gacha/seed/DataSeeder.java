package com.efrei.gacha.seed;

import com.efrei.gacha.integration.INaturalistClient;
import com.efrei.gacha.integration.dto.INaturalistTaxon;
import com.efrei.gacha.model.Box;
import com.efrei.gacha.model.BoxItem;
import com.efrei.gacha.model.BoxItemId;
import com.efrei.gacha.model.Item;
import com.efrei.gacha.model.Rarity;
import com.efrei.gacha.repository.BoxItemRepository;
import com.efrei.gacha.repository.BoxRepository;
import com.efrei.gacha.repository.ItemRepository;
import com.efrei.gacha.repository.RarityRepository;
import com.efrei.gacha.storage.SpeciesImageStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);
    private static final int SPECIES_PER_TIER = 15;
    private static final int FETCH_LIMIT_MULTIPLIER = 3;

    private record RarityTier(String name, String colorHex, double dropRate, int sellPrice, List<String> iucnCodes) {}

    private record Biome(String boxName, String placeName, String description, int boxPrice) {}

    private static final List<RarityTier> RARITY_TIERS = List.of(
            new RarityTier("Commun", "#B0B0B0", 60.0, 10, List.of("LC", "NT")),
            new RarityTier("Rare", "#3B82F6", 28.0, 50, List.of("VU")),
            new RarityTier("Épique", "#A855F7", 10.0, 200, List.of("EN")),
            new RarityTier("Légendaire", "#F59E0B", 2.0, 1000, List.of("CR", "EW"))
    );

    private static final List<Biome> BIOMES = List.of(
            new Biome("Coffre Savane", "Kenya", "Espèces de la savane africaine.", 100),
            new Biome("Coffre Froid", "Antarctica", "Espèces des régions polaires et arctiques.", 150),
            new Biome("Coffre Océan", "Hawaii", "Espèces marines et récifales.", 150),
            new Biome("Coffre Forêt Tropicale", "Brazil", "Espèces de la forêt amazonienne.", 150)
    );

    private final INaturalistClient iNaturalistClient;
    private final SpeciesImageStorageService imageStorageService;
    private final RarityRepository rarityRepository;
    private final ItemRepository itemRepository;
    private final BoxRepository boxRepository;
    private final BoxItemRepository boxItemRepository;

    @Autowired
    public DataSeeder(INaturalistClient iNaturalistClient,
                       SpeciesImageStorageService imageStorageService,
                       RarityRepository rarityRepository,
                       ItemRepository itemRepository,
                       BoxRepository boxRepository,
                       BoxItemRepository boxItemRepository) {
        this.iNaturalistClient = iNaturalistClient;
        this.imageStorageService = imageStorageService;
        this.rarityRepository = rarityRepository;
        this.itemRepository = itemRepository;
        this.boxRepository = boxRepository;
        this.boxItemRepository = boxItemRepository;
    }

    @Override
    public void run(String... args) {
        if (rarityRepository.count() > 0) {
            return;
        }

        Map<String, Rarity> rarities = RARITY_TIERS.stream()
                .collect(Collectors.toMap(RarityTier::name, tier -> rarityRepository.save(Rarity.builder()
                        .name(tier.name())
                        .dropRate(tier.dropRate())
                        .colorHex(tier.colorHex())
                        .build())));

        for (Biome biome : BIOMES) {
            seedBiome(biome, rarities);
        }
    }

    private void seedBiome(Biome biome, Map<String, Rarity> rarities) {
        Long placeId = iNaturalistClient.resolvePlaceId(biome.placeName());
        if (placeId == null) {
            log.warn("Lieu introuvable pour {}, coffre ignore", biome.boxName());
            return;
        }

        Box box = boxRepository.save(Box.builder()
                .name(biome.boxName())
                .price(biome.boxPrice())
                .description(biome.description())
                .build());

        for (RarityTier tier : RARITY_TIERS) {
            List<Item> items = seedTierForBiome(tier, rarities.get(tier.name()), placeId, biome.boxName());
            items.forEach(item -> boxItemRepository.save(BoxItem.builder()
                    .id(new BoxItemId(box.getId(), item.getId()))
                    .box(box)
                    .item(item)
                    .build()));
        }
    }

    private List<Item> seedTierForBiome(RarityTier tier, Rarity rarity, Long placeId, String boxName) {
        List<INaturalistTaxon> candidates = tier.iucnCodes().stream()
                .flatMap(code -> iNaturalistClient.getSpeciesByConservationStatus(code, SPECIES_PER_TIER * FETCH_LIMIT_MULTIPLIER, placeId).stream())
                .collect(Collectors.toMap(INaturalistTaxon::id, taxon -> taxon, (a, b) -> a, LinkedHashMap::new))
                .values().stream()
                .toList();

        Map<Long, String> descriptions = iNaturalistClient.getDescriptions(
                candidates.stream().map(INaturalistTaxon::id).toList());

        List<INaturalistTaxon> species = candidates.stream()
                .filter(taxon -> descriptions.get(taxon.id()) != null)
                .limit(SPECIES_PER_TIER)
                .toList();

        List<Item> items = species.stream()
                .map(taxon -> itemRepository.save(Item.builder()
                        .name(resolveName(taxon))
                        .description(descriptions.get(taxon.id()))
                        .imageUrl(imageStorageService.downloadAndStore(taxon.id(), taxon.defaultPhoto().mediumUrl()))
                        .sellPrice(tier.sellPrice())
                        .rarity(rarity)
                        .build()))
                .toList();

        log.info("{} : {} especes {} chargees", boxName, items.size(), tier.name());
        return items;
    }

    private String resolveName(INaturalistTaxon taxon) {
        return taxon.preferredCommonName() != null ? taxon.preferredCommonName() : taxon.name();
    }
}