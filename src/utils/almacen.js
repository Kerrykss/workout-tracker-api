// src/utils/almacen.js
import fs from "fs/promises";
import path from "path";

const FILE = path.join(process.cwd(), "src", "data", "tareas.json");

async function asegurarArchivo() {
  try {
    await fs.access(FILE);
  } catch (err) {
    // Si no existe lo creamos con un array vacío
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, "[]", "utf8");
  }
}

export async function leerTareas() {
  await asegurarArchivo();
  try {
    const texto = await fs.readFile(FILE, "utf8");
    return JSON.parse(texto || "[]");
  } catch (err) {
    // Si el JSON está corrupto, lo reescribimos vacío para no bloquear
    await fs.writeFile(FILE, "[]", "utf8");
    return [];
  }
}

export async function escribirTareas(tareas) {
  await asegurarArchivo();
  await fs.writeFile(FILE, JSON.stringify(tareas, null, 2), "utf8");
}
