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
  content: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  donutWrapper: {
    position: "relative",
    width: "140px",
    height: "140px",
    flexShrink: 0,
  },
  donutHole: {
    position: "absolute",
    top: "18px",
    left: "18px",
    width: "104px",
    height: "104px",
    borderRadius: "9999px",
    backgroundColor: "#14151B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  donutCaption: {
    color: "#9C9A93",
    fontSize: "10px",
    letterSpacing: "0.06em",
  },
  donutTotal: {
    color: "#F2F1EC",
    fontSize: "24px",
    fontWeight: 700,
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
  },
  legendRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  legendLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#D8D6CF",
  },
  legendDot: (color) => ({
    width: "9px",
    height: "9px",
    borderRadius: "9999px",
    backgroundColor: color,
    flexShrink: 0,
  }),
  legendValue: {
    color: "#F2F1EC",
    fontWeight: 600,
  },
};

export default function StatusDonutCard({
  data = [
    { label: "En danger (EN)", value: 14, color: "#9B6BD9" },
    { label: "Vulnérable (VU)", value: 24, color: "#4F8FE8" },
    { label: "Critique (CR)", value: 8, color: "#E08A3C" },
    { label: "Éteinte (EX)", value: 12, color: "#D94F4F" },
  ],
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const gradientStops = data
    .map((d) => {
      const start = (cumulative / total) * 100;
      cumulative += d.value;
      const end = (cumulative / total) * 100;
      return `${d.color} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div style={styles.card}>
      <span style={styles.label}>RÉPARTITION PAR STATUT UICN</span>
      <div style={styles.content}>
        <div style={styles.donutWrapper}>
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              background: `conic-gradient(${gradientStops})`,
            }}
          />
          <div style={styles.donutHole}>
            <span style={styles.donutCaption}>ESPÈCES</span>
            <span style={styles.donutTotal}>{total}</span>
          </div>
        </div>

        <div style={styles.legend}>
          {data.map((d) => (
            <div key={d.label} style={styles.legendRow}>
              <span style={styles.legendLeft}>
                <span style={styles.legendDot(d.color)} />
                {d.label}
              </span>
              <span style={styles.legendValue}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}