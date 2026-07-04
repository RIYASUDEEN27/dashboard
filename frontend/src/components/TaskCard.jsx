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
        <h3 className={`text-lg font-semibold truncate ${task.completed ? 'line-through text-textMuted' : 'text-white'}`}>
          {task.title}
        </h3>
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
