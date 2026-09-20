const styles = {
    spinner: (size, color) => ({
        width: size,
        height: size,
        border: `3px solid ${color}33`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        display: "inline-block",
        boxSizing: "border-box",
    }),
};

export default function Spinner({ size = 20, color = "#C9A24B" }) {
    return (
        <>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
            <span style={styles.spinner(size, color)} />
        </>
    );
}