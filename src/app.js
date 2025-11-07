// src/app.js
import express from "express";
import dotenv from "dotenv";
import rutasTareas from "./routes/tareas.rutas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API Rastreador de Tareas 📝");
});

// Rutas de tareas
app.use("/api/v1/tareas", rutasTareas);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
