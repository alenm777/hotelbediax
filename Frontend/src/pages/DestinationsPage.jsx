import { useEffect, useState } from "react";
import { 
  getDestinations, 
  createDestination, 
  deleteDestination, 
  updateDestination 
} from "../services/api";
import DestinationForm from "../components/DestinationForm";

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [editingDestination, setEditingDestination] = useState(null);

  // Filtros y búsqueda
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCity, setFilterCity] = useState("");

  // Paginación
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Cargar datos del backend
  async function loadData(p = 1) {
    const res = await getDestinations({
      page: p,
      q: search,
      country: filterCountry,
      city: filterCity,
    });

    setDestinations(res.data);
    setPage(res.page);
    setTotal(res.total);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Crear y editar
  async function handleSubmit(data) {
    if (!data.name.trim()) return alert("El nombre es obligatorio");
    if (!data.country.trim()) return alert("El país es obligatorio");
    if (data.rating < 0 || data.rating > 5)
      return alert("El rating debe ser entre 0 y 5");

    if (editingDestination) {
      await updateDestination(editingDestination.id, data);
      setEditingDestination(null);
    } else {
      await createDestination(data);
    }

    loadData(page);
  }

  // Eliminar
  async function handleDelete(id) {
    if (!confirm("¿Seguro que querés eliminar este destino?")) return;
    await deleteDestination(id);
    loadData(page);
  }

  function handleEditClick(destination) {
    setEditingDestination(destination);
  }

  function applyFilters() {
    loadData(1);
  }

  // Mostrar rating con estrellas
  function renderStars(rating) {
    const stars = Math.round(rating);
    return "⭐".repeat(stars) + "☆".repeat(5 - stars);
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "25%",
        padding: "20px",
        borderRight: "2px solid #ddd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        
        <h3 style={{ textAlign: "center" }}>Filtro de datos</h3>

        <div>
          <input
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />

          <input
            placeholder="Filtrar por país..."
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />

          <input
            placeholder="Filtrar por ciudad..."
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />
        </div>

        <button 
          onClick={applyFilters}
          style={{ width: "100%", padding: "10px" }}
        >
          Buscar
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ width: "75%", padding: "20px" }}>
        
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Destinos
        </h1>

        {/* Botones arriba */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button onClick={() => setEditingDestination(null)}>Crea tu destino</button>
          <button onClick={() => alert("Selecciona un destino de la tabla para modificar")}>
            Modificar el destino
          </button>
          <button onClick={() => alert("Usa el botón 'Eliminar' en la tabla")}>
            Eliminar el destino
          </button>
        </div>

        {/* Formulario */}
        <DestinationForm 
          onSubmit={handleSubmit} 
          editingDestination={editingDestination}
        />

        {/* Total resultados */}
        <p><strong>Total encontrados:</strong> {total}</p>

        {/* TABLA MODERNA */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>ID</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Nombre</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Descripcion</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Pais</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Ciudad</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Calificación</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Última modificación</th>
              <th style={{ padding: "10px", background: "#f4f4f4", borderBottom: "2px solid #ddd" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {destinations.map((d, i) => (
              <tr 
                key={d.id} 
                style={{ background: i % 2 === 0 ? "#ffffff" : "#f9f9f9" }}
              >
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{d.id}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{d.name}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{d.description}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{d.country}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{d.city}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{renderStars(d.rating)}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {d.updatedAt || d.createdAt}
                </td>

                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  <button onClick={() => handleEditClick(d)}>Editar</button>
                  <button 
                    onClick={() => handleDelete(d.id)} 
                    className="danger"
                    style={{ marginLeft: "5px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINACIÓN */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button disabled={page === 1} onClick={() => loadData(page - 1)}>
            Anterior
          </button>

          <span style={{ margin: "0 10px" }}>Página {page}</span>

          <button 
            disabled={page * limit >= total} 
            onClick={() => loadData(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinationsPage;