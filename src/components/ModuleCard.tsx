import { Module, Level, levelLabels } from '@/types/game';
import { ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ModuleCardProps {
  module: Module;
  index: number;
  onSelectLevel: (module: Module, level: Level) => void;
}

const categoryColors: Record<string, { dot: string; text: string; bg: string }> = {
  speaking: { dot: 'bg-accent', text: 'text-accent', bg: 'bg-accent/8' },
  writing: { dot: 'bg-secondary', text: 'text-secondary', bg: 'bg-secondary/8' },
  reading: { dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/8' },
  listening: { dot: 'bg-listening', text: 'text-listening', bg: 'bg-listening/8' },
};

const ModuleCard = ({ module, index, onSelectLevel }: ModuleCardProps) => {
  const colors = categoryColors[module.category];
  const totalExercises = module.levels.reduce((sum, l) => sum + l.exercises, 0);
  const totalCompleted = module.levels.reduce((sum, l) => sum + l.completed, 0);
  const overallProgress = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;

  // Determine current active level
  const currentLevel: Level = module.levels.find(l => l.completed < l.exercises)?.level ?? 3;

  return (
    <div
      className={cn(
        'group relative bg-card rounded-2xl border border-border p-5',
        'transition-all duration-300 ease-out',
        'hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20',
        'animate-slide-up'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider',
          colors.bg, colors.text
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} />
          {module.category}
        </span>
        <span className="text-xs text-muted-foreground font-medium">
          {overallProgress}% complete
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
        {module.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
        {module.description}
      </p>

      {/* Level Progress Steps */}
      <div className="space-y-2 mb-4">
        {module.levels.map((lvl) => {
          const isUnlocked = lvl.level <= currentLevel;
          const progress = lvl.exercises > 0 ? Math.round((lvl.completed / lvl.exercises) * 100) : 0;

          return (
            <button
              key={lvl.level}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelectLevel(module, lvl.level)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200',
                isUnlocked
                  ? 'hover:bg-muted/60 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              )}
            >
              {/* Level indicator */}
              <div className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0',
                progress === 100
                  ? 'bg-success/15 text-success'
                  : isUnlocked
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
              )}>
                {isUnlocked ? `L${lvl.level}` : <Lock className="h-3 w-3" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground truncate">
                    {levelLabels[lvl.level]}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-2">
                    {lvl.completed}/{lvl.exercises}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-primary transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Start/Continue Button */}
      <Button
        onClick={() => onSelectLevel(module, currentLevel)}
        variant="outline"
        className="w-full rounded-xl py-2.5 text-sm font-medium border-primary/20 text-primary hover:bg-primary/5 group-hover:border-primary/40 transition-all"
      >
        {overallProgress > 0 ? 'Continue' : 'Start'}
        <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
};

export default ModuleCard;
