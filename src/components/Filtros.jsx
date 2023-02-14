import { useState, useEffect } from "react";

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor filtro">
      <form>
        <div className="campo">
          <label>Filtrar Gastos</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">-- Todas las Categorías --</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="transporte">Transporte</option>
            <option value="ocio">Ocio</option>
            <option value="viajes">Viajes</option>
            <option value="ropa">Ropa</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filtros;
