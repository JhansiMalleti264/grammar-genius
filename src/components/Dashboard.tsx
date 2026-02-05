 import { useState, useMemo } from 'react';
 import { Module, Category } from '@/types/game';
 import { modules } from '@/data/modules';
 import HeroSection from './HeroSection';
 import CategoryTabs from './CategoryTabs';
 import ModuleCard from './ModuleCard';
 import { Search, Bell } from 'lucide-react';
 import { Input } from '@/components/ui/input';
 
 interface DashboardProps {
   onModuleSelect: (module: Module) => void;
 }
 
 const Dashboard = ({ onModuleSelect }: DashboardProps) => {
   const [activeCategory, setActiveCategory] = useState<Category>('all');
   const [searchQuery, setSearchQuery] = useState('');
   const streak = 12; // Mock streak value
   
   const filteredModules = useMemo(() => {
     return modules.filter(module => {
       const matchesCategory = activeCategory === 'all' || module.category === activeCategory;
       const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            module.description.toLowerCase().includes(searchQuery.toLowerCase());
       return matchesCategory && matchesSearch;
     });
   }, [activeCategory, searchQuery]);
   
   const handleStartPractice = () => {
     // Start with the first available module
     if (filteredModules.length > 0) {
       onModuleSelect(filteredModules[0]);
     }
   };
   
   return (
     <div className="min-h-screen bg-background">
       <div className="max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-10">
         {/* Header */}
         <header className="flex items-center justify-between mb-8 animate-slide-up">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
             <p className="text-muted-foreground text-sm">
               Welcome back, your momentum is up 12% today.
             </p>
           </div>
           <button className="p-3 rounded-xl bg-card border border-border hover:bg-muted transition-colors">
             <Bell className="h-5 w-5 text-muted-foreground" />
           </button>
         </header>
         
         {/* Hero Section */}
         <section className="mb-12">
           <HeroSection streak={streak} onStartPractice={handleStartPractice} />
         </section>
         
         {/* Practice Skills Section */}
         <section>
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
             <div className="animate-slide-up animate-delay-100">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-1 h-6 bg-gradient-primary rounded-full" />
                 <h2 className="text-xl font-bold text-foreground">Practice skills</h2>
               </div>
               <p className="text-muted-foreground text-sm">
                 A curated selection of focused modules for high-impact growth.
               </p>
             </div>
             
             {/* Search */}
             <div className="relative w-full md:w-72 animate-slide-up animate-delay-200">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input
                 type="text"
                 placeholder="Search training modules..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10 py-5 rounded-xl bg-card border-border"
               />
             </div>
           </div>
           
           {/* Category Tabs */}
           <div className="mb-8 animate-slide-up animate-delay-200">
             <CategoryTabs
               activeCategory={activeCategory}
               onCategoryChange={setActiveCategory}
             />
           </div>
           
           {/* Module Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
             <div className="text-center py-12">
               <p className="text-muted-foreground">No modules found matching your search.</p>
             </div>
           )}
         </section>
       </div>
     </div>
   );
 };
 
 export default Dashboard;