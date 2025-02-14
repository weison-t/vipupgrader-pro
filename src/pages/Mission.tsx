import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Coins, Flame, Calendar, Target, Gift, Trophy, Timer, Users, Star,
  Crown, Award, Zap, PartyPopper, Medal
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Mission {
  id: number;
  title: string;
  description: string;
  reward: string;
  progress: number;
  maxProgress: number;
  icon: React.ReactNode;
  type: 'daily' | 'weekly' | 'special' | 'seasonal' | 'social' | 'achievement' | 'vip' | 'chain' | 'tournament' | 'lucky' | 'extreme';
  status: 'active' | 'completed' | 'locked';
  expiresAt?: string;
  chainStep?: number;
  totalChainSteps?: number;
  vipTierRequired?: string;
  comboMultiplier?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  bonusRewards?: string[];
}

const missions: Mission[] = [
  // Daily Missions
  {
    id: 1,
    title: "Daily Deposit Boost",
    description: "Deposit today to receive 2x turnover multiplier",
    reward: "2x Turnover Multiplier",
    progress: 0,
    maxProgress: 1,
    icon: <Coins className="w-5 h-5" />,
    type: 'daily',
    status: 'active',
    comboMultiplier: 1.2
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
    status: 'active',
    comboMultiplier: 1.1
  },
  
  // Weekly Missions
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
  
  // Time-Limited Special Missions
  {
    id: 5,
    title: "Flash Challenge",
    description: "Win 5 games in the next 2 hours",
    reward: "10x Turnover Multiplier",
    progress: 2,
    maxProgress: 5,
    icon: <Timer className="w-5 h-5" />,
    type: 'special',
    status: 'active',
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  },
  
  // Seasonal Events
  {
    id: 6,
    title: "Summer Festival",
    description: "Participate in summer themed games",
    reward: "Special Summer Badge + 5x Multiplier",
    progress: 3,
    maxProgress: 10,
    icon: <PartyPopper className="w-5 h-5" />,
    type: 'seasonal',
    status: 'active',
    expiresAt: "2024-08-31T23:59:59Z"
  },
  
  // Mission Chains
  {
    id: 7,
    title: "High Roller Journey",
    description: "Complete step 2/3: Reach $5000 turnover",
    reward: "Progressive Multiplier (current: 3x)",
    progress: 3000,
    maxProgress: 5000,
    icon: <Zap className="w-5 h-5" />,
    type: 'chain',
    status: 'active',
    chainStep: 2,
    totalChainSteps: 3
  },
  
  // Social Missions
  {
    id: 8,
    title: "Social Butterfly",
    description: "Invite 3 friends to join",
    reward: "2x Multiplier + Exclusive Avatar",
    progress: 1,
    maxProgress: 3,
    icon: <Users className="w-5 h-5" />,
    type: 'social',
    status: 'active'
  },
  
  // Achievements
  {
    id: 9,
    title: "Master Player",
    description: "Reach 1000 total games played",
    reward: "Permanent 1.2x Multiplier",
    progress: 850,
    maxProgress: 1000,
    icon: <Award className="w-5 h-5" />,
    type: 'achievement',
    status: 'active'
  },
  
  // VIP Exclusive
  {
    id: 10,
    title: "Diamond Elite Task",
    description: "Complete special VIP challenge",
    reward: "15x Multiplier + Elite Badge",
    progress: 0,
    maxProgress: 1,
    icon: <Crown className="w-5 h-5" />,
    type: 'vip',
    status: 'active',
    vipTierRequired: "DIAMOND"
  },

  // Tournament Missions
  {
    id: 11,
    title: "Tournament Champion",
    description: "Reach top 3 in weekly tournament",
    reward: "20x Multiplier + Champion Trophy",
    progress: 0,
    maxProgress: 1,
    icon: <Trophy className="w-5 h-5" />,
    type: 'tournament',
    status: 'active',
    difficulty: 'hard',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    bonusRewards: ['Exclusive Avatar Frame', 'Tournament Badge']
  },

  // Lucky Spin Mission
  {
    id: 12,
    title: "Lucky Spinner",
    description: "Complete 50 spins to unlock mystery multiplier",
    reward: "Mystery Multiplier (5x-50x)",
    progress: 20,
    maxProgress: 50,
    icon: <Star className="w-5 h-5" />,
    type: 'lucky',
    status: 'active',
    difficulty: 'medium',
    bonusRewards: ['Random Premium Item', 'Lucky Badge']
  },

  // Extreme Challenge
  {
    id: 13,
    title: "Extreme Challenge",
    description: "Win 10 games in a row",
    reward: "100x Multiplier",
    progress: 3,
    maxProgress: 10,
    icon: <Flame className="w-5 h-5" />,
    type: 'extreme',
    status: 'active',
    difficulty: 'extreme',
    comboMultiplier: 2.0,
    bonusRewards: ['Extreme Challenger Title', 'Special Effect for Avatar']
  },

  // Enhanced Chain Mission
  {
    id: 14,
    title: "Master's Path",
    description: "Complete an epic series of challenges",
    reward: "Progressive Rewards up to 50x",
    progress: 1,
    maxProgress: 5,
    icon: <Crown className="w-5 h-5" />,
    type: 'chain',
    status: 'active',
    chainStep: 1,
    totalChainSteps: 5,
    difficulty: 'hard',
    bonusRewards: ['Master Title', 'Exclusive Emotes']
  },

  // Enhanced Social Mission
  {
    id: 15,
    title: "Community Leader",
    description: "Help 5 new players complete their first mission",
    reward: "10x Multiplier + Leadership Badge",
    progress: 2,
    maxProgress: 5,
    icon: <Users className="w-5 h-5" />,
    type: 'social',
    status: 'active',
    difficulty: 'medium',
    bonusRewards: ['Community Leader Badge', 'Special Chat Color']
  }
];

