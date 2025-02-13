
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

  const calculateOverallProgress = () => {
    const currentIndex = getCurrentTierIndex();
    return ((currentIndex) / (VIP_LEVELS.length - 1)) * 100;
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
            <div className="relative">
              <Progress value={calculateOverallProgress()} className="h-4" />
              
              <div className="flex justify-between mt-2">
                {VIP_LEVELS.map((level, index) => (
                  <div 
                    key={level.tier}
                    className={`absolute transform -translate-x-1/2 transition-all ${
                      index <= getCurrentTierIndex() ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    style={{ left: `${(index / (VIP_LEVELS.length - 1)) * 100}%` }}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full mb-2 mx-auto transition-all ${
                        index <= getCurrentTierIndex() ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                    <span className="text-xs font-medium whitespace-nowrap">
                      {level.name}
                    </span>
                    <div className="text-[10px] text-muted-foreground">
                      ${level.turnoverRequired.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
