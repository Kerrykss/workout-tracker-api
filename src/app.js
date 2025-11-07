import express from "express";
import dotenv from "dotenv";
import tareasRutas from "./routes/tareas.rutas.js"; // 👈 Asegúrate de que exista este archivo

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido a la API Rastreador de Tareas 📝");
});

// Registrar rutas de tareas
app.use("/api/tareas", tareasRutas); // 👈 Aquí conectamos las rutas

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
