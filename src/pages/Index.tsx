import { useState } from 'react';
import { Module, Level } from '@/types/game';
import Dashboard from '@/components/Dashboard';
import ModuleDetailScreen from '@/components/ModuleDetailScreen';
import GameContainer from '@/components/GameContainer';

type AppView = 'dashboard' | 'module-detail' | 'game';

const Index = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level>(1);

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setView('module-detail');
  };

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setView('game');
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setView('dashboard');
  };

  const handleBackToDetail = () => {
    setView('module-detail');
  };

  if (view === 'game' && selectedModule) {
    return (
      <GameContainer
        module={selectedModule}
        level={selectedLevel}
        onClose={handleBackToDetail}
      />
    );
  }

  if (view === 'module-detail' && selectedModule) {
    return (
      <ModuleDetailScreen
        module={selectedModule}
        onBack={handleBackToModules}
        onSelectLevel={handleLevelSelect}
      />
    );
  }

  return <Dashboard onModuleSelect={handleModuleSelect} />;
};

export default Index;
