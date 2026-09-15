import { useEffect, useState } from "react";
import BoosterCard from "../components/BoosterCard";
import HomeService from "../services/HomeService";

const VISUALS = [
    { match: "savane", image: "/images/boosters/savane.png", fallbackGradient: "linear-gradient(135deg, #7A3B1E, #D97A3D, #F2B45A)" },
    { match: "froid", image: "/images/boosters/froid.png", fallbackGradient: "linear-gradient(135deg, #0B1F3A, #1F4E6B, #A8D8E8)" },
    { match: "oc", image: "/images/boosters/ocean.png", fallbackGradient: "linear-gradient(135deg, #0B2A4A, #14568C, #4FA8D8)" },
    { match: "for", image: "/images/boosters/foret.png", fallbackGradient: "linear-gradient(135deg, #0F2E1C, #1F5B37, #3E8B57)" },
];

const DEFAULT_VISUAL = {
    image: null,
    fallbackGradient: "linear-gradient(135deg, #2A1F06, #C9A24B, #F2D98A)",
};

function resolveVisual(name) {
    const normalized = name.toLowerCase();
    return VISUALS.find((v) => normalized.includes(v.match)) ?? DEFAULT_VISUAL;
}

const styles = {
    page: {
        backgroundColor: "#0B0C10",
        height: "100%",
        padding: "64px 32px",
        fontFamily: "'Inter', sans-serif",
    },
    header: {
        textAlign: "center",
        maxWidth: "640px",
        margin: "0 auto 48px",
    },
    eyebrow: {
        color: "#E8C77A",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        marginBottom: "16px",
    },
    title: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: "36px",
        color: "#F2F1EC",
        margin: "0 0 16px",
    },
    subtitle: {
        color: "#9C9A93",
        fontSize: "15px",
        lineHeight: 1.6,
        margin: 0,
    },
    error: {
        color: "#D9776B",
        textAlign: "center",
        marginBottom: "24px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
        maxWidth: "1320px",
        margin: "0 auto",
    },
};

export default function Home() {
    const [boosters, setBoosters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        HomeService.getBoosters()
            .then((boxes) =>
                setBoosters(
                    boxes.map((box) => ({
                        id: box.id,
                        name: box.name,
                        price: box.price,
                        ...resolveVisual(box.name),
                    }))
                )
            )
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <p style={styles.eyebrow}>INVOCATIONS BESTIAIRES</p>
                <h1 style={styles.title}>Obtenez de nouvelles espèces</h1>
                <p style={styles.subtitle}>
                    Dépensez vos Gemmes pour ouvrir des boosters thématiques et
                    enrichir votre réserve d'animaux protégés.
                </p>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.grid}>
                {boosters.map((booster) => (
                    <BoosterCard key={booster.id} booster={booster} />
                ))}
            </div>
        </div>
    );
}