import { Category } from '@/types/game';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'reading', label: 'Reading' },
  { id: 'writing', label: 'Writing' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'listening', label: 'Listening' },
];

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-medium',
              'transition-all duration-200',
              isActive
                ? 'bg-gradient-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground'
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
