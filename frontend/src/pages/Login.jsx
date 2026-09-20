import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login, register } from "../services/AuthService";
import Spinner from "../components/Spinner";

const styles = {
    page: {
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        backgroundColor: "#0B0C10",
    },
    panel: {
        width: "100%",
        maxWidth: "380px",
        backgroundColor: "#14151B",
        border: "1px solid #24262E",
        borderRadius: "16px",
        padding: "36px 32px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
    },
    title: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "30px",
        color: "#E8C77A",
        textAlign: "center",
        margin: "0 0 6px",
    },
    subtitle: {
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: "#9C9A93",
        textAlign: "center",
        margin: "0 0 28px",
    },
    field: {
        marginBottom: "18px",
    },
    label: {
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        color: "#9C9A93",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    input: {
        width: "100%",
        padding: "11px 14px",
        backgroundColor: "#0B0C10",
        border: "1px solid #24262E",
        borderRadius: "8px",
        color: "#F2F1EC",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
    },
    passwordWrapper: {
        position: "relative",
    },
    toggleButton: {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        color: "#9C9A93",
        cursor: "pointer",
        display: "flex",
        padding: 0,
    },
    error: {
        backgroundColor: "rgba(200,70,70,0.12)",
        border: "1px solid rgba(200,70,70,0.4)",
        color: "#E39A9A",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        borderRadius: "8px",
        padding: "10px 12px",
        marginBottom: "18px",
    },
    submitButton: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#C9A24B",
        border: "none",
        borderRadius: "8px",
        color: "#0B0C10",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "14px",
        cursor: "pointer",
        marginTop: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    submitButtonDisabled: {
        opacity: 0.6,
        cursor: "not-allowed",
    },
    switchRow: {
        textAlign: "center",
        marginTop: "22px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: "#9C9A93",
    },
    switchLink: {
        color: "#C9A24B",
        cursor: "pointer",
        fontWeight: 600,
    },
};

export default function Login() {
    const [mode, setMode] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isRegister = mode === "register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!username.trim() || !password) {
            setError("Merci de remplir tous les champs.");
            return;
        }
        setLoading(true);
        try {
            if (isRegister) {
                await register(username.trim(), password);
            } else {
                await login(username.trim(), password);
            }
            navigate("/");
        } catch (err) {
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(isRegister ? "login" : "register");
        setError("");
    };

    return (
        <div style={styles.page}>
            <div style={styles.panel}>
                <h1 style={styles.title}>{isRegister ? "Créer un compte" : "Connexion"}</h1>
                <p style={styles.subtitle}>
                    {isRegister
                        ? "Rejoins l'aventure avec 2500 jetons"
                        : "Content de te revoir"}
                </p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="username">Nom d'utilisateur</label>
                        <input
                            id="username"
                            type="text"
                            style={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label} htmlFor="password">Mot de passe</label>
                        <div style={styles.passwordWrapper}>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                style={{ ...styles.input, paddingRight: "40px" }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete={isRegister ? "new-password" : "current-password"}
                            />
                            <button
                                type="button"
                                style={styles.toggleButton}
                                onClick={() => setShowPassword((v) => !v)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            ...(loading ? styles.submitButtonDisabled : {}),
                        }}
                    >
                        {loading && <Spinner size={16} color="#0B0C10" />}
                        {loading ? "" : isRegister ? "Créer mon compte" : "Se connecter"}
                    </button>
                </form>

                <div style={styles.switchRow}>
                    {isRegister ? "Déjà un compte ? " : "Pas encore de compte ? "}
                    <span style={styles.switchLink} onClick={toggleMode}>
                        {isRegister ? "Se connecter" : "S'inscrire"}
                    </span>
                </div>
            </div>
        </div>
    );
}