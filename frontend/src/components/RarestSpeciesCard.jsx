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
    marginBottom: "20px",
    display: "block",
  },
  content: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },
  imageWrapper: {
    width: "90px",
    height: "90px",
    borderRadius: "10px",
    border: "1px solid #C9A24B",
    overflow: "hidden",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  badge: {
    alignSelf: "flex-start",
    border: "1px solid #E8C77A",
    color: "#E8C77A",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    padding: "3px 10px",
    borderRadius: "9999px",
    marginBottom: "4px",
  },
  name: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontSize: "18px",
    color: "#F2F1EC",
    margin: 0,
  },
  status: {
    fontSize: "13px",
    color: "#D8D6CF",
  },
  meta: {
    fontSize: "12px",
    color: "#9C9A93",
  },
};

export default function RarestSpeciesCard({ species }) {
  if (!species) {
    return (
      <div style={styles.card}>
        <span style={styles.label}>ESPÈCE LA PLUS RARE OBTENUE</span>
        <p style={{ color: "#9C9A93", fontSize: "13px" }}>
          Aucune carte obtenue pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <span style={styles.label}>ESPÈCE LA PLUS RARE OBTENUE</span>
      <div style={styles.content}>
        {species.image && (
          <div style={styles.imageWrapper}>
            <img
              src={species.image}
              alt={species.itemName}
              style={styles.image}
            />
          </div>
        )}
        <div style={styles.info}>
          <span
            style={{
              ...styles.badge,
              borderColor: species.rarityColorHex,
              color: species.rarityColorHex,
            }}
          >
            {species.rarityName?.toUpperCase()}
          </span>
          <h3 style={styles.name}>{species.itemName}</h3>
        </div>
      </div>
    </div>
  );
}