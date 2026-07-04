import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-primary p-2 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TaskFlow
            </span>
          </motion.div>

          {user && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-medium text-white">{user.username}</span>
                <span className="text-xs text-textMuted">{user.email}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={logout}
                className="p-2 text-textMuted hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
