import { useEffect, useState } from "react";
import { getCurrentPlayer, subscribePlayer } from "../services/AuthService";
import StatsService from "../services/StatsService";
import TotalTiragesCard from "../components/TotalTiragesCard";
import StatusDonutCard from "../components/StatusDonutCard";
import RarestSpeciesCard from "../components/RarestSpeciesCard";
import TopBoostersCard from "../components/TopBoostersCard";

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    height: "100%",
    boxSizing: "border-box",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
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
    gridTemplateRows: "1fr 1fr",
    gap: "24px",
    flex: 1,
    minHeight: 0,
  },
  state: {
    color: "#9C9A93",
    fontSize: "14px",
  },
};

const RARITY_COLORS = {
  Commun: "#9C9A93",
  Rare: "#4F8FE8",
  Épique: "#A855F7",
  Légendaire: "#E8C77A",
};
const BOOSTER_COLORS = ["#D97A3D", "#4F8FE8", "#5FA05F", "#9B6BD9", "#E08A3C"];

function mapRarityColor(name, index) {
  return RARITY_COLORS[name] ?? BOOSTER_COLORS[index % BOOSTER_COLORS.length];
}

function mapBoosterColor(index) {
  return BOOSTER_COLORS[index % BOOSTER_COLORS.length];
}

export default function Stats() {
  // même pattern que Navbar.jsx
  const [player, setPlayer] = useState(getCurrentPlayer);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => subscribePlayer(() => setPlayer(getCurrentPlayer())), []);

  useEffect(() => {
    if (!player?.id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    StatsService.getStats(player.id)
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [player?.id]);

  const rarityData = stats
    ? Object.entries(stats.cardsByRarity).map(([label, value], i) => ({
        label,
        value,
        color: mapRarityColor(label, i),
      }))
    : [];

  const boosterData = stats
    ? Object.entries(stats.boxOpenedByType).map(([name, count], i) => ({
        name,
        count,
        color: mapBoosterColor(i),
      }))
    : [];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Tableau de Bord &amp; Statistiques</h1>
      <p style={styles.subtitle}>
        Analysez vos performances de collection, vos tirages et visualisez la
        rareté de vos espèces.
      </p>

      {!player?.id && (
        <p style={styles.state}>
          Connectez-vous pour voir vos statistiques.
        </p>
      )}
      {loading && player?.id && (
        <p style={styles.state}>Chargement des statistiques...</p>
      )}
      {error && (
        <p style={styles.state}>
          Impossible de charger les statistiques. Réessayez plus tard.
        </p>
      )}

      {stats && (
        <div style={styles.grid}>
          <TotalTiragesCard total={stats.boxOpened} />
          <StatusDonutCard
            title="RÉPARTITION PAR RARETÉ"
            emptyLabel="CARTES"
            data={rarityData}
          />
          <RarestSpeciesCard species={stats.rarestCard} />
          <TopBoostersCard boosters={boosterData} />
        </div>
      )}
    </div>
  );
}