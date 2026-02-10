import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import robotImage from '@/assets/robot-hero.png';

interface HeroSectionProps {
  onStartPractice: () => void;
  onExploreModules: () => void;
}

const HeroSection = ({ onStartPractice, onExploreModules }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-muted/60 to-secondary/5 border border-border/50 animate-slide-up">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/8 rounded-full blur-3xl" />

      <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center p-6 md:p-10 lg:p-14">
        {/* Left: Content */}
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-bounce-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            AI-Powered Grammar Learning
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            Practice English Skills{' '}
            <span className="text-gradient">with Smart AI Modules</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            Improve your speaking, reading, writing, and listening with
            interactive AI-powered exercises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Button
              onClick={onStartPractice}
              className="btn-gradient px-6 py-5 text-base rounded-xl gap-2"
            >
              <Play className="h-4 w-4 fill-current" />
              Practice Now
            </Button>
            <Button
              variant="outline"
              onClick={onExploreModules}
              className="px-6 py-5 text-base rounded-xl gap-2 border-primary/30 text-primary hover:bg-primary/5"
            >
              Explore Modules
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6 md:gap-10">
            <StatItem value="1500+" label="WORDS MASTERED" />
            <div className="w-px h-10 bg-border" />
            <StatItem value="12" label="MODULES" />
            <div className="w-px h-10 bg-border" />
            <StatItem value="85%" label="AVG. ACCURACY" />
          </div>
        </div>

        {/* Right: Robot Image with orbital animation */}
        <div className="order-1 md:order-2 flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            {/* Orbiting rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] rounded-full border border-primary/20 animate-[spin_12s_linear_infinite]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-full border border-secondary/15 animate-[spin_18s_linear_infinite_reverse]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[105%] h-[105%] rounded-full border border-primary/10 animate-[spin_25s_linear_infinite]" />
            </div>

            {/* Orbiting dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[85%] h-[85%] animate-[spin_12s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-glow" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[95%] h-[95%] animate-[spin_18s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-secondary shadow-md" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[105%] h-[105%] animate-[spin_25s_linear_infinite]">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60" />
              </div>
            </div>

            {/* Pulsing glow behind robot */}
            <div className="absolute inset-[15%] rounded-full bg-gradient-primary opacity-10 animate-pulse-soft blur-2xl" />

            {/* Robot image */}
            <div className="relative z-10 animate-float">
              <img
                src={robotImage}
                alt="AI Grammar Learning Assistant"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
    <p className="text-[11px] font-medium text-muted-foreground tracking-wider uppercase">{label}</p>
  </div>
);

export default HeroSection;
