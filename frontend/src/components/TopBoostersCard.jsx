const styles = {
  card: {
    backgroundColor: "#14151B",
    border: "1px solid #C9A24B",
    borderRadius: "12px",
    padding: "24px 28px",
    height: "100%",
  },
  label: {
    color: "#E8C77A",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    marginBottom: "24px",
    display: "block",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  rowTop: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  boosterName: {
    color: "#F2F1EC",
    fontWeight: 500,
  },
  boosterCount: {
    color: "#9C9A93",
  },
  track: {
    width: "100%",
    height: "6px",
    borderRadius: "9999px",
    backgroundColor: "#24262E",
    overflow: "hidden",
  },
  bar: (percent, color) => ({
    width: `${percent}%`,
    height: "100%",
    backgroundColor: color,
    borderRadius: "9999px",
  }),
};

export default function TopBoostersCard({
  boosters = [
    { name: "Savane", count: 42, color: "#D97A3D" },
    { name: "Océan", count: 28, color: "#4F8FE8" },
    { name: "Forêt", count: 18, color: "#5FA05F" },
  ],
}) {
  const maxCount = Math.max(...boosters.map((b) => b.count));

  return (
    <div style={styles.card}>
      <span style={styles.label}>BOOSTERS LES PLUS OUVERTS</span>
      <div style={styles.list}>
        {boosters.map((booster) => (
          <div key={booster.name} style={styles.row}>
            <div style={styles.rowTop}>
              <span style={styles.boosterName}>{booster.name}</span>
              <span style={styles.boosterCount}>
                {booster.count} ouvertures
              </span>
            </div>
            <div style={styles.track}>
              <div
                style={styles.bar(
                  (booster.count / maxCount) * 100,
                  booster.color
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}