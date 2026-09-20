import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gem } from "lucide-react";

const HOVER_CSS = `
.booster-card { transition: transform 220ms ease, box-shadow 220ms ease; }
.booster-card:hover { transform: translateY(-4px); }
.booster-card-image { transition: transform 500ms ease; }
.booster-card:hover .booster-card-image { transform: scale(1.06); }
`;

const styles = {
    card: {
        backgroundColor: "#14151B",
        border: "1px solid #C9A24B",
        borderRadius: "14px",
        padding: "12px",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    imageWrapper: {
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "20px",
        isolation: "isolate",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        filter: "saturate(1.08) contrast(1.04)",
    },
    imageShade: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(180deg, rgba(11,12,16,0) 55%, rgba(11,12,16,0.55) 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
        pointerEvents: "none",
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
        <div
            className="booster-card"
            style={{
                ...styles.card,
                boxShadow: `0 0 22px ${booster.accent ?? "#C9A24B"}26`,
            }}
        >
            <style>{HOVER_CSS}</style>
            <div style={{ ...styles.imageWrapper, background: booster.fallbackGradient }}>
                {!imageFailed && booster.image && (
                    <img
                        className="booster-card-image"
                        src={booster.image}
                        alt={booster.name}
                        style={{ ...styles.image, objectPosition: booster.focus }}
                        onError={() => setImageFailed(true)}
                    />
                )}
                <div style={styles.imageShade} />
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