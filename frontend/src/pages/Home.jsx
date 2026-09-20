import { useEffect, useState } from "react";
import BoosterCard from "../components/BoosterCard";
import HomeService from "../services/HomeService";
import { resolveBoosterVisual } from "../services/boosterVisuals";

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
                        ...resolveBoosterVisual(box.name),
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