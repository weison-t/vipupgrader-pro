
import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Coins, Flame, Calendar, Target, Gift, Trophy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Mission {
  id: number;
  title: string;
  description: string;
  reward: string;
  progress: number;
  maxProgress: number;
  icon: React.ReactNode;
  type: 'daily' | 'weekly' | 'special';
  status: 'active' | 'completed' | 'locked';
}

const missions: Mission[] = [
  {
    id: 1,
    title: "Daily Deposit Boost",
    description: "Deposit today to receive 2x turnover multiplier",
    reward: "2x Turnover Multiplier",
    progress: 0,
    maxProgress: 1,
    icon: <Coins className="w-5 h-5" />,
    type: 'daily',
    status: 'active'
  },
  {
    id: 2,
    title: "Gaming Sprint",
    description: "Play any game today to earn 1.5x turnover multiplier",
    reward: "1.5x Turnover Multiplier",
    progress: 0,
    maxProgress: 1,
    icon: <Flame className="w-5 h-5" />,
    type: 'daily',
    status: 'active'
  },
  {
    id: 3,
    title: "Login Streak",
    description: "Login for 7 consecutive days",
    reward: "3x Turnover Multiplier",
    progress: 3,
    maxProgress: 7,
    icon: <Calendar className="w-5 h-5" />,
    type: 'weekly',
    status: 'active'
  },
  {
    id: 4,
    title: "Weekly Target",
    description: "Reach weekly turnover target of $10,000",
    reward: "5x Turnover Multiplier",
    progress: 2500,
    maxProgress: 10000,
    icon: <Target className="w-5 h-5" />,
    type: 'weekly',
    status: 'active'
  },
  {
    id: 5,
    title: "VIP Special",
    description: "Complete all daily missions this week",
    reward: "10x Turnover Multiplier + Special Gift",
    progress: 3,
    maxProgress: 7,
    icon: <Gift className="w-5 h-5" />,
    type: 'special',
    status: 'active'
  },
];

const Mission = () => {
  const { toast } = useToast();

  const handleClaimReward = (mission: Mission) => {
    if (mission.progress >= mission.maxProgress) {
      toast({
        title: "🎉 Reward Claimed!",
        description: `You've claimed: ${mission.reward}`,
      });
    } else {
      toast({
        title: "Mission in Progress",
        description: "Complete the mission to claim your reward!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Daily Missions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete missions to earn amazing rewards and multipliers! 
              Keep track of your progress and claim your rewards.
            </p>
          </div>

          <div className="grid gap-6">
            {['daily', 'weekly', 'special'].map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  {category.charAt(0).toUpperCase() + category.slice(1)} Missions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {missions
                    .filter((mission) => mission.type === category)
                    .map((mission) => (
                      <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="p-6 h-full flex flex-col">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                {mission.icon}
                              </div>
                              <div>
                                <h3 className="font-semibold">{mission.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {mission.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-auto space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">
                                  {mission.progress} / {mission.maxProgress}
                                </span>
                              </div>
                              <Progress 
                                value={(mission.progress / mission.maxProgress) * 100} 
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-primary">
                                {mission.reward}
                              </span>
                              <Button
                                variant={mission.progress >= mission.maxProgress ? "default" : "secondary"}
                                size="sm"
                                onClick={() => handleClaimReward(mission)}
                              >
                                {mission.progress >= mission.maxProgress ? "Claim" : "In Progress"}
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
