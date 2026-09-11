import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Collection from "./pages/Collection";
import History from "./pages/History";
import Stats from "./pages/Stats";

const styles = {
  appWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    flex: 1,
    overflowY: "auto",
  },
};

export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.appWrapper}>
        <NavBar />
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/history" element={<History />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
