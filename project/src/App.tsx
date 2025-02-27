import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import Games from './components/Games';
import Chatbot from './components/Chatbot';
import Meditation from './components/Meditation';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/app/*"
            element={
              <>
                <Navbar />
                <div className="pt-16 pb-20">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="mood" element={<MoodTracker />} />
                      <Route path="games" element={<Games />} />
                      <Route path="meditation" element={<Meditation />} />
                      <Route path="chat" element={<Chatbot />} />
                      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                    </Routes>
                  </AnimatePresence>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;