import Badge from '../ui/Badge';
import { translateStatus, translatePriority, getStatusStyles, getPriorityStyles, formatDate } from '../../utils/formatters';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-[var(--bg-primary)]/40 border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 p-4 rounded-lg transition-all group flex flex-col h-full shadow-sm hover:shadow-cyber-cyan/10">
      <div className="flex justify-between items-start mb-2 h-14">
        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2 overflow-hidden">
          {task.title}
        </h3>
        <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0 ml-2">ID: #{task.id}</span>
      </div>
      
      <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 overflow-hidden flex-grow">
        {task.description || 'Sin descripción'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className={getStatusStyles(task.status)}>
          {translateStatus(task.status)}
        </Badge>
        <Badge className={getPriorityStyles(task.priority)}>
          {translatePriority(task.priority)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-tighter mb-4">
        <div>
          <span className="block text-[var(--text-muted)] opacity-70">Usuario</span>
          <span className="text-[var(--text-secondary)]">USR_{task.user_id?.toString().padStart(3, '0')}</span>
        </div>
        <div>
          <span className="block text-[var(--text-muted)] opacity-70">Vencimiento</span>
          <span className="text-[var(--text-secondary)]">{formatDate(task.due_date)}</span>
        </div>
        {task.categoria_nombre && (
          <div className="col-span-2">
            <span className="block text-[var(--text-muted)] opacity-70">Categoría</span>
            <span className="flex items-center gap-1 mt-0.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: task.categoria_color || '#6366f1' }}
              />
              <span className="text-[var(--text-secondary)]">{task.categoria_nombre}</span>
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
        <button 
          onClick={() => onEdit(task)}
          className="text-[10px] font-bold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors uppercase tracking-widest px-2 py-1"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-[10px] font-bold text-[var(--accent-secondary)] hover:opacity-80 transition-colors uppercase tracking-widest px-2 py-1"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;