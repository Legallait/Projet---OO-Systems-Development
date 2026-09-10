package com.efrei.gacha.config;

import com.efrei.gacha.model.Box;
import com.efrei.gacha.model.BoxItem;
import com.efrei.gacha.model.BoxItemId;
import com.efrei.gacha.model.Item;
import com.efrei.gacha.model.Rarity;
import com.efrei.gacha.repository.BoxItemRepository;
import com.efrei.gacha.repository.BoxRepository;
import com.efrei.gacha.repository.ItemRepository;
import com.efrei.gacha.repository.RarityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RarityRepository rarityRepository;
    private final ItemRepository itemRepository;
    private final BoxRepository boxRepository;
    private final BoxItemRepository boxItemRepository;

    @Autowired
    public DataSeeder(RarityRepository rarityRepository,
                       ItemRepository itemRepository,
                       BoxRepository boxRepository,
                       BoxItemRepository boxItemRepository) {
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

        Rarity common = rarityRepository.save(Rarity.builder()
                .name("Commun").dropRate(60.0).colorHex("#B0B0B0").build());
        Rarity rare = rarityRepository.save(Rarity.builder()
                .name("Rare").dropRate(28.0).colorHex("#3B82F6").build());
        Rarity epic = rarityRepository.save(Rarity.builder()
                .name("Épique").dropRate(10.0).colorHex("#A855F7").build());
        Rarity legendary = rarityRepository.save(Rarity.builder()
                .name("Légendaire").dropRate(2.0).colorHex("#F59E0B").build());

        Item sword = itemRepository.save(Item.builder()
                .name("Épée rouillée").imageUrl("/items/sword-common.png").rarity(common).build());
        Item shield = itemRepository.save(Item.builder()
                .name("Bouclier de bois").imageUrl("/items/shield-common.png").rarity(common).build());
        Item bow = itemRepository.save(Item.builder()
                .name("Arc elfique").imageUrl("/items/bow-rare.png").rarity(rare).build());
        Item staff = itemRepository.save(Item.builder()
                .name("Bâton de givre").imageUrl("/items/staff-rare.png").rarity(rare).build());
        Item dragonBlade = itemRepository.save(Item.builder()
                .name("Lame du dragon").imageUrl("/items/blade-epic.png").rarity(epic).build());
        Item phoenixCrown = itemRepository.save(Item.builder()
                .name("Couronne du phénix").imageUrl("/items/crown-legendary.png").rarity(legendary).build());

        Box starterBox = boxRepository.save(Box.builder()
                .name("Coffre du débutant")
                .price(100)
                .description("Un coffre d'entrée de gamme, un peu de tout.")
                .build());

        Box legendaryBox = boxRepository.save(Box.builder()
                .name("Coffre légendaire")
                .price(500)
                .description("Chances augmentées sur les objets rares et plus.")
                .build());

        for (Item item : List.of(sword, shield, bow, staff, dragonBlade)) {
            boxItemRepository.save(BoxItem.builder()
                    .id(new BoxItemId(starterBox.getId(), item.getId()))
                    .box(starterBox)
                    .item(item)
                    .build());
        }

        for (Item item : List.of(bow, staff, dragonBlade, phoenixCrown)) {
            boxItemRepository.save(BoxItem.builder()
                    .id(new BoxItemId(legendaryBox.getId(), item.getId()))
                    .box(legendaryBox)
                    .item(item)
                    .build());
        }
    }
}
