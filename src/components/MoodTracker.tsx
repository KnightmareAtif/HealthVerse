import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockMoodData = [
  { date: '03/01', mood: 8 },
  { date: '03/02', mood: 6 },
  { date: '03/03', mood: 7 },
  { date: '03/04', mood: 9 },
  { date: '03/05', mood: 7 },
  { date: '03/06', mood: 8 },
  { date: '03/07', mood: 8 },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState('');

  const moods = [
    { icon: Smile, value: 9, label: 'Great' },
    { icon: Meh, value: 6, label: 'Okay' },
    { icon: Frown, value: 3, label: 'Not Good' },
  ];

  const activities = [
    { icon: Sun, label: 'Exercise' },
    { icon: Cloud, label: 'Meditation' },
    { icon: CloudRain, label: 'Reading' },
    { icon: Moon, label: 'Sleep' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto px-4 pt-8 pb-24 md:pt-20"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mood Tracker</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {moods.map(({ icon: Icon, value, label }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedMood(value)}
              className={`p-4 rounded-lg flex flex-col items-center ${
                selectedMood === value ? 'bg-indigo-100 border-2 border-indigo-600' : 'bg-gray-50'
              }`}
            >
              <Icon className="w-8 h-8 mb-2" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Activities</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {activities.map(({ icon: Icon, label }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              className="p-3 bg-gray-50 rounded-lg flex flex-col items-center"
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-sm">{label}</span>
            </motion.button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Journal Entry</h3>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg resize-none"
          placeholder="Write about your day..."
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Mood History</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMoodData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="mood" 
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

export default MoodTracker;