 import { Flame, Play } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface HeroSectionProps {
   streak: number;
   onStartPractice: () => void;
 }
 
 const HeroSection = ({ streak, onStartPractice }: HeroSectionProps) => {
   return (
     <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12 animate-slide-up">
       {/* Background decoration */}
       <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
       <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-secondary/30 blur-2xl" />
       
       <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
         <div className="max-w-xl">
           {/* Streak badge */}
           <div className="streak-badge mb-6 animate-bounce-in">
             <Flame className="h-4 w-4" />
             <span>Active Streak: {streak} Days</span>
           </div>
           
           <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
             Master the Art of{' '}
             <span className="text-gradient">Communication.</span>
           </h1>
           
           <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">
             Unlock native-level fluency with our adaptive AI curriculum designed to refine every facet of your language skills.
           </p>
           
           <Button 
             onClick={onStartPractice}
             className="btn-gradient px-8 py-6 text-lg rounded-xl gap-3"
           >
             Practice Now
             <Play className="h-5 w-5 fill-current" />
           </Button>
         </div>
         
         {/* 3D-like decorative shapes */}
         <div className="hidden md:flex items-center justify-center">
           <div className="relative">
             <div className="w-32 h-32 rounded-full bg-gradient-primary animate-float opacity-80" />
             <div className="absolute top-8 -right-8 w-24 h-24 rounded-full bg-secondary/60 animate-float animate-delay-200" />
             <div className="absolute -bottom-4 right-4 w-16 h-16 rounded-full bg-accent/50 animate-float animate-delay-300" />
             <div className="absolute top-0 right-16 w-10 h-10 rounded-full bg-primary-foreground/20 animate-pulse-soft" />
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default HeroSection;