import { Category } from '@/types/game';
import { BookOpen, Edit, Mic, Headphones, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  counts?: Record<Category, number>;
}

const categories: { id: Category; label: string; icon: any }[] = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'reading', label: 'Reading', icon: BookOpen },
  { id: 'writing', label: 'Writing', icon: Edit },
  { id: 'speaking', label: 'Speaking', icon: Mic },
  { id: 'listening', label: 'Listening', icon: Headphones },
];

const categoryColors: Record<Category, string> = {
  all: 'text-foreground',
  reading: 'text-primary',
  writing: 'text-secondary',
  speaking: 'text-accent',
  listening: 'text-listening',
};

const CategoryTabs = ({ activeCategory, onCategoryChange, counts }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        const count = counts?.[category.id];
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium',
              'transition-all duration-200 border',
              isActive
                ? 'bg-gradient-primary text-primary-foreground border-transparent shadow-md'
                : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
            )}
          >
            <Icon className={cn(
              'h-4 w-4',
              isActive ? 'text-primary-foreground' : categoryColors[category.id]
            )} />
            <span>{category.label}</span>
            {count !== undefined && (
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded-full',
                isActive 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              )}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
