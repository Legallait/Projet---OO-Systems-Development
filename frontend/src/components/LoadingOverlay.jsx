import Spinner from "./Spinner";

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(11,12,16,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
};

export default function LoadingOverlay() {
    return (
        <div style={styles.overlay}>
            <Spinner size={48} />
        </div>
    );
}