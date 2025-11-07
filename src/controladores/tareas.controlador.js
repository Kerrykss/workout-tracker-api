// src/controladores/tareas.controlador.js
let tareas = [
  {
    id: "1",
    description: "Tarea de ejemplo: configurar proyecto",
    status: "todo",
    createdAt: "2025-11-07T00:00:00.000Z",
    updatedAt: "2025-11-07T00:00:00.000Z",
  },
];

// ✅ Listar todas las tareas con opción de filtro por status
export const listarTareas = (req, res) => {
  const { status } = req.query;
  let resultado = tareas;

  if (status) {
    resultado = tareas.filter((t) => t.status === status);
  }

  res.status(200).json(resultado);
};

// ✅ Obtener tarea por ID
export const obtenerTareaPorId = (req, res) => {
  const { id } = req.params;
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }
  res.status(200).json(tarea);
};

// ✅ Crear nueva tarea
export const crearTarea = (req, res) => {
  const { description, status } = req.body;

  if (!description || typeof description !== "string") {
    return res.status(400).json({ mensaje: "Descripción inválida" });
  }

  const estadosValidos = ["todo", "in-progress", "done"];
  if (status && !estadosValidos.includes(status)) {
    return res.status(400).json({ mensaje: "Estado inválido" });
  }

  const nuevaTarea = {
    id: (tareas.length + 1).toString(),
    description,
    status: status || "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
};

// ✅ Actualizar tarea completa con PUT
export const actualizarTareaPut = (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;

  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).json({ mensaje: "Descripción inválida" });
  }

  const estadosValidos = ["todo", "in-progress", "done"];
  if (!status || !estadosValidos.includes(status)) {
    return res.status(400).json({ mensaje: "Estado inválido" });
  }

  tarea.description = description;
  tarea.status = status;
  tarea.updatedAt = new Date().toISOString();

  res.status(200).json({ mensaje: "Tarea actualizada completamente", tarea });
};

// ✅ Actualización parcial con PATCH
export const actualizarTareaPatch = (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;

  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  const estadosValidos = ["todo", "in-progress", "done"];
  if (description && typeof description !== "string") {
    return res.status(400).json({ mensaje: "Descripción inválida" });
  }
  if (status && !estadosValidos.includes(status)) {
    return res.status(400).json({ mensaje: "Estado inválido" });
  }

  if (description) tarea.description = description;
  if (status) tarea.status = status;
  tarea.updatedAt = new Date().toISOString();

  res.status(200).json({ mensaje: "Tarea actualizada parcialmente", tarea });
};

// ✅ Eliminar tarea por ID
export const eliminarTarea = (req, res) => {
  const { id } = req.params;

  const index = tareas.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  const tareaEliminada = tareas.splice(index, 1);
  res.status(200).json({ mensaje: "Tarea eliminada correctamente", tarea: tareaEliminada[0] });
};
