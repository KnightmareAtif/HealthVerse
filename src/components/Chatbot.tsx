import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot } from 'lucide-react';
import { HfInference } from '@huggingface/inference';

// Fix the process is not defined error by using import.meta.env instead
const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY || '');

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your mental wellness assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: `User: ${userMessage}\nAssistant: Let me help you with that. `,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.2,
        },
      });

      const botResponse = response.generated_text.split('Assistant: ')[1] || "I'm here to help!";
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I'm having trouble responding right now. Please try again later.", 
        isUser: false 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto px-4 pt-8 pb-24 md:pt-20 h-screen flex flex-col"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Wellness Assistant</h1>

      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                {!message.isUser && (
                  <Bot className="w-5 h-5 inline-block mr-2 text-indigo-600" />
                )}
                {message.text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Chatbot;