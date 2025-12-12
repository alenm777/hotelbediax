import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";

function App() {
  const linkStyle = {
    marginRight: "15px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "all 0.3s"
  };

  const linkHover = (e) => {
    e.currentTarget.style.backgroundColor = "#333";
    e.currentTarget.style.color = "#fff";
  };

  const linkOut = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#333";
  };

  return (
    <BrowserRouter>
      {/* HEADER */}
      <header style={{ 
        padding: "15px 30px", 
        backgroundColor: "#f4f4f4", 
        display: "flex", 
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <Link 
          to="/" 
          style={linkStyle}
          onMouseOver={linkHover}
          onMouseOut={linkOut}
        >
          Inicio
        </Link>
        <Link 
          to="/destinations" 
          style={linkStyle}
          onMouseOver={linkHover}
          onMouseOut={linkOut}
        >
          Destinos
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ padding: "30px", minHeight: "calc(100vh - 70px)", backgroundColor: "#fafafa" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;