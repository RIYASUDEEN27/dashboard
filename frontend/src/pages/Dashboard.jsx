import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (taskData) => {
    try {
      if (taskToEdit) {
        const res = await api.put(`/tasks/${taskToEdit.id}`, taskData);
        setTasks(tasks.map(t => t.id === taskToEdit.id ? res.data : t));
        toast.success('Task updated');
      } else {
        const res = await api.post('/tasks', taskData);
        setTasks([...tasks, res.data]);
        toast.success('Task created');
      }
      closeModal();
    } catch (error) {
      toast.error('Failed to save task');
    }
  };

  const handleToggle = async (task) => {
    try {
      const res = await api.put(`/tasks/${task.id}`, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? res.data : t));
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const openModalForNew = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setTaskToEdit(null), 200); // Clear after animation
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-textMuted">
            You have {activeTasks.length} pending task{activeTasks.length !== 1 ? 's' : ''} today
          </p>
        </div>
        <button
          onClick={openModalForNew}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 glass-panel rounded-2xl"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">No tasks yet</h2>
          <p className="text-textMuted mb-6">Create your first task to get started.</p>
          <button onClick={openModalForNew} className="btn-primary">
            Create Task
          </button>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-4">
            {activeTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onEdit={openModalForEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-medium text-slate-400 mb-4 flex items-center gap-2">
                <span>Completed</span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded-full">{completedTasks.length}</span>
              </h2>
              <div className="space-y-4">
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onEdit={openModalForEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleCreateOrUpdate}
        task={taskToEdit}
      />
    </div>
  );
};

export default Dashboard;
