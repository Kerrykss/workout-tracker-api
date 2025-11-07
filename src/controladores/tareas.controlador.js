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

// ✅ Listar todas las tareas
export const listarTareas = (req, res) => {
  res.json(tareas);
};

// ✅ Obtener tarea por ID
export const obtenerTareaPorId = (req, res) => {
  const { id } = req.params;
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }
  res.json(tarea);
};

// ✅ Crear nueva tarea
export const crearTarea = (req, res) => {
  const { description, status } = req.body;
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

  tarea.description = description;
  tarea.status = status;
  tarea.updatedAt = new Date().toISOString();

  res.json({ mensaje: "Tarea actualizada completamente", tarea });
};

// ✅ Actualización parcial con PATCH
export const actualizarTareaPatch = (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;

  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ mensaje: "Tarea no encontrada" });
  }

  if (description) tarea.description = description;
  if (status) tarea.status = status;
  tarea.updatedAt = new Date().toISOString();

  res.json({ mensaje: "Tarea actualizada parcialmente", tarea });
};
