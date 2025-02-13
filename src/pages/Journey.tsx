
import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { VIP_LEVELS } from '@/config/vip-config';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Journey = () => {
  const currentTier = 'BRONZE';
  const currentTurnover = 2500;

  const getCurrentTierIndex = () => {
    return VIP_LEVELS.findIndex(level => level.tier === currentTier);
  };

  const calculateSubLevel = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return 5;

    const tierRange = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
    const subTierSize = tierRange / 5;
    const progressInTier = currentTurnover - currentLevel.turnoverRequired;
    
    return Math.min(Math.ceil(progressInTier / subTierSize), 5);
  };

  const getCurrentTierProgress = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return 100;

    const currentSubLevel = calculateSubLevel();
    const previousLevelTurnover = getLevelTurnover(currentSubLevel - 1);
    const nextLevelTurnover = getLevelTurnover(currentSubLevel);
    
    // Calculate progress within the current sub-level with higher precision
    const progressInSubLevel = currentTurnover - previousLevelTurnover;
    const subLevelRange = nextLevelTurnover - previousLevelTurnover;
    
    // Convert to percentage (0-100) within the current sub-level
    const progressPercentage = (progressInSubLevel / subLevelRange) * 100;
    
    // Calculate final progress based on current sub-level (each level = 20%)
    const baseProgress = (currentSubLevel - 1) * 20;
    const additionalProgress = (progressPercentage / 100) * 20;
    
    // If we're very close to the next level (within 100), adjust the visual progress
    const remainingToNext = nextLevelTurnover - currentTurnover;
    if (remainingToNext <= 100) {
      // Make the progress appear much closer to completion
      return baseProgress + (19 * (1 - (remainingToNext / 100)));
    }
    
    return baseProgress + additionalProgress;
  };

  const getLevelTurnover = (levelNumber: number) => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return currentLevel.turnoverRequired;

    const tierRange = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
    const turnoverPerLevel = tierRange / 5;
    return Math.round(currentLevel.turnoverRequired + (turnoverPerLevel * levelNumber));
  };

  const getNextSubLevelTurnover = () => {
    const currentSubLevel = calculateSubLevel();
    return getLevelTurnover(currentSubLevel);
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
                    const currentTierIndex = getCurrentTierIndex();
                    const isCurrentTierInterval = currentTier === VIP_LEVELS[currentTierIndex].tier;
                    const currentSubLevel = calculateSubLevel();
                    const isCompleted = index + 1 <= currentSubLevel;
                    
                    return (
                      <div
                        key={index}
                        className={`w-1 h-3 rounded-full transition-all ${
                          isCurrentTierInterval && isCompleted ? 'bg-primary' : 'bg-muted'
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
        </div>
      </div>
    </div>
  );
};

export default Journey;
