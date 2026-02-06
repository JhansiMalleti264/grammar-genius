import { Module } from '@/types/game';
import { 
  BookOpen, Edit, Headphones, Mic, Clock, ArrowRight, 
  CheckSquare, Link, Shuffle, Search, AlertCircle, PenTool, 
  RefreshCw, Image, ClipboardList, Volume2, MessageCircle, 
  Radio, Music 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  index: number;
  onClick: () => void;
}

const categoryStyles = {
  reading: {
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    badge: 'bg-primary/10 text-primary border-primary/20',
  },
  writing: {
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    badge: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  speaking: {
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    badge: 'bg-accent/10 text-accent border-accent/20',
  },
  listening: {
    color: 'text-listening',
    bg: 'bg-listening/10',
    border: 'border-listening/20',
    badge: 'bg-listening/10 text-listening border-listening/20',
  },
};

const categoryIcons = {
  reading: BookOpen,
  writing: Edit,
  speaking: Mic,
  listening: Headphones,
};

const moduleIcons: Record<string, any> = {
  BookOpen,
  Edit,
  Headphones,
  Mic,
  CheckSquare,
  Link,
  Shuffle,
  Search,
  AlertCircle,
  PenTool,
  RefreshCw,
  Image,
  ClipboardList,
  Volume2,
  MessageCircle,
  Radio,
  Music,
};

const ModuleCard = ({ module, index, onClick }: ModuleCardProps) => {
  const style = categoryStyles[module.category];
  const CategoryIcon = categoryIcons[module.category];
  const ModuleIcon = moduleIcons[module.icon] || BookOpen;
  
  return (
    <div 
      className={cn(
        'group relative p-5 rounded-xl border bg-card cursor-pointer',
        'transition-all duration-300 ease-out',
        'hover:shadow-lg hover:-translate-y-1 hover:border-primary/30',
        'animate-slide-up'
      )}
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={onClick}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          'shrink-0 p-3 rounded-xl transition-all duration-300',
          style.bg,
          style.border,
          'border',
          'group-hover:scale-110'
        )}>
          <ModuleIcon className={cn('h-5 w-5', style.color)} />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {module.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="h-3 w-3" />
              <span>{module.duration}m</span>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className={cn(
            'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider mb-2 border',
            style.badge
          )}>
            <CategoryIcon className="h-3 w-3" />
            {module.category}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
            {module.description}
          </p>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-primary transition-all duration-700 ease-out"
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {module.progress}%
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
