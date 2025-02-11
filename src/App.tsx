import { useState, useCallback } from 'react';
import { Timer } from './components/Timer';
import { GameState, SUBJECTS, LETTERS, TIME_OPTIONS } from './types';
import { PlayIcon, StopIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    subject: SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)],
    letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
    isPlaying: false,
    timeRemaining: TIME_OPTIONS[0].value,
    selectedTime: TIME_OPTIONS[0].value,
    score: 0,
    showSummary: false,
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      timeRemaining: prev.selectedTime,
      score: 0,
      showSummary: false,
    }));
  }, []);

  const stopGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      showSummary: true,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      showSummary: false,
      timeRemaining: prev.selectedTime,
      subject: SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)],
      letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
      score: 0,
    }));
  }, []);

  const newSet = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      subject: SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)],
      letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
    }));
  }, []);

  const updateTime = useCallback((newTime: number) => {
    setGameState(prev => ({
      ...prev,
      timeRemaining: newTime,
    }));
  }, []);

  const handleTimeSelect = useCallback((time: number) => {
    setGameState(prev => ({
      ...prev,
      selectedTime: time,
      timeRemaining: time,
    }));
  }, []);

  const incrementScore = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + 1,
    }));
  }, []);

  if (gameState.showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4">
        <div className="max-w-md mx-auto space-y-8 pt-8">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm text-center space-y-6">
            <p className="text-7xl font-bold">{gameState.score}</p>
            <p className="text-3xl">
              {gameState.subject.toLowerCase()} that start with '{gameState.letter}'
            </p>
            <button
              onClick={resetGame}
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className="w-6 h-6" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4">
      <div className="max-w-md mx-auto space-y-8 pt-8">
        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
          {gameState.isPlaying ? (
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Shout out as many</h2>
                  <button
                    onClick={incrementScore}
                    className="w-full text-6xl font-bold bg-white/20 py-6 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {gameState.subject}
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">that start with</h2>
                  <button
                    onClick={incrementScore}
                    className="w-full text-6xl font-bold bg-white/20 py-6 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {gameState.letter}
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-8">
                  <div>
                    <Timer
                      timeRemaining={gameState.timeRemaining}
                      isPlaying={gameState.isPlaying}
                      onTimeUpdate={updateTime}
                      onTimeUp={stopGame}
                    />
                  </div>
                  <div>
                    <div className="text-6xl font-bold bg-white/20 py-4 px-8 rounded-lg">
                      {gameState.score}
                    </div>
                    <div className="text-sm mt-1 opacity-75">Score</div>
                  </div>
                </div>
              </div>

              <button
                onClick={stopGame}
                className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <StopIcon className="w-6 h-6" />
                Stop Game
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Shout out as many</h2>
                  <p className="text-6xl font-bold bg-white/20 py-6 rounded-lg">{gameState.subject}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">that start with</h2>
                  <p className="text-6xl font-bold bg-white/20 py-6 rounded-lg">{gameState.letter}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">in</h2>
                <div className="flex gap-2 justify-center">
                  {TIME_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleTimeSelect(option.value)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        gameState.selectedTime === option.value
                          ? 'bg-white text-purple-600'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={newSet}
                  className="bg-white/20 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ArrowPathIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 bg-white text-purple-600 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <PlayIcon className="w-6 h-6" />
                  Start Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;