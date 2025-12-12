import { useEffect, useState } from "react";

function DestinationForm({ onSubmit, editingDestination }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    country: "",
    city: "",
    rating: 0
  });

  useEffect(() => {
    if (editingDestination) {
      setForm(editingDestination);
    } else {
      setForm({
        name: "",
        description: "",
        country: "",
        city: "",
        rating: 0
      });
    }
  }, [editingDestination]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "6px",
        marginBottom: "20px",
        background: "#fafafa"
      }}
    >
      <h3>{editingDestination ? "Modify Destiny" : "Crea tu destino"}</h3>

      {/* FLEX GRID */}
      <div style={{ display: "flex", gap: "20px" }}>
        
        <div style={{ flex: 1 }}>
          <label>Nombre:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />

          <label>País:</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />

          <label>Ciudad:</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>Descripcion:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />

          <label>Calificación (0 a 5):</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
          />
        </div>
      </div>

      <button>{editingDestination ? "Save Changes" : "Crear"}</button>
    </form>
  );
}

export default DestinationForm;