
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

  const getCurrentTierProgress = () => {
    const currentTierIndex = getCurrentTierIndex();
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return 100;

    const tierRange = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
    const currentProgress = currentTurnover - currentLevel.turnoverRequired;
    const percentage = (currentProgress / tierRange) * 100;
    
    return Math.min(Math.max(percentage, 0), 100);
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
            {/* VIP Progress Bar */}
            <div className="relative">
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
              </div>
            </div>

            {/* Current Tier Info */}
            <div className="text-center mt-12">
              <h2 className="text-2xl font-semibold mb-2">
                {VIP_LEVELS[getCurrentTierIndex()].name}
              </h2>
              <p className="text-muted-foreground">
                ${currentTurnover.toLocaleString()} / ${VIP_LEVELS[getCurrentTierIndex() + 1]?.turnoverRequired.toLocaleString()} turnover
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
