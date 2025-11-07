// src/routes/tareas.rutas.js
import express from "express";
import { obtenerTareas } from "../controladores/tareas.controlador.js";

const router = express.Router();

// Ruta base: /api/v1/tareas
router.get("/", obtenerTareas);

export default router;
