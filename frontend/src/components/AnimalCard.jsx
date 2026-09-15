import {useState} from "react";
import {createPortal} from "react-dom";
import {X} from "lucide-react";

const CARD_WIDTH = "clamp(90px, calc((100vw - 80px) * 0.2), 320px)";
const CARD_HEIGHT = "clamp(150px, calc((100vw - 80px) * 0.3125), 500px)";
const IMAGE_HEIGHT = "clamp(65px, calc((100vw - 80px) * 0.14375), 230px)";

const RESPONSIVE_CSS = `
@media (max-width: 820px) {
  .animal-card { width: 260px !important; height: 420px !important; padding: 16px !important; }
  .animal-card-image { height: 180px !important; margin-bottom: 14px !important; }
  .animal-card-name { font-size: 17px !important; min-height: 46px !important; margin-bottom: 9px !important; }
  .animal-card-status-row { margin-bottom: 11px !important; }
  .animal-card-status-label { font-size: 13px !important; }
  .animal-card-description { font-size: 13px !important; -webkit-line-clamp: 5 !important; }
}
`;

const styles = {
    card: {
        backgroundColor: "#14151B",
        borderRadius: "18px",
        padding: "16px",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        flexShrink: 0,
    },
    imageWrapper: {
        position: "relative",
        width: "100%",
        height: IMAGE_HEIGHT,
        flexShrink: 0,
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "18px",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    quantityBadge: {
        position: "absolute",
        top: "8px",
        right: "8px",
        backgroundColor: "#E8C77A",
        color: "#2A1F06",
        fontSize: "11px",
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: "9999px",
    },
    name: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontSize: "22px",
        lineHeight: 1.3,
        color: "#F2F1EC",
        margin: "0 0 12px",
        minHeight: "58px",
        flexShrink: 0,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    statusRow: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: "14px",
        flexShrink: 0,
    },
    statusDot: (color) => ({
        width: "10px",
        height: "10px",
        borderRadius: "9999px",
        backgroundColor: color,
        flexShrink: 0,
    }),
    statusLabel: {
        fontSize: "14px",
        color: "#9C9A93",
    },
    description: {
        fontSize: "14px",
        color: "#9C9A93",
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
        display: "-webkit-box",
        WebkitLineClamp: 6,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#14151B",
        borderRadius: "20px",
        padding: "24px",
        width: "100%",
        maxWidth: "440px",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative",
        cursor: "default",
        scrollbarWidth: "thin",
        scrollbarColor: "#C9A24B #14151B",
    },
    closeButton: {
        position: "absolute",
        top: "16px",
        right: "16px",
        background: "none",
        border: "none",
        color: "#9C9A93",
        cursor: "pointer",
        padding: "4px",
        zIndex: 1,
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "16px",
        paddingRight: "28px",
    },
    modalName: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontSize: "24px",
        color: "#F2F1EC",
        margin: 0,
        lineHeight: 1.25,
    },
    rarityBadge: (color) => ({
        border: `1.5px solid ${color}`,
        color,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        padding: "4px 10px",
        borderRadius: "9999px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        flexShrink: 0,
    }),
    modalImageFrame: {
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "18px",
        height: "260px",
    },
    modalImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    modalDivider: {
        border: "none",
        borderTop: "1px solid rgba(201,162,75,0.25)",
        margin: "0 0 16px",
    },
    modalDescription: {
        fontSize: "14px",
        color: "#C7C5BE",
        lineHeight: 1.6,
        margin: 0,
    },
    wikiLink: {
        display: "inline-block",
        marginTop: "14px",
        fontSize: "13px",
        color: "#E8C77A",
        textDecoration: "underline",
    },
};

export default function AnimalCard({animal}) {
    const [imageFailed, setImageFailed] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <style>{RESPONSIVE_CSS}</style>

            <div
                className="animal-card"
                style={{
                    ...styles.card,
                    border: `1px solid ${animal.statusColor}`,
                    boxShadow: `0 0 22px ${animal.statusColor}2E`,
                }}
                onClick={() => setExpanded(true)}
            >
                <div
                    className="animal-card-image"
                    style={{...styles.imageWrapper, background: animal.fallbackGradient}}
                >
                    {!imageFailed && animal.image && (
                        <img
                            src={animal.image}
                            alt={animal.name}
                            style={styles.image}
                            onError={() => setImageFailed(true)}
                        />
                    )}
                    {animal.quantity > 1 && (
                        <span style={styles.quantityBadge}>x{animal.quantity}</span>
                    )}
                </div>
                <h3 className="animal-card-name" style={styles.name}>{animal.name}</h3>
                <div className="animal-card-status-row" style={styles.statusRow}>
                    <span style={styles.statusDot(animal.statusColor)}/>
                    <span className="animal-card-status-label" style={styles.statusLabel}>
                        {animal.statusLabel}
                    </span>
                </div>
                {animal.description && (
                    <p className="animal-card-description" style={styles.description}>
                        {animal.description}
                    </p>
                )}
            </div>

            {expanded &&
                createPortal(
                    <div style={styles.overlay} onClick={() => setExpanded(false)}>
                        <div
                            style={{
                                ...styles.modal,
                                border: `1px solid ${animal.statusColor}`,
                                boxShadow: `0 0 60px 6px ${animal.statusColor}4D, 0 0 0 1px ${animal.statusColor}66 inset`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button style={styles.closeButton} onClick={() => setExpanded(false)}>
                                <X size={20} strokeWidth={1.5}/>
                            </button>

                            <div style={styles.modalHeader}>
                                <h2 style={styles.modalName}>{animal.name}</h2>
                                <span style={styles.rarityBadge(animal.statusColor)}>
                                    {animal.statusLabel}
                                </span>
                            </div>

                            <div
                                style={{
                                    ...styles.modalImageFrame,
                                    background: animal.fallbackGradient,
                                    border: `1px solid ${animal.statusColor}80`,
                                }}
                            >
                                {!imageFailed && animal.image && (
                                    <img
                                        src={animal.image}
                                        alt={animal.name}
                                        style={styles.modalImage}
                                        onError={() => setImageFailed(true)}
                                    />
                                )}
                            </div>

                            <hr style={styles.modalDivider}/>

                            {animal.description && (
                                <p style={styles.modalDescription}>{animal.description}</p>
                            )}

                            {animal.wikipediaUrl && (
                                <a
                                    href={animal.wikipediaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.wikiLink}
                                >
                                    Lire la suite sur Wikipédia
                                </a>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}