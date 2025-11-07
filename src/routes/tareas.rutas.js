import { 
  listarTareas, 
  obtenerTareaPorId, 
  crearTarea, 
  actualizarTareaPut, 
  actualizarTareaPatch, 
  eliminarTarea 
} from "../controladores/tareas.controlador.js";

import { Router } from "express";
const router = Router();

// Rutas CRUD
router.get("/", listarTareas);
router.get("/:id", obtenerTareaPorId);
router.post("/", crearTarea);
router.put("/:id", actualizarTareaPut);
router.patch("/:id", actualizarTareaPatch);
router.delete("/:id", eliminarTarea); // 👈 NUEVA RUTA

export default router;
