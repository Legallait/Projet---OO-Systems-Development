import { TrendingUp } from "lucide-react";

const styles = {
  card: {
    backgroundColor: "#14151B",
    border: "1px solid #C9A24B",
    borderRadius: "12px",
    padding: "24px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
  },
  label: {
    alignSelf: "flex-start",
    color: "#E8C77A",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    marginBottom: "24px",
  },
  value: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontSize: "56px",
    color: "#E8C77A",
    margin: "0 0 8px",
    lineHeight: 1,
  },
  caption: {
    color: "#9C9A93",
    fontSize: "13px",
    letterSpacing: "0.03em",
    marginBottom: "16px",
  },
  trend: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#5FA05F",
    fontSize: "13px",
    fontWeight: 500,
  },
};

export default function TotalTiragesCard({
  total = 0,
  caption = "Boosters invoqués à ce jour",
  weeklyDelta,
}) {
  return (
    <div style={styles.card}>
      <span style={styles.label}>TOTAL DES TIRAGES</span>
      <p style={styles.value}>{total}</p>
      <p style={styles.caption}>{caption}</p>
      {typeof weeklyDelta === "number" && (
        <span style={styles.trend}>
          <TrendingUp size={14} strokeWidth={2} />
          +{weeklyDelta} tirages cette semaine
        </span>
      )}
    </div>
  );
}