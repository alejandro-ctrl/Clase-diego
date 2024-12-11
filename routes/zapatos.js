const express = require("express");
const router = express.Router();
const Zapato = require("../models/zapato");

// Crear un zapato
router.post("/", async (req, res) => {
  try {
    const nuevoZapato = new Zapato(req.body);
    const zapatoGuardado = await nuevoZapato.save();
    res.status(201).json(zapatoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los zapatos
router.get("/", async (req, res) => {
  try {
    const zapatos = await Zapato.find();
    res.status(200).json(zapatos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un zapato por ID
router.get("/:id", async (req, res) => {
  try {
    const zapato = await Zapato.findById(req.params.id);
    if (!zapato) return res.status(404).json({ error: "Zapato no encontrado" });
    res.status(200).json(zapato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un zapato
router.put("/:id", async (req, res) => {
  try {
    const zapatoActualizado = await Zapato.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!zapatoActualizado)
      return res.status(404).json({ error: "Zapato no encontrado" });
    res.status(200).json(zapatoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un zapato
router.delete("/:id", async (req, res) => {
  try {
    const zapatoEliminado = await Zapato.findByIdAndDelete(req.params.id);
    if (!zapatoEliminado)
      return res.status(404).json({ error: "Zapato no encontrado" });
    res.status(200).json({ message: "Zapato eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
