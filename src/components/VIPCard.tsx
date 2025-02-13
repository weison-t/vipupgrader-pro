
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft } from 'lucide-react';
import { VIPLevel } from '../types/vip';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VIP_LEVELS } from '@/config/vip-config';

interface VIPCardProps {
  level: VIPLevel;
  currentTurnover: number;
  onUpgradeClick?: () => void;
  onNavigateClick?: () => void;
  isCurrentTier?: boolean;
  showNavigationButton?: boolean;
  currentSubLevel?: number;
}

export const VIPCard: React.FC<VIPCardProps> = ({
  level,
  currentTurnover,
  onUpgradeClick,
  onNavigateClick,
  isCurrentTier = false,
  showNavigationButton = false,
  currentSubLevel = 1,
}) => {
  const isEligible = currentTurnover >= level.turnoverRequired;
  
  const calculateSubLevelTurnover = (sublevel: number) => {
    const nextTierIndex = VIP_LEVELS.findIndex(l => l.tier === level.tier) + 1;
    const nextTier = VIP_LEVELS[nextTierIndex];
    
    if (!nextTier) return level.turnoverRequired;

    const tierRange = nextTier.turnoverRequired - level.turnoverRequired;
    const subLevelIncrement = tierRange / 5;
    return level.turnoverRequired + (sublevel * subLevelIncrement);
  };

  const calculateCurrentSubLevel = () => {
    if (currentTurnover < level.turnoverRequired) return 0;
    
    const nextTierIndex = VIP_LEVELS.findIndex(l => l.tier === level.tier) + 1;
    const nextTier = VIP_LEVELS[nextTierIndex];
    
    if (!nextTier) return 5;

    const tierRange = nextTier.turnoverRequired - level.turnoverRequired;
    const progress = currentTurnover - level.turnoverRequired;
    const subLevelSize = tierRange / 5;
    
    return Math.min(Math.ceil(progress / subLevelSize), 5);
  };

  const currentCardSubLevel = calculateCurrentSubLevel();
  const nextSubLevelTurnover = calculateSubLevelTurnover(currentCardSubLevel + 1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full"
    >
      <Card className={`
        relative overflow-hidden p-6 border transition-all duration-300 h-full
        ${isCurrentTier ? 'border-2 border-primary' : 'hover:border-primary/50'}
        backdrop-blur-sm bg-background/95
      `}>
        {isCurrentTier && (
          <div className="absolute top-2 right-3 px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
            Current Tier - L{currentSubLevel}
          </div>
        )}
        
        <div className="space-y-1 mb-4 mt-2">
          <div className="flex items-center space-x-3">
            {showNavigationButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onNavigateClick}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <Shield className="w-6 h-6" style={{ color: level.color }} />
            <h3 className="text-lg font-semibold">{level.name} - L{currentCardSubLevel}</h3>
          </div>
          <span className="text-sm text-muted-foreground pl-9">
            ${level.turnoverRequired.toLocaleString()} base turnover
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {level.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className="mt-1 p-1.5 rounded-full bg-primary/10">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{benefit.title}</p>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {!isCurrentTier && currentCardSubLevel < 5 && (
          <div className="mt-4">
            <Progress 
              value={(currentTurnover - level.turnoverRequired) / (nextSubLevelTurnover - level.turnoverRequired) * 100} 
              className="mb-2" 
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Progress to L{currentCardSubLevel + 1}
              </span>
              <Button
                onClick={onUpgradeClick}
                disabled={!isEligible}
                className="ml-4"
                variant={isEligible ? "default" : "outline"}
              >
                {isEligible ? "Upgrade Now" : "Not Eligible"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
