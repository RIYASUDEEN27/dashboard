import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-panel p-5 rounded-xl flex items-start gap-4 transition-all duration-300 ${
        task.completed ? 'opacity-60 grayscale-[50%]' : ''
      }`}
    >
      <button 
        onClick={() => onToggle(task)}
        className="mt-1 text-primary hover:text-primaryHover transition-colors focus:outline-none"
      >
        {task.completed ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6 text-slate-400 hover:text-primary" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className={`text-lg font-semibold truncate ${task.completed ? 'line-through text-textMuted' : 'text-white'}`}>
            {task.title}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase border tracking-wider select-none ${
            task.priority === 'high'
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              : task.priority === 'medium'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            {task.priority || 'medium'}
          </span>
        </div>
        {task.description && (
          <p className={`mt-1 text-sm ${task.completed ? 'line-through text-textMuted/70' : 'text-textMuted'} line-clamp-2`}>
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
          title="Edit Task"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
