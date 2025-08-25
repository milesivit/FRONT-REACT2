import React from "react";
import Navbar from "../components/Navbar";

const HomeView = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Bienvenido al CRUD de productos y usuarios</h1>
        <h4>
          (Aplicación fullstack en JavaScript donde el frontend (React) consume los datos expuestos por el backend (Express), permitiendo realizar CRUDs completos)
        </h4>
      </div>
    </div>
  );
};

export default HomeView;
