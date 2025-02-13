
import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { VIP_LEVELS } from '@/config/vip-config';
import { VIPCard } from '@/components/VIPCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Journey = () => {
  const currentTier = 'BRONZE';
  const currentTurnover = 2500;
  const bronzeMaxTurnover = 4200;  // Level 5 turnover requirement

  const getCurrentTierIndex = () => {
    return VIP_LEVELS.findIndex(level => level.tier === currentTier);
  };

  const calculateSubLevel = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    
    if (currentTurnover < 1800) return 1;  // Level 1: 1000-1800
    if (currentTurnover < 2600) return 2;  // Level 2: 1800-2600
    if (currentTurnover < 3400) return 3;  // Level 3: 2600-3400
    if (currentTurnover < 4200) return 4;  // Level 4: 3400-4200
    if (currentTurnover < 5000) return 5;  // Level 5: 4200-5000
    
    return 5;
  };

  const getCurrentTierProgress = () => {
    // Calculate progress based on total Bronze tier range (1000 to 4200)
    const startTurnover = 1000; // Bronze tier start
    const progressTurnover = Math.min(currentTurnover, bronzeMaxTurnover) - startTurnover;
    const totalRange = bronzeMaxTurnover - startTurnover;
    
    return (progressTurnover / totalRange) * 100;
  };

  const getLevelTurnover = (levelNumber: number) => {
    const bronzeLevels = [1000, 1800, 2600, 3400, 4200, 5000];
    return bronzeLevels[levelNumber];
  };

  const getNextSubLevelTurnover = () => {
    if (currentTurnover < 1800) return 1800;  // Next is Level 1
    if (currentTurnover < 2600) return 2600;  // Next is Level 2
    if (currentTurnover < 3400) return 3400;  // Next is Level 3
    if (currentTurnover < 4200) return 4200;  // Next is Level 4
    return 5000;  // Next is Level 5
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your VIP Journey</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your progress and discover the incredible journey ahead as a valued VIP member.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div className="text-center mb-8">
              <div className="bg-accent/50 py-4 px-6 rounded-lg inline-block">
                <h2 className="text-2xl font-semibold mb-2">
                  {VIP_LEVELS[getCurrentTierIndex()].name} - Level {calculateSubLevel()}
                </h2>
                <p className="text-muted-foreground">
                  ${currentTurnover.toLocaleString()} / ${getNextSubLevelTurnover().toLocaleString()} turnover
                </p>
              </div>
            </div>

            <div className="relative pb-16">
              <div className="flex justify-between mb-8">
                {VIP_LEVELS.map((level, index) => {
                  const isCurrentTier = level.tier === currentTier;
                  const isPastTier = index < getCurrentTierIndex();
                  
                  return (
                    <div 
                      key={level.tier}
                      className="flex flex-col items-center"
                      style={{ width: '14%' }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full mb-2 transition-all ${
                          isCurrentTier ? 'bg-primary scale-125 ring-2 ring-primary ring-offset-2' :
                          isPastTier ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                      <span className={`text-xs font-medium text-center ${
                        isCurrentTier ? 'text-primary font-bold' :
                        isPastTier ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {level.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-1">
                        ${level.turnoverRequired.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="relative w-[98%] mx-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full block">
                      <Progress 
                        value={Math.min(Math.max(getCurrentTierProgress(), 0), 100)} 
                        className="h-2 cursor-pointer" 
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm font-medium">Current Turnover: ${currentTurnover.toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="absolute top-0 left-0 w-full flex justify-between" style={{ transform: 'translateY(-50%)' }}>
                  {[...Array(5)].map((_, index) => {
                    const currentSubLevel = calculateSubLevel();
                    const isCompleted = index + 1 < currentSubLevel;
                    
                    return (
                      <div
                        key={index}
                        className={`w-1 h-3 rounded-full transition-all ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="absolute top-4 left-0 w-full flex justify-between">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-[10px] text-muted-foreground"
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      <span>L{index + 1}</span>
                      <span className="mt-1">${getLevelTurnover(index).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Available VIP Tiers</h2>
            <div className="px-8">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {VIP_LEVELS.map((level, index) => (
                    <CarouselItem key={level.tier} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <VIPCard
                          level={level}
                          currentTurnover={currentTurnover}
                          isCurrentTier={level.tier === currentTier}
                          showProgress={false}
                          onUpgradeClick={() => console.log(`View details for ${level.name}`)}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
