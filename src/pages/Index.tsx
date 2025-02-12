
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VIPCard } from '../components/VIPCard';
import { VIP_LEVELS, getNextTier, calculateProgress } from '../config/vip-config';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Mock user data - replace with real data later
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  currentPoints: 2500,
  currentTier: 'BRONZE',
  joinDate: new Date('2023-01-01'),
  lastUpgrade: new Date('2023-06-01'),
};

const Index = () => {
  const { toast } = useToast();
  const [upgradeInProgress, setUpgradeInProgress] = useState(false);

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
  const progress = calculateProgress(mockUser.currentPoints, mockUser.currentTier);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header Section */}
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

        {/* Current Status */}
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
              <p className="text-2xl font-semibold">{mockUser.currentPoints.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
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
                {(nextLevel.pointsRequired - mockUser.currentPoints).toLocaleString()} more points needed
              </p>
            </div>
          )}
        </motion.div>

        {/* VIP Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIP_LEVELS.map((level, index) => (
            <motion.div
              key={level.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <VIPCard
                level={level}
                currentPoints={mockUser.currentPoints}
                onUpgradeClick={() => handleUpgrade(level.tier)}
                isCurrentTier={level.tier === mockUser.currentTier}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
