import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Timer, Play, RotateCcw, Award } from 'lucide-react';

const Games = () => {
  const [activeGame, setActiveGame] = useState<'reaction' | 'hanoi'>('reaction');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto px-4 pt-8 pb-24 md:pt-20"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Cognitive Games</h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveGame('reaction')}
          className={`px-4 py-2 rounded-lg ${
            activeGame === 'reaction'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Reaction Time
        </button>
        <button
          onClick={() => setActiveGame('hanoi')}
          className={`px-4 py-2 rounded-lg ${
            activeGame === 'hanoi'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Tower of Hanoi
        </button>
      </div>

      {activeGame === 'reaction' ? <ReactionGame /> : <TowerOfHanoi />}
    </motion.div>
  );
};

// Reaction Time Game Component
const ReactionGame = () => {
  const [gameState, setGameState] = useState('menu');
  const [reactionTime, setReactionTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const startReactionGame = () => {
    setGameState('waiting');
    const delay = 1000 + Math.random() * 4000;
    setTimeout(() => {
      setGameState('click');
      setStartTime(Date.now());
    }, delay);
  };

  const handleReactionClick = () => {
    if (gameState === 'click') {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setGameState('result');
    } else if (gameState === 'waiting') {
      setGameState('early');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-8 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">Reaction Time</h2>
      
      {gameState === 'menu' && (
        <div className="text-center">
          <p className="text-gray-600 mb-6">Test your reflexes! Click when the screen turns green.</p>
          <button
            onClick={() => startReactionGame()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      )}

      {(gameState === 'waiting' || gameState === 'click') && (
        <div
          onClick={handleReactionClick}
          className={`h-64 rounded-xl flex items-center justify-center cursor-pointer ${
            gameState === 'waiting' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          <p className="text-white text-xl font-semibold">
            {gameState === 'waiting' ? 'Wait for green...' : 'Click!'}
          </p>
        </div>
      )}

      {gameState === 'result' && (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Your reaction time: {reactionTime}ms
          </h3>
          <button
            onClick={() => startReactionGame()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {gameState === 'early' && (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Too early!</h3>
          <p className="text-gray-600 mb-4">Wait for the green color before clicking.</p>
          <button
            onClick={() => startReactionGame()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Tower of Hanoi Component
const TowerOfHanoi = () => {
  const [disks, setDisks] = useState(3);
  const [towers, setTowers] = useState<number[][]>([
    [3, 2, 1], // Tower 1 with 3 disks
    [], // Tower 2 (empty)
    [], // Tower 3 (empty)
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Reset the game
  const resetGame = () => {
    const initialTowers = [
      Array.from({ length: disks }, (_, i) => disks - i),
      [],
      []
    ];
    setTowers(initialTowers);
    setSelectedTower(null);
    setMoves(0);
    setGameWon(false);
  };

  // Initialize game when disk count changes
  useEffect(() => {
    resetGame();
  }, [disks]);

  // Check for win condition
  useEffect(() => {
    if (towers[2].length === disks) {
      setGameWon(true);
      if (bestScore === null || moves < bestScore) {
        setBestScore(moves);
      }
    }
  }, [towers, disks, moves, bestScore]);

  // Handle tower click
  const handleTowerClick = (towerIndex: number) => {
    if (gameWon) return;

    if (selectedTower === null) {
      // If no tower is selected and the clicked tower has disks, select it
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      // If a tower is already selected
      if (selectedTower === towerIndex) {
        // Clicking the same tower deselects it
        setSelectedTower(null);
      } else {
        // Try to move disk from selected tower to clicked tower
        const sourceTopDisk = towers[selectedTower][towers[selectedTower].length - 1];
        const targetTopDisk = towers[towerIndex][towers[towerIndex].length - 1];

        // Check if move is valid (smaller disk onto larger disk or empty tower)
        if (!targetTopDisk || sourceTopDisk < targetTopDisk) {
          // Create new towers state
          const newTowers = [...towers];
          const disk = newTowers[selectedTower].pop()!;
          newTowers[towerIndex].push(disk);
          
          setTowers(newTowers);
          setMoves(moves + 1);
        }
        
        // Deselect tower after move attempt
        setSelectedTower(null);
      }
    }
  };

  // Change disk count
  const changeDiskCount = (newCount: number) => {
    if (newCount >= 3 && newCount <= 7) {
      setDisks(newCount);
    }
  };

  // Get minimum possible moves
  const getMinMoves = () => Math.pow(2, disks) - 1;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-8 rounded-xl shadow-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tower of Hanoi</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <button
              onClick={() => changeDiskCount(disks - 1)}
              disabled={disks <= 3}
              className={`p-1 rounded ${disks <= 3 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              -
            </button>
            <span className="mx-2 text-gray-700">Disks: {disks}</span>
            <button
              onClick={() => changeDiskCount(disks + 1)}
              disabled={disks >= 7}
              className={`p-1 rounded ${disks >= 7 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              +
            </button>
          </div>
          <button
            onClick={resetGame}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {gameWon && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-green-700 font-semibold">
            Congratulations! You solved it in {moves} moves!
          </p>
          <p className="text-green-600 text-sm">
            (Minimum possible: {getMinMoves()} moves)
          </p>
          <button
            onClick={resetGame}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">Moves: {moves}</div>
        {bestScore !== null && (
          <div className="text-sm text-indigo-600">Best: {bestScore} moves</div>
        )}
      </div>

      <div className="flex justify-around items-end h-64 mb-6 border-b-2 border-gray-300">
        {towers.map((tower, towerIndex) => (
          <div
            key={towerIndex}
            onClick={() => handleTowerClick(towerIndex)}
            className={`relative flex flex-col-reverse items-center justify-end w-1/3 h-full cursor-pointer ${
              selectedTower === towerIndex ? 'bg-indigo-50' : ''
            }`}
          >
            {/* Tower rod */}
            <div className="absolute h-4/5 w-2 bg-gray-400 rounded-full" />
            
            {/* Disks */}
            {tower.map((diskSize, diskIndex) => {
              const width = 20 + diskSize * 15;
              return (
                <div
                  key={diskIndex}
                  className="relative z-10 rounded-md h-6 mb-1 flex items-center justify-center"
                  style={{
                    width: `${width}px`,
                    backgroundColor: `hsl(${(diskSize * 30) % 360}, 70%, 60%)`,
                  }}
                >
                  {diskSize}
                </div>
              );
            })}
            
            {/* Base */}
            <div className="w-24 h-3 bg-gray-400 rounded-md" />
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        <p className="mb-2"><strong>Goal:</strong> Move all disks from the first tower to the third tower.</p>
        <p className="mb-2"><strong>Rules:</strong></p>
        <ul className="list-disc pl-5">
          <li>Move only one disk at a time</li>
          <li>A larger disk cannot be placed on top of a smaller disk</li>
          <li>Try to complete the puzzle in the minimum number of moves: {getMinMoves()}</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Games;