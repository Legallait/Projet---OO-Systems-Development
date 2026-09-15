import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Gem, ArrowLeft } from "lucide-react";
import AnimalCard from "../components/AnimalCard";
import OpeningService from "../services/OpeningService";
import { resolveAssetUrl } from "../services/apiClient";

const FALLBACK_GRADIENT = "linear-gradient(135deg, #2A1F06, #C9A24B, #F2D98A)";

const KEYFRAMES = `
@keyframes packGlow {
  0%, 100% { box-shadow: 0 0 24px 4px rgba(201,162,75,0.25); }
  50% { box-shadow: 0 0 40px 12px rgba(201,162,75,0.5); }
}
@keyframes packShake {
  0% { transform: translateX(0) rotate(0deg) scale(1); }
  15% { transform: translateX(-10px) rotate(-4deg) scale(1.03); }
  30% { transform: translateX(10px) rotate(4deg) scale(1.03); }
  45% { transform: translateX(-8px) rotate(-3deg) scale(1.05); }
  60% { transform: translateX(8px) rotate(3deg) scale(1.05); }
  75% { transform: translateX(-4px) rotate(-1deg) scale(1.08); }
  90% { transform: translateX(4px) rotate(1deg) scale(1.1); }
  100% { transform: translateX(0) rotate(0deg) scale(0); }
}
@keyframes cardReveal {
  0% { transform: scale(0.4) rotateY(90deg); opacity: 0; }
  60% { transform: scale(1.05) rotateY(0deg); opacity: 1; }
  100% { transform: scale(1) rotateY(0deg); opacity: 1; }
}
@media (max-width: 900px) {
  .booster-title { font-size: 24px !important; margin-bottom: 20px !important; }
  .booster-pack { width: 200px !important; height: 260px !important; }
}
@media (max-width: 500px) {
  .booster-title { font-size: 20px !important; margin-bottom: 16px !important; }
  .booster-pack { width: 160px !important; height: 210px !important; padding: 14px !important; }
}
@media (max-width: 820px) {
  .booster-cards-grid {
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    width: auto !important;
    max-width: 100% !important;
    overflow-x: visible !important;
    overflow-y: visible !important;
    gap: 22px !important;
  }
}
`;

const styles = {
    page: {
        backgroundColor: "#0B0C10",
        minHeight: "100%",
        padding: "40px 16px 56px",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    backButton: {
        alignSelf: "flex-start",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "none",
        border: "none",
        color: "#9C9A93",
        fontSize: "13px",
        cursor: "pointer",
        marginBottom: "16px",
    },
    title: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: "34px",
        color: "#F2F1EC",
        margin: "0 0 36px",
        textAlign: "center",
    },
    error: {
        color: "#D9776B",
        fontSize: "14px",
        marginBottom: "16px",
    },
    stage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    stageReady: {
        minHeight: "360px",
    },
    pack: {
        width: "260px",
        height: "340px",
        borderRadius: "16px",
        border: "1px solid #C9A24B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "20px",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
    },
    packImage: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    packLabel: {
        position: "relative",
        color: "#F2F1EC",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
    },
    cardsGrid: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        gap: "12px",
        width: "100%",
        maxWidth: "1720px",
        overflowX: "auto",
        padding: "4px 4px 12px",
    },
    cardWrapper: {
        opacity: 0,
    },
    actions: {
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
    },
    creditsRow: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        color: "#9C9A93",
        fontSize: "14px",
    },
    creditsIcon: {
        color: "#E8C77A",
    },
    primaryButton: {
        border: "none",
        borderRadius: "6px",
        padding: "13px 36px",
        background: "linear-gradient(90deg, #C9A24B, #F2D98A)",
        color: "#2A1F06",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        cursor: "pointer",
    },
    secondaryButton: {
        border: "1px solid #C9A24B",
        borderRadius: "6px",
        padding: "13px 36px",
        background: "transparent",
        color: "#E8C77A",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        cursor: "pointer",
    },
};

export default function BoosterOpening() {
    const { boxId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [booster, setBooster] = useState(location.state?.booster ?? null);
    const [phase, setPhase] = useState("ready");
    const [pulls, setPulls] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (booster) return;
        OpeningService.getBooster(boxId)
            .then((box) =>
                setBooster({
                    id: box.id,
                    name: box.name,
                    price: box.price,
                    image: null,
                    fallbackGradient: FALLBACK_GRADIENT,
                })
            )
            .catch((err) => setError(err.message));
    }, [boxId, booster]);

    function handleOpen() {
        setError(null);
        setPhase("opening");
        OpeningService.openBooster(boxId)
            .then((result) => {
                setPulls(Array.isArray(result) ? result : [result]);
                setTimeout(() => setPhase("revealed"), 900);
            })
            .catch((err) => {
                setError(err.message);
                setPhase("ready");
            });
    }

    function handleOpenAnother() {
        setPulls([]);
        setPhase("ready");
    }

    const animals = pulls.map((item) => ({
        name: item.itemName,
        image: resolveAssetUrl(item.itemImageUrl),
        description: item.itemDescription,
        wikipediaUrl: item.itemWikipediaUrl,
        fallbackGradient: `linear-gradient(135deg, ${item.rarityColorHex}22, ${item.rarityColorHex})`,
        statusColor: item.rarityColorHex,
        statusLabel: item.rarityName,
    }));

    const remainingCredits = pulls.length > 0 ? pulls[pulls.length - 1].remainingCredits : null;

    return (
        <div className="booster-page" style={styles.page}>
            <style>{KEYFRAMES}</style>

            <button style={styles.backButton} onClick={() => navigate("/")}>
                <ArrowLeft size={16} strokeWidth={1.5} />
                Retour
            </button>

            {booster && (
                <h1 className="booster-title" style={styles.title}>
                    {booster.name}
                </h1>
            )}
            {error && <p style={styles.error}>{error}</p>}

            <div style={{ ...styles.stage, ...(phase !== "revealed" ? styles.stageReady : {}) }}>
                {phase !== "revealed" && booster && (
                    <div
                        className="booster-pack"
                        style={{
                            ...styles.pack,
                            background: booster.fallbackGradient,
                            animation:
                                phase === "opening"
                                    ? "packShake 0.9s ease-in forwards"
                                    : "packGlow 2.4s ease-in-out infinite",
                        }}
                        onClick={phase === "ready" ? handleOpen : undefined}
                    >
                        {booster.image && (
                            <img src={booster.image} alt={booster.name} style={styles.packImage} />
                        )}
                        {phase === "ready" && (
                            <span style={styles.packLabel}>APPUYEZ POUR OUVRIR</span>
                        )}
                    </div>
                )}

                {phase === "revealed" && animals.length > 0 && (
                    <div className="booster-cards-grid" style={styles.cardsGrid}>
                        {animals.map((animal, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.cardWrapper,
                                    animation: "cardReveal 0.5s ease-out forwards",
                                    animationDelay: `${index * 0.15}s`,
                                }}
                            >
                                <AnimalCard animal={animal} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {phase === "revealed" && (
                <div style={styles.actions}>
                    <div style={styles.creditsRow}>
                        <Gem size={14} style={styles.creditsIcon} strokeWidth={1.5} />
                        <span>{remainingCredits} restantes</span>
                    </div>
                    <button style={styles.primaryButton} onClick={handleOpenAnother}>
                        OUVRIR UN AUTRE
                    </button>
                    <button style={styles.secondaryButton} onClick={() => navigate("/collection")}>
                        VOIR LA COLLECTION
                    </button>
                </div>
            )}
        </div>
    );
}