const missionCategories = [
  { type: 'daily', title: 'Daily Missions', icon: <Trophy className="w-6 h-6 text-primary" /> },
  { type: 'weekly', title: 'Weekly Missions', icon: <Calendar className="w-6 h-6 text-primary" /> },
  { type: 'special', title: 'Special Missions', icon: <Timer className="w-6 h-6 text-primary" /> },
  { type: 'seasonal', title: 'Seasonal Events', icon: <PartyPopper className="w-6 h-6 text-primary" /> },
  { type: 'chain', title: 'Mission Chains', icon: <Zap className="w-6 h-6 text-primary" /> },
  { type: 'social', title: 'Social Missions', icon: <Users className="w-6 h-6 text-primary" /> },
  { type: 'achievement', title: 'Achievements', icon: <Medal className="w-6 h-6 text-primary" /> },
  { type: 'vip', title: 'VIP Exclusive', icon: <Crown className="w-6 h-6 text-primary" /> },
  { type: 'tournament', title: 'Tournaments', icon: <Trophy className="w-6 h-6 text-primary" /> },
  { type: 'lucky', title: 'Lucky Missions', icon: <Star className="w-6 h-6 text-primary" /> },
  { type: 'extreme', title: 'Extreme Challenges', icon: <Flame className="w-6 h-6 text-primary" /> }
];

const Mission = () => {
  const { toast } = useToast();

  const handleClaimReward = (mission: Mission) => {
    if (mission.progress >= mission.maxProgress) {
      const multiplierText = mission.comboMultiplier 
        ? `(Combo Bonus: ${mission.comboMultiplier}x)`
        : '';
      
      const bonusText = mission.bonusRewards 
        ? `\nBonus Rewards: ${mission.bonusRewards.join(', ')}`
        : '';
      
      toast({
        title: "🎉 Reward Claimed!",
        description: `You've claimed: ${mission.reward} ${multiplierText}${bonusText}`,
      });
    } else {
      toast({
        title: "Mission in Progress",
        description: "Complete the mission to claim your reward!",
        variant: "destructive",
      });
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const remaining = new Date(expiresAt).getTime() - Date.now();
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-orange-500';
      case 'extreme': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4">
        <MenuBar />
        <div className="space-y-6">
          <div className="text-center py-4">
            <h1 className="text-4xl font-bold mb-2 text-primary">Mission Center</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete missions to earn amazing rewards and multipliers! 
              Chain missions together for combo bonuses and unlock exclusive rewards.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-indigo-500/20 to-blue-500/10">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm text-primary/80">Active Missions</p>
                    <p className="text-2xl font-bold text-primary">{missions.filter(m => m.status === 'active').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-emerald-500/20 to-green-500/10">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-primary/80">Completed</p>
                    <p className="text-2xl font-bold text-primary">{missions.filter(m => m.status === 'completed').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/10">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-primary/80">VIP Missions</p>
                    <p className="text-2xl font-bold text-primary">{missions.filter(m => m.type === 'vip').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/10">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-primary/80">Achievements</p>
                    <p className="text-2xl font-bold text-primary">{missions.filter(m => m.type === 'achievement').length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-span-12 grid gap-4">
              {missionCategories.map((category) => (
                <motion.div 
                  key={category.type}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-card rounded-lg p-4 border border-primary/10">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b border-primary/10 pb-2 text-primary">
                      {category.icon}
                      {category.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {missions
                        .filter((mission) => mission.type === category.type)
                        .map((mission) => (
                          <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                          >
                            <Card className="p-4 h-full flex flex-col hover:shadow-lg transition-shadow border border-primary/10">
                              {mission.difficulty && (
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${
                                  getDifficultyColor(mission.difficulty)
                                } bg-primary/5`}>
                                  {mission.difficulty}
                                </div>
                              )}
                              <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                                  {mission.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold truncate text-primary">{mission.title}</h3>
                                  <p className="text-sm text-primary/70 line-clamp-2">
                                    {mission.description}
                                  </p>
                                  {mission.expiresAt && (
                                    <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                                      <Timer className="w-3 h-3" />
                                      {getTimeRemaining(mission.expiresAt)}
                                    </p>
                                  )}
                                  {mission.chainStep && (
                                    <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                                      <Zap className="w-3 h-3" />
                                      Step {mission.chainStep}/{mission.totalChainSteps}
                                    </p>
                                  )}
                                  {mission.vipTierRequired && (
                                    <p className="text-xs text-purple-500 mt-1 flex items-center gap-1">
                                      <Crown className="w-3 h-3" />
                                      {mission.vipTierRequired} Required
                                    </p>
                                  )}
                                  {mission.comboMultiplier && (
                                    <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                                      <Flame className="w-3 h-3" />
                                      {mission.comboMultiplier}x Combo
                                    </p>
                                  )}
                                  {mission.bonusRewards && (
                                    <p className="text-xs text-indigo-500 mt-1 flex items-center gap-1">
                                      <Gift className="w-3 h-3" />
                                      +{mission.bonusRewards.length} Bonus
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mt-auto space-y-3">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-primary/70">Progress</span>
                                    <span className="font-medium text-primary">
                                      {mission.progress}/{mission.maxProgress}
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(mission.progress / mission.maxProgress) * 100}
                                    className="h-2"
                                  />
                                </div>
                                
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-sm font-medium text-primary truncate">
                                    {mission.reward}
                                  </span>
                                  <Button
                                    variant={mission.progress >= mission.maxProgress ? "default" : "secondary"}
                                    size="sm"
                                    onClick={() => handleClaimReward(mission)}
                                    className="shrink-0"
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
