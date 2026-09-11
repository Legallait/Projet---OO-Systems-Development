import { Link, useLocation } from "react-router-dom";
import { PawPrint, Gem } from "lucide-react";

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
  },
  logoIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "9999px",
    border: "1px solid #C9A24B",
    color: "#C9A24B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
};

export default function Navbar({ gems = 2450 }) {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logoWrapper}>
        <div style={styles.logoIcon}>
          <PawPrint size={18} strokeWidth={1.5} />
        </div>
        <span style={styles.logoText}>Gacha Faune</span>
      </div>

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

      {/* Gems counter */}
      <div style={styles.gemsWrapper}>
        <Gem size={16} style={styles.gemsIcon} strokeWidth={1.5} />
        <span style={styles.gemsAmount}>{gems.toLocaleString("fr-FR")}</span>
        <span style={styles.gemsLabel}>GEMS</span>
      </div>
    </nav>
  );
}