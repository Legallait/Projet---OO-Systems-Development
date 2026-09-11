const styles = {
  card: {
    backgroundColor: "#14151B",
    border: "1px solid #C9A24B",
    borderRadius: "12px",
    padding: "10px",
    width: "180px",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "130px",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  quantityBadge: {
    position: "absolute",
    top: "6px",
    right: "6px",
    backgroundColor: "#E8C77A",
    color: "#2A1F06",
    fontSize: "11px",
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: "9999px",
  },
  name: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontSize: "15px",
    color: "#F2F1EC",
    margin: "0 0 6px",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  statusDot: (color) => ({
    width: "8px",
    height: "8px",
    borderRadius: "9999px",
    backgroundColor: color,
    flexShrink: 0,
  }),
  statusLabel: {
    fontSize: "12px",
    color: "#9C9A93",
  },
};

export default function AnimalCard({ animal }) {
  return (
    <div style={styles.card}>
      <div style={styles.imageWrapper}>
        <img
          src={animal.image}
          alt={animal.name}
          style={{ ...styles.image, background: animal.fallbackGradient }}
        />
        {animal.quantity > 1 && (
          <span style={styles.quantityBadge}>x{animal.quantity}</span>
        )}
      </div>
      <h3 style={styles.name}>{animal.name}</h3>
      <div style={styles.statusRow}>
        <span style={styles.statusDot(animal.statusColor)} />
        <span style={styles.statusLabel}>{animal.statusLabel}</span>
      </div>
    </div>
  );
}