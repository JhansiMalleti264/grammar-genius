 import { Module } from '@/types/game';
 import { ArrowRight, BookOpen, Edit, Headphones, Mic, Clock } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 interface ModuleCardProps {
   module: Module;
   index: number;
   onClick: () => void;
 }
 
 const categoryColors = {
   reading: 'text-reading bg-reading/10 border-reading/20',
   writing: 'text-writing bg-writing/10 border-writing/20',
   speaking: 'text-speaking bg-speaking/10 border-speaking/20',
   listening: 'text-listening bg-listening/10 border-listening/20',
 };
 
 const categoryIcons = {
   reading: BookOpen,
   writing: Edit,
   speaking: Mic,
   listening: Headphones,
 };
 
 const ModuleCard = ({ module, index, onClick }: ModuleCardProps) => {
   const Icon = categoryIcons[module.category];
   
   return (
     <div 
       className="card-module p-5 cursor-pointer group animate-slide-up"
       style={{ animationDelay: `${index * 50}ms` }}
       onClick={onClick}
     >
       <div className="flex items-start gap-4">
         {/* Icon */}
         <div className={cn(
           'p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110',
           categoryColors[module.category]
         )}>
           <Icon className="h-5 w-5" />
         </div>
         
         {/* Content */}
         <div className="flex-1 min-w-0">
           <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
             {module.title}
           </h3>
           <span className={cn(
             'category-badge text-[10px] mb-2',
             categoryColors[module.category]
           )}>
             {module.category}
           </span>
           <p className="text-sm text-muted-foreground line-clamp-1">
             {module.description}
           </p>
         </div>
         
         {/* Right side: Time & Progress */}
         <div className="flex flex-col items-end gap-2 text-right">
           <div className="flex items-center gap-1 text-xs text-muted-foreground">
             <Clock className="h-3 w-3" />
             <span>{module.duration} MIN</span>
           </div>
           
           <div className="flex items-center gap-2">
             <span className="text-sm font-medium">{module.progress}%</span>
             <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
           </div>
         </div>
       </div>
       
       {/* Progress bar */}
       {module.progress > 0 && (
         <div className="mt-4 progress-bar">
           <div 
             className="progress-fill"
             style={{ width: `${module.progress}%` }}
           />
         </div>
       )}
     </div>
   );
 };
 
 export default ModuleCard;