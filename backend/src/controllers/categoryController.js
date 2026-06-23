const { pool } = require('../config/db');

// ─────────────────────────────────────────────────────────────
// GET /api/categorias — Obtener TODAS las categorías del usuario
// ─────────────────────────────────────────────────────────────
const obtenerCategorias = async (req, res) => {
  try {
    const user_id = req.user.id;

    const resultado = await pool.query(
      `SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );

    res.json({
      success: true,
      cantidad: resultado.rows.length,
      data: resultado.rows
    });

  } catch (error) {
    console.error('Error en obtenerCategorias:', error);
    res.status(500).json({ success: false, message: 'Error al obtener las categorías' });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/categorias/:id — Obtener una categoría por ID
// ─────────────────────────────────────────────────────────────
const obtenerCategoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const resultado = await pool.query(
      `SELECT * FROM categories WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró la categoría o no tienes permiso'
      });
    }

    res.json({ success: true, data: resultado.rows[0] });

  } catch (error) {
    console.error('Error en obtenerCategoriaPorId:', error);
    res.status(500).json({ success: false, message: 'Error al obtener la categoría' });
  }
};

// ─────────────────────────────────────────────────────────────
// POST /api/categorias — Crear una nueva categoría
// ─────────────────────────────────────────────────────────────
const crearCategoria = async (req, res) => {
  try {
    const { nombre, description, color } = req.body;
    const user_id = req.user.id;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es obligatorio'
      });
    }

    // Verifica que no exista una categoría con el mismo nombre para este usuario
    const existe = await pool.query(
      `SELECT id FROM categories WHERE nombre = $1 AND user_id = $2`,
      [nombre.trim(), user_id]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una categoría con ese nombre'
      });
    }

    const resultado = await pool.query(
      `INSERT INTO categories (nombre, description, color, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        nombre.trim(),
        description || null,
        color || '#6366f1',
        user_id
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error en crearCategoria:', error);
    res.status(500).json({ success: false, message: 'Error al crear la categoría' });
  }
};

// ─────────────────────────────────────────────────────────────
// PUT /api/categorias/:id — Actualiza una categoría existente
// ─────────────────────────────────────────────────────────────
const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, description, color } = req.body;
    const user_id = req.user.id;

    if (nombre !== undefined && nombre.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría no puede estar vacío'
      });
    }

    // Verifica que la categoría existe y pertenece al usuario
    const categoriaExiste = await pool.query(
      `SELECT id FROM categories WHERE id = $1 AND user_id = $2`,
      [id, user_id]
    );

    if (categoriaExiste.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró la categoría o no tienes permiso'
      });
    }

    const resultado = await pool.query(
      `UPDATE categories SET
        nombre      = COALESCE($1, nombre),
        description = COALESCE($2, description),
        color       = COALESCE($3, color),
        updated_at  = CURRENT_TIMESTAMP
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [
        nombre !== undefined ? nombre.trim() : null,
        description !== undefined ? description : null,
        color !== undefined ? color : null,
        id,
        user_id
      ]
    );

    res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: resultado.rows[0]
    });

  } catch (error) {
    console.error('Error en actualizarCategoria:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la categoría' });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/categorias/:id — Elimina una categoría
// ─────────────────────────────────────────────────────────────
const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const resultado = await pool.query(
      `DELETE FROM categories WHERE id = $1 AND user_id = $2 RETURNING id, nombre`,
      [id, user_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró la categoría o no tienes permiso'
      });
    }

    res.json({
      success: true,
      message: `Categoría "${resultado.rows[0].nombre}" eliminada exitosamente`
    });

  } catch (error) {
    console.error('Error en eliminarCategoria:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};