const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require('../controllers/categoryController');

// Todas las rutas de categorías requieren autenticación
router.use(authMiddleware);

router.route('/')
  .get(obtenerCategorias)
  .post(crearCategoria);

router.route('/:id')
  .get(obtenerCategoriaPorId)
  .put(actualizarCategoria)
  .delete(eliminarCategoria);

module.exports = router;