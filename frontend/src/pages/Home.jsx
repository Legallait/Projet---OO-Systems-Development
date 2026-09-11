import GachaAnimalCard from "../components/GachaAnimalCard";

export default function Home() {
  return (
    <div style={{ background: "#100c08", minHeight: "100vh", padding: 40 }}>
      <GachaAnimalCard
        name="Tigre"
        latinName="Panthera tigris"
        rarity="EN"
      />
    </div>
  );
}