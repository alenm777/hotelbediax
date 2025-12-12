function HomePage() {
  return (
    <div 
      style={{ 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        background: "linear-gradient(135deg, #6b73ff, #000dff)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
      }}
    >
      <h2 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Bienvenido a HotelBediaX
      </h2>
      <p style={{ fontSize: "1.2rem", maxWidth: "500px" }}>
        Tu portal de gestión de destinos turísticos. Explora, crea y administra todos tus destinos desde un solo lugar.
      </p>
      
    </div>
  );
}

export default HomePage;