import {useEffect, useState} from "react";
import Spinner from "./Spinner";
import {checkBackendReady} from "../services/apiClient";

const POLL_INTERVAL_MS = 2000;
const SLOW_START_MS = 10000;

const styles = {
    screen: {
        position: "fixed",
        inset: 0,
        backgroundColor: "#0B0C10",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "24px",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        zIndex: 2000,
    },
    title: {
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: "24px",
        color: "#F2F1EC",
        margin: 0,
    },
    message: {
        color: "#9C9A93",
        fontSize: "14px",
        lineHeight: 1.6,
        maxWidth: "420px",
        margin: 0,
    },
};

export default function BackendGate({children}) {
    const [isReady, setIsReady] = useState(false);
    const [isSlow, setIsSlow] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let timeoutId;

        async function poll() {
            const ready = await checkBackendReady();
            if (cancelled) return;
            if (ready) {
                setIsReady(true);
            } else {
                timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
            }
        }

        const slowId = setTimeout(() => setIsSlow(true), SLOW_START_MS);
        poll();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
            clearTimeout(slowId);
        };
    }, []);

    if (isReady) return children;

    return (
        <div style={styles.screen}>
            <Spinner size={48}/>
            <h1 style={styles.title}>Démarrage du serveur…</h1>
            <p style={styles.message}>
                Le serveur démarre et récupère les espèces depuis iNaturalist.
                Au premier lancement, cela peut prendre une minute.
            </p>
            {isSlow && (
                <p style={styles.message}>
                    Toujours en cours… Vérifiez que le backend est bien lancé sur le port 8080.
                </p>
            )}
        </div>
    );
}
