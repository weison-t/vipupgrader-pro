
import { VIPLevel } from '../types/vip';
import { Shield, Gift, CreditCard } from 'lucide-react';

export const VIP_LEVELS: VIPLevel[] = [
  {
    tier: 'STANDARD',
    name: 'Standard',
    turnoverRequired: 0,
    color: '#A1A1AA',
    benefits: [
      {
        title: 'Basic Support',
        description: 'Access to standard customer support',
        icon: Shield.name,
      },
    ],
  },
  {
    tier: 'BRONZE',
    name: 'Bronze',
    turnoverRequired: 1000,
    color: '#CD7F32',
    benefits: [
      {
        title: 'Priority Support',
        description: '24/7 priority customer support',
        icon: Shield.name,
      },
      {
        title: 'Special Offers',
        description: 'Exclusive bronze member discounts',
        icon: Gift.name,
      },
    ],
  },
  {
    tier: 'SILVER',
    name: 'Silver',
    turnoverRequired: 5000,
    color: '#C0C0C0',
    benefits: [
      {
        title: 'Premium Support',
        description: 'Dedicated support line',
        icon: Shield.name,
      },
      {
        title: 'Enhanced Rewards',
        description: '2x turnover rewards',
        icon: Gift.name,
      },
      {
        title: 'Exclusive Access',
        description: 'Early access to new features',
        icon: CreditCard.name,
      },
    ],
  },
  {
    tier: 'GOLD',
    name: 'Gold',
    turnoverRequired: 10000,
    color: '#FFD700',
    benefits: [
      {
        title: 'VIP Support',
        description: 'Personal account manager',
        icon: Shield.name,
      },
      {
        title: 'Premium Rewards',
        description: '3x turnover rewards',
        icon: Gift.name,
      },
      {
        title: 'Elite Access',
        description: 'Exclusive VIP events',
        icon: CreditCard.name,
      },
    ],
  },
  {
    tier: 'PLATINUM',
    name: 'Platinum',
    turnoverRequired: 25000,
    color: '#E5E4E2',
    benefits: [
      {
        title: 'Dedicated Support',
        description: '24/7 personal concierge',
        icon: Shield.name,
      },
    ],
  },
  {
    tier: 'DIAMOND',
    name: 'Diamond',
    turnoverRequired: 50000,
    color: '#B9F2FF',
    benefits: [
      {
        title: 'Ultimate Support',
        description: 'Priority dedicated team',
        icon: Shield.name,
      },
    ],
  },
  {
    tier: 'ELITE_DIAMOND',
    name: 'Elite Diamond',
    turnoverRequired: 100000,
    color: '#00FFFF',
    benefits: [
      {
        title: 'Elite Support',
        description: 'Direct line to management',
        icon: Shield.name,
      },
    ],
  },
];

export const getNextTier = (currentTier: string): VIPLevel | null => {
  const currentIndex = VIP_LEVELS.findIndex((level) => level.tier === currentTier);
  return currentIndex < VIP_LEVELS.length - 1 ? VIP_LEVELS[currentIndex + 1] : null;
};

export const getPreviousTier = (currentTier: string): VIPLevel | null => {
  const currentIndex = VIP_LEVELS.findIndex((level) => level.tier === currentTier);
  return currentIndex > 0 ? VIP_LEVELS[currentIndex - 1] : null;
};

export const calculateProgress = (currentTurnover: number, currentTier: string): number => {
  const currentLevel = VIP_LEVELS.find((level) => level.tier === currentTier);
  const nextLevel = getNextTier(currentTier);

  if (!currentLevel || !nextLevel) return 100;

  const turnoverNeeded = nextLevel.turnoverRequired - currentLevel.turnoverRequired;
  const turnoverEarned = currentTurnover - currentLevel.turnoverRequired;

  return Math.min(Math.max((turnoverEarned / turnoverNeeded) * 100, 0), 100);
};
