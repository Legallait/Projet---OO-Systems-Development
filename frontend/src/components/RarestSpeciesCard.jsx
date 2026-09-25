import { resolveAssetUrl } from "../services/apiClient";

const styles = {
  card: {
    backgroundColor: "#14151B",
    border: "1px solid #C9A24B",
    borderRadius: "12px",
    padding: "24px 28px",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "16px",
  },
  label: {
    color: "#E8C77A",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
  },
  count: {
    color: "#9C9A93",
    fontSize: "12px",
    whiteSpace: "nowrap",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: "0 6px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    minHeight: 0,
    maxHeight: "320px",
    overflowY: "auto",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  thumb: (color) => ({
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    border: `1px solid ${color}`,
    overflow: "hidden",
    flexShrink: 0,
    background: `linear-gradient(135deg, ${color}22, ${color})`,
  }),
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
    flex: 1,
  },
  name: {
    fontFamily: "'Georgia', 'Cormorant Garamond', serif",
    fontSize: "16px",
    color: "#F2F1EC",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  badge: (color) => ({
    alignSelf: "flex-start",
    border: `1px solid ${color}`,
    color,
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    padding: "2px 8px",
    borderRadius: "9999px",
  }),
  quantity: {
    color: "#E8C77A",
    fontSize: "13px",
    fontWeight: 600,
    flexShrink: 0,
  },
  empty: {
    color: "#9C9A93",
    fontSize: "13px",
    margin: 0,
  },
};

export default function RarestSpeciesCard({ cards = [] }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.label}>ESPÈCES ÉPIQUES &amp; LÉGENDAIRES</span>
        {cards.length > 0 && (
          <span style={styles.count}>
            {cards.length} {cards.length > 1 ? "espèces" : "espèce"}
          </span>
        )}
      </div>

      {cards.length === 0 ? (
        <p style={styles.empty}>
          Aucune carte épique ou légendaire pour le moment.
        </p>
      ) : (
        <ul style={styles.list} className="gold-scrollbar">
          {cards.map((card) => {
            const image = resolveAssetUrl(card.itemImageUrl);
            return (
              <li key={card.itemId} style={styles.row}>
                <div style={styles.thumb(card.rarityColorHex)}>
                  {image && <img src={image} alt={card.itemName} style={styles.image} />}
                </div>
                <div style={styles.info}>
                  <h3 style={styles.name} title={card.itemName}>{card.itemName}</h3>
                  <span style={styles.badge(card.rarityColorHex)}>
                    {card.rarityName?.toUpperCase()}
                  </span>
                </div>
                {card.quantity > 1 && <span style={styles.quantity}>x{card.quantity}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
