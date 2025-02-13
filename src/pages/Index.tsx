
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIPCard } from '../components/VIPCard';
import { VIP_LEVELS, getNextTier, calculateProgress } from '../config/vip-config';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Gift, TrendingUp, Copy } from 'lucide-react';
import { MenuBar } from '@/components/MenuBar';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  currentTurnover: 2500,
  currentTier: 'BRONZE',
  joinDate: new Date('2023-01-01'),
  lastUpgrade: new Date('2023-06-01'),
};

const specialOffers = [
  {
    title: 'Weekend Bonus',
    description: 'Get 2x points on all transactions this weekend',
    code: 'WEEKEND2X'
  },
  {
    title: 'Birthday Special',
    description: 'Claim your birthday bonus before it expires',
    code: 'BDAY2024'
  }
];

const Index = () => {
  const { toast } = useToast();
  const [upgradeInProgress, setUpgradeInProgress] = useState(false);
  const [showLevel4, setShowLevel4] = useState(false);
  const [showLevel2, setShowLevel2] = useState(true);
  const [revealedCodes, setRevealedCodes] = useState<{ [key: string]: boolean }>({});

  const getCurrentTierProgress = () => {
    const currentTierIndex = VIP_LEVELS.findIndex(level => level.tier === mockUser.currentTier);
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return 100;

    const tierRange = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
    const currentProgress = mockUser.currentTurnover - currentLevel.turnoverRequired;
    const percentage = (currentProgress / tierRange) * 100;
    
    return Math.min(Math.max(percentage, 0), 100);
  };

  const getNextSubLevelTurnover = () => {
    const currentProgress = getCurrentTierProgress();
    const nextLevel = Math.ceil(currentProgress / 20);
    const currentTierIndex = VIP_LEVELS.findIndex(level => level.tier === mockUser.currentTier);
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextTierLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextTierLevel) return currentLevel.turnoverRequired;

    const tierRange = nextTierLevel.turnoverRequired - currentLevel.turnoverRequired;
    const subLevelIncrement = tierRange / 5;
    return currentLevel.turnoverRequired + (nextLevel * subLevelIncrement);
  };

  const getLevelTurnover = (levelNumber: number) => {
    const currentTierIndex = VIP_LEVELS.findIndex(level => level.tier === mockUser.currentTier);
    const currentLevel = VIP_LEVELS[currentTierIndex];
    const nextLevel = VIP_LEVELS[currentTierIndex + 1];
    
    if (!nextLevel) return currentLevel.turnoverRequired;

    const tierRange = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
    const turnoverPerLevel = tierRange / 5;
    return Math.round(currentLevel.turnoverRequired + (turnoverPerLevel * levelNumber));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: "Promotion code has been copied to your clipboard.",
    });
  };

  const handleApplyCode = (code: string) => {
    toast({
      title: "Code Applied!",
      description: `The promotion code ${code} has been applied to your account.`,
    });
  };

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
  const currentSubLevel = Math.ceil(getCurrentTierProgress() / 20);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <div className="space-y-8">
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
                <p className="text-muted-foreground">Current Tier: {currentLevel.name} - Level {currentSubLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold">${mockUser.currentTurnover.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Turnover</p>
              </div>
            </div>

            {nextLevel && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to {currentLevel.name} - Level {currentSubLevel + 1}</span>
                    <span>{getCurrentTierProgress().toFixed(0)}%</span>
                  </div>
                  <Progress value={getCurrentTierProgress()} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    ${(getNextSubLevelTurnover() - mockUser.currentTurnover).toLocaleString()} more turnover needed
                  </p>
                </div>

                <div className="relative w-full">
                  <div className="absolute top-0 left-0 w-full flex justify-between" style={{ transform: 'translateY(-50%)' }}>
                    {[...Array(5)].map((_, index) => {
                      const isCompleted = getCurrentTierProgress() >= ((index + 1) * 20);
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
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-card p-6 rounded-lg border backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Recommendations</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">Increase your turnover by $500 to reach the next tier faster</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <p className="text-sm text-muted-foreground">Complete your profile to unlock additional benefits</p>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg border backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Special for You</h3>
              </div>
              <div className="space-y-4">
                {specialOffers.map((offer, index) => (
                  <div key={index} className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium">{offer.title}</h4>
                        <p className="text-sm text-muted-foreground">{offer.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <AnimatePresence mode="wait">
                          {revealedCodes[offer.code] ? (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              className="flex items-center gap-2 ml-4"
                            >
                              <code className="px-2 py-1 rounded bg-primary/10 text-sm font-mono">
                                {offer.code}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyCode(offer.code)}
                                className="h-7"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setRevealedCodes(prev => ({ ...prev, [offer.code]: true }))}
                                className="h-7 ml-4"
                              >
                                Show Code
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {revealedCodes[offer.code] && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="ml-4"
                          >
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleApplyCode(offer.code)}
                              className="h-7 w-full"
                            >
                              Apply
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                      currentSubLevel={currentSubLevel}
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
    </div>
  );
};

export default Index;
