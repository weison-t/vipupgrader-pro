
import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { VIP_LEVELS } from '@/config/vip-config';

const Journey = () => {
  // For demonstration, we'll assume the user is at Bronze level with 2000 turnover
  const currentTier = 'BRONZE';
  const currentTurnover = 2000;

  const getCurrentTierIndex = () => {
    return VIP_LEVELS.findIndex(level => level.tier === currentTier);
  };

  const getSubLevelTurnoverIncrement = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return 0;

    const tierRange = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
    return tierRange / 5; // 5 sub-levels per tier
  };

  const getCurrentTierProgress = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return 100;

    const currentSubLevel = Math.ceil((currentTurnover - currentLevel.turnoverRequired) / getSubLevelTurnoverIncrement());
    const subLevelStart = currentLevel.turnoverRequired + ((currentSubLevel - 1) * getSubLevelTurnoverIncrement());
    const subLevelEnd = subLevelStart + getSubLevelTurnoverIncrement();
    
    const progressWithinSubLevel = ((currentTurnover - subLevelStart) / (subLevelEnd - subLevelStart)) * 100;
    return Math.min(Math.max(progressWithinSubLevel, 0), 100);
  };

  const getNextSubLevelTurnover = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const currentSubLevel = Math.ceil((currentTurnover - currentLevel.turnoverRequired) / getSubLevelTurnoverIncrement());
    return currentLevel.turnoverRequired + (currentSubLevel * getSubLevelTurnoverIncrement());
  };

  const getCurrentSubLevel = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    return Math.ceil((currentTurnover - currentLevel.turnoverRequired) / getSubLevelTurnoverIncrement());
  };

  const turnoverNeeded = getNextSubLevelTurnover() - currentTurnover;

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
            {/* Current Tier Info */}
            <div className="text-center mb-8">
              <div className="bg-accent/50 py-4 px-6 rounded-lg inline-block">
                <h2 className="text-2xl font-semibold mb-2">
                  {VIP_LEVELS[getCurrentTierIndex()].name} - Level {getCurrentSubLevel()}
                </h2>
                <p className="text-muted-foreground">
                  ${currentTurnover.toLocaleString()} / ${getNextSubLevelTurnover().toLocaleString()} turnover
                </p>
              </div>
            </div>

            {/* VIP Progress Bar */}
            <div className="relative pb-16">
              {/* Tier Markers */}
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

              {/* Progress Bar */}
              <div className="relative w-[98%] mx-auto">
                <Progress value={getCurrentTierProgress()} className="h-2" />
                <div className="mt-2 flex justify-between text-sm">
                  <span>{getCurrentTierProgress().toFixed(1)}% Complete</span>
                  <span className="text-muted-foreground">
                    ${turnoverNeeded.toLocaleString()} more needed
                  </span>
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
