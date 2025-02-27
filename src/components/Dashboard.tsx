import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Zap, Trophy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 78 },
  { day: 'Wed', score: 92 },
  { day: 'Thu', score: 88 },
  { day: 'Fri', score: 95 },
  { day: 'Sat', score: 89 },
  { day: 'Sun', score: 91 },
];

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-7xl mx-auto px-4 pt-8 pb-24 md:pt-20"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Healthverse</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Brain, title: 'Cognitive Score', value: '92/100' },
          { icon: Target, title: 'Focus Time', value: '2.5 hrs' },
          { icon: Zap, title: 'Reaction Time', value: '245ms' },
          { icon: Trophy, title: 'Games Played', value: '12' },
        ].map(({ icon: Icon, title, value }) => (
          <motion.div
            key={title}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <Icon className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={{ fill: '#4f46e5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;