import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Gem } from "lucide-react";
import { getCurrentPlayer, logout, subscribePlayer } from "../services/AuthService";

const NAV_LINKS = [
    { label: "Accueil", path: "/" },
    { label: "Collection", path: "/Collection" },
    { label: "Historique", path: "/History" },
    { label: "Stats", path: "/Stats" },
];

const styles = {
    nav: {
        backgroundColor: "#0B0C10",
        borderBottom: "1px solid #24262E",
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        width: "100%",
        height: "72px",
        boxSizing: "border-box",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
    },
    logoWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        textDecoration: "none",
    },
    logoImage: {
        width: "48px",
        height: "48px",
        borderRadius: "9999px",
        border: "1px solid #C9A24B",
        objectFit: "cover",
        display: "block",
    },
    logoText: {
        color: "#E8C77A",
        fontSize: "20px",
        letterSpacing: "0.02em",
    },
    navList: {
        display: "flex",
        alignItems: "center",
        gap: "40px",
        listStyle: "none",
        margin: 0,
        padding: 0,
        fontFamily: "'Inter', sans-serif",
    },
    navLink: (isActive) => ({
        textDecoration: "none",
        display: "inline-block",
        fontSize: "14px",
        fontWeight: 500,
        paddingBottom: "4px",
        color: isActive ? "#E8C77A" : "#9C9A93",
        borderBottom: isActive ? "2px solid #E8C77A" : "2px solid transparent",
        transition: "color 150ms ease",
    }),
    rightWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    gemsWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "9999px",
        border: "1px solid #24262E",
        backgroundColor: "#14151B",
        fontFamily: "'Inter', sans-serif",
    },
    gemsIcon: {
        color: "#5B8FEF",
    },
    gemsAmount: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#F2F1EC",
    },
    gemsLabel: {
        fontSize: "12px",
        letterSpacing: "0.05em",
        color: "#9C9A93",
    },
    authLink: {
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        color: "#C9A24B",
        textDecoration: "none",
        cursor: "pointer",
        background: "none",
        border: "none",
    },
};

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [player, setPlayer] = useState(getCurrentPlayer);

    useEffect(() => subscribePlayer(() => setPlayer(getCurrentPlayer())), []);

    const gems = player ? player.credits : 0;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            {/* Logo */}
            <Link to="/" style={styles.logoWrapper}>
                <img src="/logo.png" alt="One More Time" style={styles.logoImage} />
                <span style={styles.logoText}>One More Time</span>
            </Link>

            {/* Nav links */}
            <ul style={styles.navList}>
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <li key={link.path}>
                            <Link to={link.path} style={styles.navLink(isActive)}>
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div style={styles.rightWrapper}>
                {/* Gems counter */}
                <div style={styles.gemsWrapper}>
                    <Gem size={16} style={styles.gemsIcon} strokeWidth={1.5} />
                    <span style={styles.gemsAmount}>{gems.toLocaleString("fr-FR")}</span>
                    <span style={styles.gemsLabel}>GEMS</span>
                </div>

                {player ? (
                    <button style={styles.authLink} onClick={handleLogout}>
                        Déconnexion
                    </button>
                ) : (
                    <Link to="/login" style={styles.authLink}>
                        Connexion
                    </Link>
                )}
            </div>
        </nav>
    );
}