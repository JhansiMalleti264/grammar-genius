import { Flame, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/grammar-hero.png';

interface HeroSectionProps {
  streak: number;
  onStartPractice: () => void;
}

const HeroSection = ({ streak, onStartPractice }: HeroSectionProps) => {
  const scrollToModules = () => {
    document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 via-background to-primary/5 animate-slide-up">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/80 to-transparent" />
      
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-6 md:p-10 lg:p-12">
        {/* Left: Content */}
        <div className="order-2 md:order-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-bounce-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI-Powered Grammar Learning
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Practice English Skills{' '}
            <span className="text-gradient">with Smart AI Modules</span>
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-lg leading-relaxed">
            Improve your speaking, reading, writing, and listening with interactive AI-powered exercises.
          </p>
          
          {/* Streak Badge */}
          <div className="streak-badge mb-8 animate-bounce-in animate-delay-100">
            <Flame className="h-4 w-4" />
            <span>{streak} Day Streak</span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              onClick={onStartPractice}
              className="btn-gradient px-6 py-5 text-base rounded-xl gap-2"
            >
              <Play className="h-4 w-4 fill-current" />
              Practice Now
            </Button>
            <Button 
              variant="ghost"
              onClick={scrollToModules}
              className="px-6 py-5 text-base rounded-xl gap-2 text-primary hover:bg-primary/5"
            >
              Explore Modules
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Right: Hero Image */}
        <div className="order-1 md:order-2 flex items-center justify-center">
          <div className="relative w-full max-w-lg animate-slide-up animate-delay-100">
            <img 
              src={heroImage} 
              alt="AI Grammar Learning Platform"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
