// src/controladores/tareas.controlador.js
import fs from "fs";
import path from "path";

const filePath = path.resolve("src", "data", "tareas.json");

// Lee tareas (crea el archivo si no existe)
function leerTareas() {
  try {
    if (!fs.existsSync(filePath)) {
      // Asegurar carpeta
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf8");
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("leerTareas error:", err);
    // Si el JSON está corrupto, sobrescribimos con array vacío para no bloquear
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf8");
    return [];
  }
}

function guardarTareas(tareas) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2), "utf8");
  } catch (err) {
    console.error("guardarTareas error:", err);
    throw err;
  }
}

// GET /api/tareas
export const listarTareas = (req, res) => {
  try {
    const tareas = leerTareas();
    return res.status(200).json(tareas);
  } catch (err) {
    return res.status(500).json({ error: "Error interno leyendo las tareas" });
  }
};

// GET /api/tareas/:id
export const obtenerTareaPorId = (req, res) => {
  try {
    const tareas = leerTareas();
    const { id } = req.params;
    const tarea = tareas.find((t) => String(t.id) === String(id));
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    return res.status(200).json(tarea);
  } catch (err) {
    return res.status(500).json({ error: "Error interno leyendo la tarea" });
  }
};

// POST /api/tareas
export const crearTarea = (req, res) => {
  try {
    const { description, status } = req.body;

    // Validaciones básicas
    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ error: "description es obligatorio y debe ser texto" });
    }
    const VALID_STATUSES = ["todo", "in-progress", "done"];
    const estado = status ? String(status) : "todo";
    if (!VALID_STATUSES.includes(estado)) {
      return res.status(400).json({ error: `status inválido. Valores permitidos: ${VALID_STATUSES.join(", ")}` });
    }

    const tareas = leerTareas();

    // Generación de id: usar timestamp + random para evitar colisiones
    const nuevaTarea = {
      id: String(Date.now()) + String(Math.floor(Math.random() * 1000)), // ej: "163...123"
      description: description.trim(),
      status: estado,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tareas.push(nuevaTarea);
    guardarTareas(tareas);

    return res.status(201).json({ message: "Tarea creada correctamente", tarea: nuevaTarea });
  } catch (err) {
    console.error("crearTarea error:", err);
    return res.status(500).json({ error: "Error interno creando la tarea" });
  }
};
