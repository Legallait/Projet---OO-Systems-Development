import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Gem, ArrowLeft } from "lucide-react";
import AnimalCard from "../components/AnimalCard";
import OpeningService from "../services/OpeningService";
import { resolveAssetUrl } from "../services/apiClient";
import { resolveBoosterVisual } from "../services/boosterVisuals";

const KEYFRAMES = `
@keyframes packGlow {
  0%, 100% { box-shadow: 0 0 24px 2px color-mix(in srgb, var(--accent) 30%, transparent); }
  50% { box-shadow: 0 0 44px 10px color-mix(in srgb, var(--accent) 55%, transparent); }
}
@keyframes packShine {
  0% { transform: translateX(-140%) skewX(-20deg); }
  55%, 100% { transform: translateX(260%) skewX(-20deg); }
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
.booster-page { height: 100%; overflow: hidden; }
@media (max-width: 820px), (max-height: 599px) {
  .booster-page { height: auto; min-height: 100%; overflow: visible; }
}
@media (min-width: 821px) and (min-height: 600px) {
  .booster-stage { container-type: size; }
  .booster-cards-grid { overflow: visible !important; }
}
@supports (height: 1cqh) {
  @media (min-width: 821px) and (min-height: 600px) {
    .booster-cards-grid {
      --card-h: min(clamp(150px, calc((100vw - 80px) * 0.3125), 500px), calc(100cqh - 24px));
    }
    .booster-page .animal-card { height: var(--card-h) !important; }
    .booster-page .animal-card-image { height: calc(var(--card-h) * 0.46) !important; }
  }
}
@media (max-width: 820px) {
  .booster-actions {
    flex-direction: column !important;
    align-items: stretch !important;
    width: 100%;
    max-width: 320px;
    gap: 12px !important;
  }
  .booster-credits { justify-content: center; }
  .booster-actions button { width: 100%; padding-left: 16px !important; padding-right: 16px !important; }
}
@media (max-width: 900px) {
  .booster-title { font-size: 24px !important; margin-bottom: 20px !important; }
}
@media (max-width: 500px) {
  .booster-title { font-size: 20px !important; margin-bottom: 16px !important; }
  .booster-pack { padding: 16px !important; }
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
        boxSizing: "border-box",
        padding: "12px 12px 20px",
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
        marginBottom: "4px",
        flexShrink: 0,
    },
    title: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: "34px",
        color: "#F2F1EC",
        margin: "0 0 16px",
        flexShrink: 0,
        textAlign: "center",
    },
    error: {
        color: "#D9776B",
        fontSize: "14px",
        marginBottom: "16px",
    },
    stage: {
        flex: "1 1 auto",
        minHeight: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    stageReady: {
        minHeight: "420px",
    },
    pack: {
        // Grows with the screen, limited by the available width and height (13:17 like a card pack).
        width: "min(380px, 80vw, calc((100vh - 230px) * 13 / 17))",
        minWidth: "200px",
        aspectRatio: "13 / 17",
        boxSizing: "border-box",
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
        filter: "saturate(1.1) contrast(1.05)",
    },
    packShade: {
        position: "absolute",
        inset: 0,
        background:
            "linear-gradient(180deg, rgba(11,12,16,0.35) 0%, rgba(11,12,16,0) 30%, rgba(11,12,16,0) 55%, rgba(11,12,16,0.85) 100%)",
        pointerEvents: "none",
    },
    packFrame: {
        position: "absolute",
        inset: "8px",
        borderRadius: "10px",
        border: "1px solid rgba(232,199,122,0.55)",
        pointerEvents: "none",
    },
    packShine: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: "45%",
        background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)",
        animation: "packShine 3.6s ease-in-out infinite",
        pointerEvents: "none",
    },
    packName: {
        position: "relative",
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        color: "#F2F1EC",
        fontSize: "clamp(20px, 5vw, 28px)",
        lineHeight: 1.2,
        textAlign: "center",
        textShadow: "0 2px 10px rgba(0,0,0,0.8)",
        marginBottom: "10px",
    },
    packLabel: {
        position: "relative",
        color: "#E8C77A",
        fontSize: "clamp(12px, 3vw, 14px)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textShadow: "0 2px 8px rgba(0,0,0,0.8)",
    },
    cardsGrid: {
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        gap: "12px",
        width: "100%",
        maxWidth: "1720px",
        overflowX: "auto",
        padding: "4px 0",
    },
    cardWrapper: {
        opacity: 0,
    },
    actions: {
        marginTop: "16px",
        flexShrink: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px 24px",
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
                    ...resolveBoosterVisual(box.name),
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

            <div
                className="booster-stage"
                style={{ ...styles.stage, ...(phase !== "revealed" ? styles.stageReady : {}) }}
            >
                {phase !== "revealed" && booster && (
                    <div
                        className="booster-pack"
                        style={{
                            ...styles.pack,
                            "--accent": booster.accent ?? "#C9A24B",
                            background: booster.fallbackGradient,
                            animation:
                                phase === "opening"
                                    ? "packShake 0.9s ease-in forwards"
                                    : "packGlow 2.4s ease-in-out infinite",
                        }}
                        onClick={phase === "ready" ? handleOpen : undefined}
                    >
                        {booster.image && (
                            <img
                                src={booster.image}
                                alt={booster.name}
                                style={{ ...styles.packImage, objectPosition: booster.focus }}
                            />
                        )}
                        <div style={styles.packShade} />
                        <div style={styles.packFrame} />
                        {phase === "ready" && <div style={styles.packShine} />}
                        <span style={styles.packName}>{booster.name}</span>
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
                <div className="booster-actions" style={styles.actions}>
                    <div className="booster-credits" style={styles.creditsRow}>
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