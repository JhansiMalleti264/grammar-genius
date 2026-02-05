import { useState } from 'react';
import { Module } from '@/types/game';
import Dashboard from '@/components/Dashboard';
import GameContainer from '@/components/GameContainer';

const Index = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
  };

  const handleCloseGame = () => {
    setSelectedModule(null);
  };

  if (selectedModule) {
    return (
      <GameContainer
        module={selectedModule}
        onClose={handleCloseGame}
      />
    );
  }

  return <Dashboard onModuleSelect={handleModuleSelect} />;
};

export default Index;
