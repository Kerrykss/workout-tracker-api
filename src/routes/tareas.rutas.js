// src/routes/tareas.rutas.js
import express from "express";
import { listarTareas, obtenerTareaPorId, crearTarea } from "../controladores/tareas.controlador.js";

const router = express.Router();

router.get("/", listarTareas);         // GET /api/tareas
router.get("/:id", obtenerTareaPorId);// GET /api/tareas/:id
router.post("/", crearTarea);         // POST /api/tareas

export default router;
