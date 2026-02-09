import { Module } from '@/types/game';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  index: number;
  onSelect: (module: Module) => void;
}

const categoryColors: Record<string, { dot: string; text: string; bg: string }> = {
  speaking: { dot: 'bg-accent', text: 'text-accent', bg: 'bg-accent/8' },
  writing: { dot: 'bg-secondary', text: 'text-secondary', bg: 'bg-secondary/8' },
  reading: { dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/8' },
  listening: { dot: 'bg-listening', text: 'text-listening', bg: 'bg-listening/8' },
};

const ModuleCard = ({ module, index, onSelect }: ModuleCardProps) => {
  const colors = categoryColors[module.category];
  const totalExercises = module.levels.reduce((sum, l) => sum + l.exercises, 0);
  const totalCompleted = module.levels.reduce((sum, l) => sum + l.completed, 0);
  const overallProgress = totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0;

  return (
    <button
      onClick={() => onSelect(module)}
      className={cn(
        'group relative bg-card rounded-2xl border border-border p-5 text-left w-full',
        'transition-all duration-300 ease-out',
        'hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20',
        'animate-slide-up'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Category badge + progress text */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider',
          colors.bg, colors.text
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} />
          {module.category}
        </span>
        {overallProgress > 0 && (
          <span className="text-xs text-muted-foreground font-medium">
            {overallProgress}%
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">
        {module.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
        {module.description}
      </p>

      {/* Single Progress Bar */}
      <div className="mb-4">
        <div className="progress-bar h-1.5">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {totalExercises} exercises · 3 levels
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          {overallProgress > 0 ? 'Continue' : 'Start'}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
};

export default ModuleCard;
