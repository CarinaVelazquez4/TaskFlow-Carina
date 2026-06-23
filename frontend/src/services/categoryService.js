import axiosClient from '../api/axiosClient';

// Servicio para gestionar las peticiones relacionadas con las categorías
const categoriaService = {

  // Obtener todas las categorías del usuario
  obtenerCategorias: async () => {
    const response = await axiosClient.get('/categorias');
    return response.data.data || [];
  },

  // Obtener una categoría por su ID
  obtenerCategoriaPorId: async (id) => {
    const response = await axiosClient.get(`/categorias/${id}`);
    return response.data.data;
  },

  // Crear una nueva categoría
  crearCategoria: async (datos) => {
    const response = await axiosClient.post('/categorias', datos);
    return response.data.data;
  },

  // Actualizar una categoría existente
  actualizarCategoria: async (id, datos) => {
    const response = await axiosClient.put(`/categorias/${id}`, datos);
    return response.data.data;
  },

  // Eliminar una categoría
  eliminarCategoria: async (id) => {
    const response = await axiosClient.delete(`/categorias/${id}`);
    return response.data;
  }
};

export default categoriaService;