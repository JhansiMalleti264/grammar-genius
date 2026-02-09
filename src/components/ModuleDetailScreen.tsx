import { Module, Level, levelLabels } from '@/types/game';
import { ArrowLeft, Lock, CheckCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ModuleDetailScreenProps {
  module: Module;
  onBack: () => void;
  onSelectLevel: (level: Level) => void;
}

const categoryColors: Record<string, { gradient: string; accent: string }> = {
  speaking: { gradient: 'from-accent/10 to-accent/5', accent: 'text-accent' },
  writing: { gradient: 'from-secondary/10 to-secondary/5', accent: 'text-secondary' },
  reading: { gradient: 'from-primary/10 to-primary/5', accent: 'text-primary' },
  listening: { gradient: 'from-listening/10 to-listening/5', accent: 'text-listening' },
};

const ModuleDetailScreen = ({ module, onBack, onSelectLevel }: ModuleDetailScreenProps) => {
  const colors = categoryColors[module.category];
  const totalExercises = module.levels.reduce((sum, l) => sum + l.exercises, 0);
  const totalCompleted = module.levels.reduce((sum, l) => sum + l.completed, 0);
  const overallProgress = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;

  // Determine which level is the current active one
  const currentLevel: Level = module.levels.find(l => l.completed < l.exercises)?.level ?? 3;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Modules</span>
        </button>

        {/* Module Header */}
        <div className={cn(
          'rounded-2xl border border-border p-6 md:p-8 mb-8 bg-gradient-to-br animate-slide-up',
          colors.gradient
        )}>
          <span className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-card/80 border border-border/50 mb-4',
            colors.accent
          )}>
            {module.category}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
            {module.title}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {module.description}
          </p>

          {/* Overall progress */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="progress-bar h-2">
                <div
                  className="progress-fill"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-semibold text-foreground tabular-nums">
              {overallProgress}%
            </span>
          </div>
        </div>

        {/* Level Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-2">Choose a Level</h2>

          {module.levels.map((lvl, i) => {
            const isUnlocked = lvl.level <= currentLevel;
            const isCompleted = lvl.completed >= lvl.exercises;
            const progress = lvl.exercises > 0 ? Math.round((lvl.completed / lvl.exercises) * 100) : 0;

            return (
              <button
                key={lvl.level}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelectLevel(lvl.level)}
                className={cn(
                  'w-full bg-card rounded-2xl border border-border p-5 text-left transition-all duration-300 animate-slide-up',
                  isUnlocked
                    ? 'hover:shadow-card-hover hover:-translate-y-0.5 hover:border-primary/20 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                )}
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Level indicator */}
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                    isCompleted
                      ? 'bg-success/10'
                      : isUnlocked
                        ? 'bg-primary/10'
                        : 'bg-muted'
                  )}>
                    {!isUnlocked ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <Play className="h-5 w-5 text-primary fill-primary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">
                        Level {lvl.level}: {levelLabels[lvl.level]}
                      </h3>
                      {isUnlocked && (
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {lvl.completed}/{lvl.exercises}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {lvl.title}
                    </p>

                    {isUnlocked && (
                      <div className="progress-bar h-1.5">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailScreen;
