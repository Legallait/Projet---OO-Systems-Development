import {Gem} from "lucide-react";

const styles = {
    card: {
        backgroundColor: "#14151B",
        border: "1px solid #C9A24B",
        borderRadius: "12px",
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
        boxSizing: "border-box",
    },
    label: {
        alignSelf: "flex-start",
        color: "#E8C77A",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        marginBottom: "24px",
    },
    value: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "'Georgia', 'Cormorant Garamond', serif",
        fontSize: "56px",
        color: "#E8C77A",
        margin: "0 0 8px",
        lineHeight: 1,
    },
    caption: {
        color: "#9C9A93",
        fontSize: "13px",
        letterSpacing: "0.03em",
        margin: "0 0 16px",
    },
    count: {
        color: "#5FA05F",
        fontSize: "13px",
        fontWeight: 500,
    },
};

export default function SalesCard({creditsEarned = 0, cardsSold = 0}) {
    return (
        <div style={styles.card}>
            <span style={styles.label}>VENTES</span>
            <p style={styles.value}>
                {creditsEarned}
                <Gem size={36} strokeWidth={1.5}/>
            </p>
            <p style={styles.caption}>Gemmes gagnées en revendant des cartes</p>
            <span style={styles.count}>
        {cardsSold} {cardsSold > 1 ? "cartes vendues" : "carte vendue"}
      </span>
        </div>
    );
}
