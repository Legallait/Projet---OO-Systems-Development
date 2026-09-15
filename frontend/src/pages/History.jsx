import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";
import historyService from "../services/historyService.js";

const RARITIES = [
  { id: 1, colorHex: "#B0B0B0", dropRate: 60.0, name: "Commun" },
  { id: 2, colorHex: "#3B82F6", dropRate: 28.0, name: "Rare" },
  { id: 3, colorHex: "#A855F7", dropRate: 10.0, name: "Épique" },
  { id: 4, colorHex: "#F59E0B", dropRate: 2.0, name: "Légendaire" },
];

function getRarityColor(rarityName) {
  const match = RARITIES.find((r) => r.name === rarityName);
  return match ? match.colorHex : "#9C9A93";
}

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
    margin: "0 0 24px",
  },
  tableWrapper: {
    border: "1px solid #C9A24B",
    borderRadius: "10px",
    overflow: "hidden",
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  theadRow: {
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  th: {
    backgroundColor: "#1A1710",
    color: "#E8C77A",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    padding: "14px 20px",
  },
  td: {
    padding: "16px 20px",
    fontSize: "13px",
    color: "#F2F1EC",
    borderTop: "1px solid #24262E",
  },
  dateCell: {
    color: "#9C9A93",
  },
  boosterCell: {
    color: "#E8C77A",
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontSize: "14px",
  },
  speciesCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 600,
  },
  speciesIcon: {
    color: "#9C9A93",
  },
  statusBadge: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "9999px",
    border: `1px solid ${color}`,
    color: color,
    fontSize: "12px",
    fontWeight: 500,
  }),
  statusDot: (color) => ({
    width: "6px",
    height: "6px",
    borderRadius: "9999px",
    backgroundColor: color,
  }),
};

function formatDate(isoString) {
  const d = new Date(isoString);
  const datePart = d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} - ${timePart}`;
}

export default function History() {
  const [tirages, setTirages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await historyService.getHistory(1);
        setTirages(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadHistory();
  }, []);

  if (isLoading) return <div style={styles.page}>Chargement…</div>;
  if (error) return <div style={styles.page}>Erreur de chargement de l'historique.</div>;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Historique des Tirages</h1>
      <p style={styles.subtitle}>
        Retrouvez la chronologie complète de vos ouvertures de boosters et de
        vos acquisitions.
      </p>

      <div style={styles.tableWrapper}>
        <div style={styles.scrollArea} className="gold-scrollbar">
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Date &amp; heure</th>
                <th style={styles.th}>Booster</th>
                <th style={styles.th}>Espèce obtenue</th>
                <th style={styles.th}>Rareté</th>
              </tr>
            </thead>
            <tbody>
              {tirages.map((tirage) => {
                const color = getRarityColor(tirage.rarityName);
                return (
                  <tr key={tirage.itemId}>
                    <td style={{ ...styles.td, ...styles.dateCell }}>
                      {formatDate(tirage.pulledAt)}
                    </td>
                    <td style={{ ...styles.td, ...styles.boosterCell }}>
                      {tirage.boxName}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.speciesCell}>
                        <PawPrint
                          size={14}
                          style={styles.speciesIcon}
                          strokeWidth={1.5}
                        />
                        {tirage.itemName}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(color)}>
                        <span style={styles.statusDot(color)} />
                        {tirage.rarityName}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}