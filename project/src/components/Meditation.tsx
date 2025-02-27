import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const Meditation = () => {
  const [duration, setDuration] = useState(10); // Default 10 minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [breathePhase, setBreathePhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [breatheCount, setBreatheCount] = useState(0);
  
  const circleRef = useRef<SVGCircleElement>(null);
  const circumference = 2 * Math.PI * 120; // Circle radius is 120
  
  // Background sounds - using more reliable sources
  const ambientSounds = [
    { name: 'Rain', url: 'https://soundbible.com/mp3/rain_thunder-Mike_Koenig-739472561.mp3' },
    { name: 'Forest', url: 'https://soundbible.com/mp3/meadow-birds-nature-sounds-7802.mp3' },
    { name: 'Ocean', url: 'https://soundbible.com/mp3/Ocean_Waves-Mike_Koenig-980635569.mp3' },
  ];
  
  const [selectedSound, setSelectedSound] = useState(ambientSounds[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio with HTML audio element instead of Audio constructor
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Create a new audio element and add it to the DOM
    const audio = document.createElement('audio');
    audio.src = selectedSound.url;
    audio.loop = true;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedSound]);
  
  // Handle sound toggle
  useEffect(() => {
    if (audioRef.current) {
      if (soundOn && isRunning) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.error("Audio play failed:", e);
            // Fallback: disable sound if it fails to play
            setSoundOn(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundOn, isRunning, selectedSound]);
  
  // Timer effect
  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Use a more reliable completion sound
      const completionSound = new Audio('https://soundbible.com/mp3/service-bell_daniel_simion.mp3');
      completionSound.play().catch(e => console.error("Completion sound failed:", e));
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);
  
  // Breathing animation
  useEffect(() => {
    let breatheInterval: number;
    
    if (isRunning) {
      // Breathing cycle: 4s inhale, 4s hold, 6s exhale
      breatheInterval = setInterval(() => {
        setBreathePhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          setBreatheCount(count => count + 1);
          return 'inhale';
        });
      }, breathePhase === 'exhale' ? 6000 : 4000);
    }
    
    return () => clearInterval(breatheInterval);
  }, [isRunning, breathePhase]);
  
  // Progress circle animation
  useEffect(() => {
    if (circleRef.current) {
      const percent = timeLeft / (duration * 60);
      const offset = circumference - percent * circumference;
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [timeLeft, duration, circumference]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleDurationChange = (mins: number) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setBreathePhase('inhale');
    setBreatheCount(0);
  };
  
  const handleSoundChange = (sound: typeof selectedSound) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedSound(sound);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto px-4 pt-8 pb-24 md:pt-20"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meditation</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex flex-col items-center">
          {/* Timer Circle */}
          <div className="relative w-64 h-64 mb-8">
            <svg className="w-full h-full" viewBox="0 0 256 256">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                ref={circleRef}
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset="0"
                transform="rotate(-90 128 128)"
              />
              
              {/* Breathing animation */}
              <motion.circle
                cx="128"
                cy="128"
                r={breathePhase === 'inhale' ? 40 : breathePhase === 'hold' ? 60 : 30}
                fill="#4f46e5"
                fillOpacity="0.2"
                initial={false}
                animate={{
                  r: breathePhase === 'inhale' ? 60 : breathePhase === 'hold' ? 60 : 40,
                }}
                transition={{
                  duration: breathePhase === 'exhale' ? 6 : 4,
                  ease: "easeInOut"
                }}
              />
              
              {/* Timer text */}
              <text
                x="128"
                y="128"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="32"
                fontWeight="bold"
                fill="#1f2937"
              >
                {formatTime(timeLeft)}
              </text>
              
              {/* Breathing instruction */}
              <text
                x="128"
                y="160"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fill="#6b7280"
              >
                {breathePhase.toUpperCase()}
              </text>
              
              {/* Breath count */}
              <text
                x="128"
                y="180"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#9ca3af"
              >
                {breatheCount} cycles
              </text>
            </svg>
          </div>
          
          {/* Duration selector */}
          <div className="flex gap-3 mb-8">
            {[5, 10, 15, 20, 30].map(mins => (
              <button
                key={mins}
                onClick={() => handleDurationChange(mins)}
                className={`px-4 py-2 rounded-lg ${
                  duration === mins
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
                disabled={isRunning}
              >
                {mins} min
              </button>
            ))}
          </div>
          
          {/* Sound selector */}
          <div className="flex gap-3 mb-8">
            {ambientSounds.map(sound => (
              <button
                key={sound.name}
                onClick={() => handleSoundChange(sound)}
                className={`px-4 py-2 rounded-lg ${
                  selectedSound.name === sound.name
                    ? 'bg-indigo-100 border border-indigo-600 text-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {sound.name}
              </button>
            ))}
            
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={toggleTimer}
              className="p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Meditation guidance */}
        <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Meditation Guide</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Find a comfortable position and close your eyes</li>
            <li>Follow the breathing animation: inhale (4s), hold (4s), exhale (6s)</li>
            <li>Focus on your breath and let go of any distracting thoughts</li>
            <li>If your mind wanders, gently bring your attention back to your breath</li>
            <li>Continue until the timer completes</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Meditation;