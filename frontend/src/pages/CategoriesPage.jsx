import { useState, useEffect } from 'react';
import categoriaService from '../services/categoryService';

export default function CategoriesPage() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [formulario, setFormulario] = useState({ nombre: '', description: '', color: '#6366f1' });
  const [mensaje, setMensaje] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      const datos = await categoriaService.obtenerCategorias();
      setCategorias(datos);
    } catch (err) {
      setError('Error al cargar las categorías');
    } finally {
      setCargando(false);
    }
  };

  const mostrarMensaje = (texto, tipo = 'exito') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  const abrirFormularioNuevo = () => {
    setFormulario({ nombre: '', description: '', color: '#6366f1' });
    setCategoriaEditando(null);
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (categoria) => {
    setFormulario({
      nombre: categoria.nombre,
      description: categoria.description || '',
      color: categoria.color || '#6366f1'
    });
    setCategoriaEditando(categoria);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setCategoriaEditando(null);
    setFormulario({ nombre: '', description: '', color: '#6366f1' });
  };

  const handleCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    if (!formulario.nombre.trim()) {
      mostrarMensaje('El nombre es obligatorio', 'error');
      return;
    }
    try {
      setGuardando(true);
      if (categoriaEditando) {
        await categoriaService.actualizarCategoria(categoriaEditando.id, formulario);
        mostrarMensaje('Categoría actualizada exitosamente');
      } else {
        await categoriaService.crearCategoria(formulario);
        mostrarMensaje('Categoría creada exitosamente');
      }
      cerrarFormulario();
      cargarCategorias();
    } catch (err) {
      mostrarMensaje(err.message || 'Error al guardar la categoría', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminar = (categoria) => {
    setCategoriaAEliminar(categoria);
  };

  const cancelarEliminar = () => {
    setCategoriaAEliminar(null);
  };

  const handleEliminar = async () => {
    try {
      await categoriaService.eliminarCategoria(categoriaAEliminar.id);
      mostrarMensaje('Categoría eliminada exitosamente');
      setCategoriaAEliminar(null);
      cargarCategorias();
    } catch (err) {
      mostrarMensaje('Error al eliminar la categoría', 'error');
      setCategoriaAEliminar(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Modal de confirmación de eliminación */}
      {categoriaAEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-5">
              <div className="text-5xl mb-3">🗑️</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                ¿Eliminar categoría?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estás a punto de eliminar la categoría
              </p>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                "{categoriaAEliminar.nombre}"
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelarEliminar}
                className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium text-sm transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Categorías</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Administra las categorías de tus tareas</p>
        </div>
        <button
          onClick={abrirFormularioNuevo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Nueva Categoría
        </button>
      </div>

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
          mensaje.tipo === 'exito'
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {mensaje.texto}
        </div>
      )}

      {/* Formulario */}
      {mostrarFormulario && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleCambio}
                placeholder="Ej: Trabajo, Personal, Estudio..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Descripción
              </label>
              <textarea
                name="description"
                value={formulario.description}
                onChange={handleCambio}
                placeholder="Descripción opcional de la categoría..."
                rows={3}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="color"
                  value={formulario.color}
                  onChange={handleCambio}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-300"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">{formulario.color}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg font-medium text-sm transition"
            >
              {guardando ? 'Guardando...' : categoriaEditando ? 'Actualizar' : 'Crear Categoría'}
            </button>
            <button
              onClick={cerrarFormulario}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-5 py-2 rounded-lg font-medium text-sm transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabla de categorías */}
      {cargando ? (
        <div className="text-center py-10 text-gray-500">Cargando categorías...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : categorias.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🗂️</p>
          <p className="text-lg font-medium">No tienes categorías aún</p>
          <p className="text-sm mt-1">Crea tu primera categoría con el botón de arriba</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Descripción</th>
                <th className="px-4 py-3 text-left">Fecha de creación</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {categorias.map((categoria) => (
                <tr key={categoria.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                  <td className="px-4 py-3">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: categoria.color || '#6366f1' }}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{categoria.nombre}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {categoria.description || <span className="italic text-gray-300">Sin descripción</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {new Date(categoria.created_at).toLocaleDateString('es-PY', {
                      day: '2-digit', month: '2-digit', year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => abrirFormularioEditar(categoria)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmarEliminar(categoria)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}