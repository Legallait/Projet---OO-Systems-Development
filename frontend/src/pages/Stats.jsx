import TotalTiragesCard from "../components/TotalTiragesCard";
import StatusDonutCard from "../components/StatusDonutCard";
import RarestSpeciesCard from "../components/RarestSpeciesCard";
import TopBoostersCard from "../components/TopBoostersCard";

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    maxHeight: "100%",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontWeight: 400,
    fontSize: "28px",
    color: "#F2F1EC",
    margin: "0 0 8px",
  },
  subtitle: {
    color: "#9C9A93",
    fontSize: "14px",
    margin: "0 0 32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
};

export default function Stats() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Tableau de Bord &amp; Statistiques</h1>
      <p style={styles.subtitle}>
        Analysez vos performances de collection, vos tirages et visualisez la
        rareté de vos espèces.
      </p>

      <div style={styles.grid}>
        <TotalTiragesCard />
        <StatusDonutCard />
        <RarestSpeciesCard />
        <TopBoostersCard />
      </div>
    </div>
  );
}