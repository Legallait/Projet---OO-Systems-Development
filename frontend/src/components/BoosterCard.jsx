import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gem } from "lucide-react";

const styles = {
    card: {
        backgroundColor: "#14151B",
        border: "1px solid #C9A24B",
        borderRadius: "12px",
        padding: "12px",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    imageWrapper: {
        width: "100%",
        height: "180px",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "20px",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    boosterName: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontSize: "20px",
        color: "#E8C77A",
        margin: "0 0 12px",
        textAlign: "center",
    },
    priceRow: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "20px",
    },
    price: {
        color: "#F2F1EC",
        fontSize: "16px",
        fontWeight: 600,
    },
    priceIcon: {
        color: "#E8C77A",
    },
    button: {
        width: "100%",
        border: "none",
        borderRadius: "6px",
        padding: "12px 0",
        background: "linear-gradient(90deg, #C9A24B, #F2D98A)",
        color: "#2A1F06",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        cursor: "pointer",
    },
};

export default function BoosterCard({ booster }) {
    const [imageFailed, setImageFailed] = useState(false);
    const navigate = useNavigate();

    return (
        <div style={styles.card}>
            <div style={{ ...styles.imageWrapper, background: booster.fallbackGradient }}>
                {!imageFailed && booster.image && (
                    <img
                        src={booster.image}
                        alt={booster.name}
                        style={styles.image}
                        onError={() => setImageFailed(true)}
                    />
                )}
            </div>
            <h3 style={styles.boosterName}>{booster.name}</h3>
            <div style={styles.priceRow}>
                <span style={styles.price}>{booster.price}</span>
                <Gem size={14} style={styles.priceIcon} strokeWidth={1.5} />
            </div>
            <button
                style={styles.button}
                onClick={() => navigate(`/boosters/${booster.id}/open`, { state: { booster } })}
            >
                OUVRIR LE BOOSTER
            </button>
        </div>
    );
}