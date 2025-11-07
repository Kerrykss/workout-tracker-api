// src/routes/tareas.rutas.js
import { Router } from "express";
import {
  listarTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTareaPut,
  actualizarTareaPatch,
} from "../controladores/tareas.controlador.js";

const router = Router();

// Rutas básicas
router.get("/", listarTareas);
router.get("/:id", obtenerTareaPorId);
router.post("/", crearTarea);

// Rutas de actualización
router.put("/:id", actualizarTareaPut);
router.patch("/:id", actualizarTareaPatch);

export default router;
