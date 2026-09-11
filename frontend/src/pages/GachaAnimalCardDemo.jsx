import React from "react";
import GachaAnimalCard from "./GachaAnimalCard";

export default function GachaAnimalCardDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", background: "#100c08", padding: 20 }}>
      <GachaAnimalCard
        name="Panda géant"
        latinName="Ailuropoda melanoleuca"
        rarity="VU"
        description="Le panda géant vit dans les forêts de bambous des montagnes du centre de la Chine. Son régime quasi exclusif de bambou l'oblige à manger plusieurs heures par jour."
        quote="« Symbole mondial de la conservation, il doit sa survie à des décennies de protection. »"
        imageUrl="https://placehold.co/400x312/2f4f3f/ffffff?text=Panda"
        cardCode="ANM-002"
        photoCredit="Photo : Jane Doe (CC BY)"
      />
      <GachaAnimalCard
        name="Rhinocéros de Java"
        latinName="Rhinoceros sondaicus"
        rarity="CR"
        description="L'un des mammifères les plus rares au monde, avec moins de 80 individus survivant dans un seul parc national d'Indonésie."
        quote="« Chaque naissance est un événement suivi par les scientifiques du monde entier. »"
        cardCode="ANM-003"
      />
      <GachaAnimalCard
        name="Dodo"
        latinName="Raphus cucullatus"
        rarity="EX"
        description="Oiseau incapable de voler autrefois endémique de l'île Maurice, disparu à la fin du XVIIe siècle sous la pression de la chasse et des espèces introduites."
        quote="« Devenu le symbole universel de l'extinction causée par l'humain. »"
        cardCode="ANM-004"
      />
    </div>
  );
}
