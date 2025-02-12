import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIPCard } from '../components/VIPCard';
import { VIP_LEVELS, getNextTier, calculateProgress } from '../config/vip-config';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  currentTurnover: 2500,
  currentTier: 'BRONZE',
  joinDate: new Date('2023-01-01'),
  lastUpgrade: new Date('2023-06-01'),
};

const Index = () => {
  const { toast } = useToast();
  const [upgradeInProgress, setUpgradeInProgress] = useState(false);
  const [showLevel4, setShowLevel4] = useState(false);
  const [showLevel2, setShowLevel2] = useState(true);

  const handleUpgrade = async (tier: string) => {
    setUpgradeInProgress(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Upgrade Request Submitted",
      description: `Your request to upgrade to ${tier} has been submitted for review.`,
    });
    
    setUpgradeInProgress(false);
  };

  const currentLevel = VIP_LEVELS.find(level => level.tier === mockUser.currentTier)!;
  const nextLevel = getNextTier(mockUser.currentTier);
  const progress = calculateProgress(mockUser.currentTurnover, mockUser.currentTier);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight">VIP Membership</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock exclusive benefits and elevate your experience with our VIP membership program.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-lg border backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Welcome, {mockUser.name}</h2>
              <p className="text-muted-foreground">Current Tier: {currentLevel.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold">${mockUser.currentTurnover.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Turnover</p>
            </div>
          </div>

          {nextLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextLevel.name}</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                ${(nextLevel.turnoverRequired - mockUser.currentTurnover).toLocaleString()} more turnover needed
              </p>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {showLevel4 ? (
              <div className="flex items-center gap-2 h-full">
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLevel4(false)}
                    className="shrink-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <motion.div
                  key="level4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <VIPCard
                    level={VIP_LEVELS[0]}
                    currentTurnover={mockUser.currentTurnover}
                  />
                </motion.div>
              </div>
            ) : (
              <div className="flex items-center gap-2 h-full">
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLevel4(true)}
                    className="shrink-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <motion.div
                  key="level5"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <VIPCard
                    level={VIP_LEVELS[1]}
                    currentTurnover={mockUser.currentTurnover}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2 h-full">
            <motion.div
              key={VIP_LEVELS[2].tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-full"
            >
              <VIPCard
                level={VIP_LEVELS[2]}
                currentTurnover={mockUser.currentTurnover}
                onUpgradeClick={() => handleUpgrade(VIP_LEVELS[2].tier)}
                isCurrentTier={VIP_LEVELS[2].tier === mockUser.currentTier}
              />
            </motion.div>
          </div>
          <AnimatePresence mode="wait">
            {showLevel2 ? (
              <div className="flex items-center gap-2 h-full">
                <motion.div
                  key="level2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <VIPCard
                    level={VIP_LEVELS[3]}
                    currentTurnover={mockUser.currentTurnover}
                    onUpgradeClick={() => handleUpgrade(VIP_LEVELS[3].tier)}
                    isCurrentTier={VIP_LEVELS[3].tier === mockUser.currentTier}
                  />
                </motion.div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLevel2(false)}
                  className="shrink-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 h-full">
                <motion.div
                  key="level3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <VIPCard
                    level={VIP_LEVELS[4]}
                    currentTurnover={mockUser.currentTurnover}
                    onUpgradeClick={() => handleUpgrade(VIP_LEVELS[4].tier)}
                    isCurrentTier={VIP_LEVELS[4].tier === mockUser.currentTier}
                  />
                </motion.div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLevel2(true)}
                  className="shrink-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
