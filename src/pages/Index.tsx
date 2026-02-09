import { useState } from 'react';
import { Module, Level } from '@/types/game';
import Dashboard from '@/components/Dashboard';
import GameContainer from '@/components/GameContainer';

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level>(1);

  const handleModuleSelect = (module: Module, level: Level) => {
    setSelectedModule(module);
    setSelectedLevel(level);
  };

  const handleCloseGame = () => {
    setSelectedModule(null);
  };

  if (selectedModule) {
    return (
      <GameContainer
        module={selectedModule}
        level={selectedLevel}
        onClose={handleCloseGame}
      />
    );
  }

  return <Dashboard onModuleSelect={handleModuleSelect} />;
};

export default Index;
