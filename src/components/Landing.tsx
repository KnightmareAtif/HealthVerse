import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Heart, Sparkles, Shield } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'Cognitive Training',
      description: 'Enhance your mental fitness with engaging brain games and exercises'
    },
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Monitor and understand your emotional well-being over time'
    },
    {
      icon: Sparkles,
      title: 'AI Assistant',
      description: 'Get personalized support and guidance from our wellness chatbot'
    },
    {
      icon: Shield,
      title: 'Daily Wellness',
      description: 'Build healthy habits and track your progress with detailed insights'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative h-screen flex items-center justify-center text-center px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10" />
        
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Welcome to Healthverse
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Your personal space for mental wellness and cognitive fitness
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/app/dashboard"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-indigo-600 text-white py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of users who have already improved their mental well-being
          </p>
          <Link
            to="/app/dashboard"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Begin Your Journey
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;