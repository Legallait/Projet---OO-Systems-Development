import { useState } from "react";
import AnimalCard from "../components/AnimalCard";

const STATUSES = [
  { id: "lc", label: "Préoccupation mineure", color: "#9C9A93" },
  { id: "nt", label: "Quasi menacée", color: "#5FA05F" },
  { id: "vu", label: "Vulnérable", color: "#4F8FE8" },
  { id: "en", label: "En danger", color: "#9B6BD9" },
  { id: "cr", label: "En danger critique", color: "#E08A3C" },
  { id: "ew", label: "Éteinte sauvage", color: "#D94F4F" },
  { id: "ex", label: "Éteinte", color: "#7A2E2E" },
];

const ANIMALS = [
  {
    id: "panthere",
    name: "Panthère des neiges",
    statusId: "en",
    statusLabel: "En danger",
    statusColor: "#9B6BD9",
    quantity: 3,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #1B2B3A, #3E5C73, #A9C4D4)",
  },
  {
    id: "tigre",
    name: "Tigre du Bengale",
    statusId: "en",
    statusLabel: "En danger",
    statusColor: "#9B6BD9",
    quantity: 1,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #2B1B0E, #C9761F, #F2B24A)",
  },
  {
    id: "chimpanze",
    name: "Chimpanzé",
    statusId: "en",
    statusLabel: "En danger",
    statusColor: "#9B6BD9",
    quantity: 2,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #1E2A1A, #3E5A33, #6B8C57)",
  },
  {
    id: "panda",
    name: "Panda Géant",
    statusId: "en",
    statusLabel: "En danger",
    statusColor: "#9B6BD9",
    quantity: 1,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #14201A, #2C4A38, #4F7A5D)",
  },
  {
    id: "elephant",
    name: "Éléphant d'Asie",
    statusId: "en",
    statusLabel: "En danger",
    statusColor: "#9B6BD9",
    quantity: 2,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #16200F, #38401F, #5C6B32)",
  },
  {
    id: "rhinoceros",
    name: "Rhinocéros Noir",
    statusId: "cr",
    statusLabel: "En danger critique",
    statusColor: "#E08A3C",
    quantity: 1,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #3A1E0E, #C9761F, #F2B24A)",
  },
  {
    id: "girafe",
    name: "Girafe de Nubie",
    statusId: "vu",
    statusLabel: "Vulnérable",
    statusColor: "#4F8FE8",
    quantity: 4,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #123047, #2E6099, #7FB4E8)",
  },
  {
    id: "requin",
    name: "Grand Requin Blanc",
    statusId: "vu",
    statusLabel: "Vulnérable",
    statusColor: "#4F8FE8",
    quantity: 1,
    image: "",
    fallbackGradient: "linear-gradient(135deg, #0B2136, #1D5680, #4FA8D8)",
  },
];

const styles = {
  page: {
    backgroundColor: "#0B0C10",
    height: "100%",
    padding: "48px 32px",
    fontFamily: "'Inter', sans-serif",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
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
    margin: 0,
  },
  resetButton: (isVisible) => ({
    background: "transparent",
    border: "1px solid #C9A24B",
    color: "#E8C77A",
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
    whiteSpace: "nowrap",
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? "auto" : "none",
  }),
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "32px",
  },
  filterPill: (isActive, color) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "9999px",
    border: isActive ? `1px solid ${color}` : "1px solid #24262E",
    backgroundColor: isActive ? "#1A1522" : "#14151B",
    color: isActive ? color : "#9C9A93",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
  }),
  filterDot: (color) => ({
    width: "8px",
    height: "8px",
    borderRadius: "9999px",
    backgroundColor: color,
    flexShrink: 0,
  }),
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};

export default function Collection() {
  const [activeStatus, setActiveStatus] = useState(null);

  const filteredAnimals = activeStatus
    ? ANIMALS.filter((animal) => animal.statusId === activeStatus)
    : ANIMALS;

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.title}>Votre Ménagerie ({ANIMALS.length})</h1>
          <p style={styles.subtitle}>
            Consultez votre inventaire d'espèces collectées et triez par
            statut de préservation UICN.
          </p>
        </div>
        <button
          style={styles.resetButton(activeStatus !== null)}
          onClick={() => setActiveStatus(null)}
        >
          RÉINITIALISER LE FILTRE
        </button>
      </div>

      <div style={styles.filterRow}>
        {STATUSES.map((status) => (
          <button
            key={status.id}
            style={styles.filterPill(
              activeStatus === status.id,
              status.color
            )}
            onClick={() => setActiveStatus(status.id)}
          >
            <span style={styles.filterDot(status.color)} />
            {status.label}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}