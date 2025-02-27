import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './components/Landing';

const Dashboard = lazy(() => import('./components/Dashboard'));
const MoodTracker = lazy(() => import('./components/MoodTracker'));
const Games = lazy(() => import('./components/Games'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const Meditation = lazy(() => import('./components/Meditation'));

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
                      <Route
                        path="dashboard"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Dashboard />
                          </Suspense>
                        }
                      />
                      <Route
                        path="mood"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <MoodTracker />
                          </Suspense>
                        }
                      />
                      <Route
                        path="games"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Games />
                          </Suspense>
                        }
                      />
                      <Route
                        path="meditation"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Meditation />
                          </Suspense>
                        }
                      />
                      <Route
                        path="chat"
                        element={
                          <Suspense fallback={<div>Loading...</div>}>
                            <Chatbot />
                          </Suspense>
                        }
                      />
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