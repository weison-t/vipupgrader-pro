
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft } from 'lucide-react';
import { VIPLevel } from '../types/vip';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VIPCardProps {
  level: VIPLevel;
  currentTurnover: number;
  onUpgradeClick?: () => void;
  onNavigateClick?: () => void;
  isCurrentTier?: boolean;
  showNavigationButton?: boolean;
}

export const VIPCard: React.FC<VIPCardProps> = ({
  level,
  currentTurnover,
  onUpgradeClick,
  onNavigateClick,
  isCurrentTier = false,
  showNavigationButton = false,
}) => {
  const isEligible = currentTurnover >= level.turnoverRequired;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card className={`
        relative overflow-hidden p-6 border transition-all duration-300
        ${isCurrentTier ? 'border-2 border-primary' : 'hover:border-primary/50'}
        backdrop-blur-sm bg-background/95
      `}>
        {isCurrentTier && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
            Current Tier
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
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
            <h3 className="text-lg font-semibold">{level.name}</h3>
          </div>
          <span className="text-sm text-muted-foreground">
            ${level.turnoverRequired.toLocaleString()} turnover
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

        {!isCurrentTier && (
          <div className="mt-4">
            <Progress value={isEligible ? 100 : (currentTurnover / level.turnoverRequired) * 100} className="mb-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                ${currentTurnover.toLocaleString()} / ${level.turnoverRequired.toLocaleString()} turnover
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
