import { PawPrint } from "lucide-react";

const STATUS_COLORS = {
  Vulnérable: "#4F8FE8",
  "En danger": "#9B6BD9",
  "En danger critique": "#E08A3C",
  "Données insuffisantes": "#9C9A93",
};

const TIRAGES = [
  {
    id: 1,
    date: "12 Mars 2026 - 18:42",
    booster: "Booster Océan",
    species: "Tortue Luth",
    status: "Vulnérable",
  },
  {
    id: 2,
    date: "12 Mars 2026 - 18:40",
    booster: "Booster Forêt Tropicale",
    species: "Chimpanzé",
    status: "En danger",
  },
  {
    id: 3,
    date: "11 Mars 2026 - 15:23",
    booster: "Booster Savane",
    species: "Lion d'Afrique",
    status: "Vulnérable",
  },
  {
    id: 4,
    date: "10 Mars 2026 - 22:12",
    booster: "Booster Océan",
    species: "Orque",
    status: "Données insuffisantes",
  },
  {
    id: 5,
    date: "09 Mars 2026 - 10:05",
    booster: "Booster Forêt Tropicale",
    species: "Gorille de montagne",
    status: "En danger critique",
  },
  {
    id: 6,
    date: "08 Mars 2026 - 14:50",
    booster: "Booster Savane",
    species: "Girafe de Nubie",
    status: "Vulnérable",
  },
  {
    id: 7,
    date: "07 Mars 2026 - 19:15",
    booster: "Booster Savane",
    species: "Rhinocéros Noir",
    status: "En danger critique",
  },
];

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

export default function History() {
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
                <th style={styles.th}>Statut UICN</th>
              </tr>
            </thead>
            <tbody>
              {TIRAGES.map((tirage) => {
                const color = STATUS_COLORS[tirage.status] ?? "#9C9A93";
                return (
                  <tr key={tirage.id}>
                    <td style={{ ...styles.td, ...styles.dateCell }}>
                      {tirage.date}
                    </td>
                    <td style={{ ...styles.td, ...styles.boosterCell }}>
                      {tirage.booster}
                    </td>
                    <td style={styles.td}>
                      <span style={styles.speciesCell}>
                        <PawPrint
                          size={14}
                          style={styles.speciesIcon}
                          strokeWidth={1.5}
                        />
                        {tirage.species}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(color)}>
                        <span style={styles.statusDot(color)} />
                        {tirage.status}
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