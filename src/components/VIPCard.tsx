
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, ChevronLeft, Gift, CreditCard } from 'lucide-react';
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
  currentSubLevel?: number;
  showProgress?: boolean;
  showLevel?: boolean;
}

export const VIPCard: React.FC<VIPCardProps> = ({
  level,
  currentTurnover,
  onUpgradeClick,
  onNavigateClick,
  isCurrentTier = false,
  showNavigationButton = false,
  currentSubLevel = 1,
  showProgress = true,
  showLevel = true,
}) => {
  const getSubTierTurnover = (subLevel: number) => {
    const nextTierTurnover = level.tier === 'ELITE_DIAMOND' 
      ? level.turnoverRequired * 2 
      : VIP_LEVELS[VIP_LEVELS.findIndex(l => l.tier === level.tier) + 1]?.turnoverRequired ?? level.turnoverRequired * 2;
    
    const tierRange = nextTierTurnover - level.turnoverRequired;
    const subTierSize = tierRange / 5;
    return Math.round(level.turnoverRequired + (subTierSize * (subLevel - 1)));
  };

  const getCurrentSubTierTurnover = () => getSubTierTurnover(currentSubLevel);
  const getNextSubTierTurnover = () => getSubTierTurnover(currentSubLevel + 1);
  
  const currentSubTierTurnover = getCurrentSubTierTurnover();
  const nextSubTierTurnover = getNextSubTierTurnover();
  
  const subTierProgress = (currentTurnover / currentSubTierTurnover) * 100;
  
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
            Current Tier
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
            <h3 className="text-lg font-semibold">
              {level.name}{showLevel ? ` - Level ${currentSubLevel}` : ''}
            </h3>
          </div>
          <span className="text-sm text-muted-foreground pl-9">
            ${level.turnoverRequired.toLocaleString()} turnover required
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {level.benefits.map((benefit, index) => {
            let Icon;
            switch (benefit.icon) {
              case 'Gift':
                Icon = Gift;
                break;
              case 'CreditCard':
                Icon = CreditCard;
                break;
              default:
                Icon = Shield;
            }
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="mt-1 p-1.5 rounded-full bg-primary/10">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{benefit.title}</p>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {!isCurrentTier && showProgress && (
          <div className="mt-4">
            <Progress 
              value={Math.min(Math.max(subTierProgress, 0), 100)} 
              className="mb-2" 
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                ${currentTurnover.toLocaleString()} / ${currentSubTierTurnover.toLocaleString()} turnover
              </span>
              {currentTurnover >= currentSubTierTurnover ? (
                <div className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  Upgraded
                </div>
              ) : (
                <Button
                  onClick={onUpgradeClick}
                  disabled={true}
                  className="ml-4"
                  variant="outline"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        )}

        {!isCurrentTier && !showProgress && (
          <div className="mt-4">
            <Button
              onClick={onUpgradeClick}
              className="w-full"
              variant="default"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

const VIP_LEVELS = [
  {
    tier: 'STANDARD',
    name: 'Standard',
    turnoverRequired: 0,
    color: '#A1A1AA',
  },
  {
    tier: 'BRONZE',
    name: 'Bronze',
    turnoverRequired: 1000,
    color: '#CD7F32',
  },
  {
    tier: 'SILVER',
    name: 'Silver',
    turnoverRequired: 5000,
    color: '#C0C0C0',
  },
  {
    tier: 'GOLD',
    name: 'Gold',
    turnoverRequired: 10000,
    color: '#FFD700',
  },
  {
    tier: 'PLATINUM',
    name: 'Platinum',
    turnoverRequired: 25000,
    color: '#E5E4E2',
  },
  {
    tier: 'DIAMOND',
    name: 'Diamond',
    turnoverRequired: 50000,
    color: '#B9F2FF',
  },
  {
    tier: 'ELITE_DIAMOND',
    name: 'Elite Diamond',
    turnoverRequired: 100000,
    color: '#00FFFF',
  },
];

