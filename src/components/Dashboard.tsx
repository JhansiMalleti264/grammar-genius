import { useState, useMemo } from 'react';
import { Module, Category } from '@/types/game';
import { modules } from '@/data/modules';
import HeroSection from './HeroSection';
import CategoryTabs from './CategoryTabs';
import ModuleCard from './ModuleCard';
import { Search, Bell, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DashboardProps {
  onModuleSelect: (module: Module) => void;
}

const Dashboard = ({ onModuleSelect }: DashboardProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const streak = 12;
  
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesCategory = activeCategory === 'all' || module.category === activeCategory;
      const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);
  
  const categoryCounts = useMemo(() => {
    return {
      all: modules.length,
      reading: modules.filter(m => m.category === 'reading').length,
      writing: modules.filter(m => m.category === 'writing').length,
      speaking: modules.filter(m => m.category === 'speaking').length,
      listening: modules.filter(m => m.category === 'listening').length,
    };
  }, []);
  
  const handleStartPractice = () => {
    if (filteredModules.length > 0) {
      onModuleSelect(filteredModules[0]);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Grammar AI</h1>
              <p className="text-muted-foreground text-sm hidden sm:block">
                Master English with smart practice
              </p>
            </div>
          </div>
          <button className="p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
        </header>
        
        {/* Hero Section */}
        <section className="mb-10">
          <HeroSection streak={streak} onStartPractice={handleStartPractice} />
        </section>
        
        {/* Modules Section */}
        <section id="modules-section">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="animate-slide-up animate-delay-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-5 bg-gradient-primary rounded-full" />
                <h2 className="text-lg md:text-xl font-bold text-foreground">Training Modules</h2>
                <span className="text-sm text-muted-foreground">({filteredModules.length})</span>
              </div>
              <p className="text-muted-foreground text-sm pl-3">
                Select a skill to practice and improve
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-80 animate-slide-up animate-delay-200">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-5 rounded-xl bg-card border-border"
              />
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="mb-6 animate-slide-up animate-delay-200">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              counts={categoryCounts}
            />
          </div>
          
          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                onClick={() => onModuleSelect(module)}
              />
            ))}
          </div>
          
          {filteredModules.length === 0 && (
            <div className="text-center py-16 animate-slide-up">
              <p className="text-muted-foreground mb-2">No modules found</p>
              <p className="text-sm text-muted-foreground">Try a different search or category</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
