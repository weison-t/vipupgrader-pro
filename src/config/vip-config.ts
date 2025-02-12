
import { VIPLevel } from '../types/vip';
import { Shield, Gift, CreditCard, Zap, Crown } from 'lucide-react';

export const VIP_LEVELS: VIPLevel[] = [
  {
    tier: 'STANDARD',
    name: 'Standard Member',
    pointsRequired: 0,
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
    name: 'Bronze VIP',
    pointsRequired: 1000,
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
    name: 'Silver VIP',
    pointsRequired: 5000,
    color: '#C0C0C0',
    benefits: [
      {
        title: 'Premium Support',
        description: 'Dedicated support line',
        icon: Shield.name,
      },
      {
        title: 'Enhanced Rewards',
        description: '2x points on purchases',
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
    name: 'Gold VIP',
    pointsRequired: 10000,
    color: '#FFD700',
    benefits: [
      {
        title: 'Concierge Support',
        description: 'Personal account manager',
        icon: Shield.name,
      },
      {
        title: 'Premium Rewards',
        description: '3x points on purchases',
        icon: Gift.name,
      },
      {
        title: 'VIP Events',
        description: 'Exclusive gold member events',
        icon: Crown.name,
      },
      {
        title: 'Priority Features',
        description: 'First access to beta features',
        icon: Zap.name,
      },
    ],
  },
  {
    tier: 'PLATINUM',
    name: 'Platinum VIP',
    pointsRequired: 25000,
    color: '#E5E4E2',
    benefits: [
      {
        title: 'Ultimate Support',
        description: '24/7 dedicated team',
        icon: Shield.name,
      },
      {
        title: 'Elite Rewards',
        description: '5x points on all activities',
        icon: Gift.name,
      },
      {
        title: 'Exclusive Events',
        description: 'Private platinum events',
        icon: Crown.name,
      },
      {
        title: 'Custom Features',
        description: 'Personalized feature set',
        icon: Zap.name,
      },
    ],
  },
];

export const getNextTier = (currentTier: string): VIPLevel | null => {
  const currentIndex = VIP_LEVELS.findIndex((level) => level.tier === currentTier);
  return currentIndex < VIP_LEVELS.length - 1 ? VIP_LEVELS[currentIndex + 1] : null;
};

export const calculateProgress = (currentPoints: number, currentTier: string): number => {
  const currentLevel = VIP_LEVELS.find((level) => level.tier === currentTier);
  const nextLevel = getNextTier(currentTier);

  if (!currentLevel || !nextLevel) return 100;

  const pointsNeeded = nextLevel.pointsRequired - currentLevel.pointsRequired;
  const pointsEarned = currentPoints - currentLevel.pointsRequired;

  return Math.min(Math.max((pointsEarned / pointsNeeded) * 100, 0), 100);
};
