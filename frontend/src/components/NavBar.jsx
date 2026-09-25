import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Gem, Menu, X} from "lucide-react";
import {getCurrentPlayer, logout, subscribePlayer} from "../services/AuthService";

const NAV_LINKS = [
    {label: "Accueil", path: "/"},
    {label: "Collection", path: "/Collection"},
    {label: "Historique", path: "/History"},
    {label: "Stats", path: "/Stats"},
];

const RESPONSIVE_CSS = `
.navbar-burger, .navbar-mobile-menu { display: none !important; }
@media (max-width: 820px) {
  .navbar { padding: 0 16px !important; }
  .navbar-links, .navbar-auth { display: none !important; }
  .navbar-burger { display: flex !important; }
  .navbar-mobile-menu.is-open { display: flex !important; }
}
@media (max-width: 420px) {
  .navbar-logo-text { display: none; }
  .navbar-gems-label { display: none; }
}
`;

const styles = {
    nav: {
        position: "relative",
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
        whiteSpace: "nowrap",
    },
    burger: {
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        border: "1px solid #24262E",
        backgroundColor: "#14151B",
        color: "#E8C77A",
        cursor: "pointer",
        flexShrink: 0,
    },
    mobileMenu: {
        position: "absolute",
        top: "72px",
        left: 0,
        right: 0,
        zIndex: 900,
        flexDirection: "column",
        backgroundColor: "#0B0C10",
        borderBottom: "1px solid #24262E",
        boxShadow: "0 12px 24px rgba(0,0,0,0.5)",
        padding: "8px 16px 16px",
        fontFamily: "'Inter', sans-serif",
    },
    mobileLink: (isActive) => ({
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: 500,
        padding: "14px 12px",
        borderRadius: "8px",
        color: isActive ? "#E8C77A" : "#C7C5BE",
        backgroundColor: isActive ? "#1A1710" : "transparent",
        borderLeft: isActive ? "2px solid #E8C77A" : "2px solid transparent",
    }),
    mobileAuth: {
        marginTop: "8px",
        paddingTop: "14px",
        borderTop: "1px solid #24262E",
        textAlign: "left",
        padding: "14px 12px 0",
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
    // The menu is tied to the path it was opened on, so it closes by itself after navigating.
    const [menuOpenOn, setMenuOpenOn] = useState(null);
    const isMenuOpen = menuOpenOn === location.pathname;

    useEffect(() => subscribePlayer(() => setPlayer(getCurrentPlayer())), []);

    const gems = player ? player.credits : 0;

    const handleLogout = () => {
        setMenuOpenOn(null);
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar" style={styles.nav}>
            <style>{RESPONSIVE_CSS}</style>

            {/* Logo */}
            <Link to="/" style={styles.logoWrapper}>
                <img src="/logo.png" alt="One More Time" style={styles.logoImage}/>
                <span className="navbar-logo-text" style={styles.logoText}>One More Time</span>
            </Link>

            {/* Nav links */}
            <ul className="navbar-links" style={styles.navList}>
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname.toLowerCase() === link.path.toLowerCase();
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
                    <Gem size={16} style={styles.gemsIcon} strokeWidth={1.5}/>
                    <span style={styles.gemsAmount}>{gems.toLocaleString("fr-FR")}</span>
                    <span className="navbar-gems-label" style={styles.gemsLabel}>GEMS</span>
                </div>

                <div className="navbar-auth">
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

                {/* Burger (mobile only) */}
                <button
                    className="navbar-burger"
                    style={styles.burger}
                    onClick={() => setMenuOpenOn(isMenuOpen ? null : location.pathname)}
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={20} strokeWidth={1.5}/> : <Menu size={20} strokeWidth={1.5}/>}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`navbar-mobile-menu${isMenuOpen ? " is-open" : ""}`}
                style={styles.mobileMenu}
            >
                {NAV_LINKS.map((link) => {
                    const isActive = location.pathname.toLowerCase() === link.path.toLowerCase();
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={styles.mobileLink(isActive)}
                            onClick={() => setMenuOpenOn(null)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
                {player ? (
                    <button style={{...styles.authLink, ...styles.mobileAuth}} onClick={handleLogout}>
                        Déconnexion
                    </button>
                ) : (
                    <Link to="/login" style={{...styles.authLink, ...styles.mobileAuth}}>
                        Connexion
                    </Link>
                )}
            </div>
        </nav>
    );
}