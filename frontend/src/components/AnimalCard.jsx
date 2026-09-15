import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Collection from "./pages/Collection";
import History from "./pages/History";
import Stats from "./pages/Stats";
import BoosterOpening from "./pages/BoosterOpening.jsx";

const styles = {
    appWrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    content: {
        flex: "1 1 auto",
        minHeight: 0,
        overflowY: "auto",
    },
};

export default function App() {
    return (
        <BrowserRouter>
            <div style={styles.appWrapper}>
                <NavBar/>
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/collection" element={<Collection/>}/>
                        <Route path="/history" element={<History/>}/>
                        <Route path="/stats" element={<Stats/>}/>
                        <Route path="/boosters/:boxId/open" element={<BoosterOpening/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}