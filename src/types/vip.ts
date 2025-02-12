
export type VIPTier = 'LEVEL_4' | 'STANDARD' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface VIPBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface VIPLevel {
  tier: VIPTier;
  name: string;
  turnoverRequired: number;
  benefits: VIPBenefit[];
  color: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  currentTurnover: number;
  currentTier: VIPTier;
  joinDate: Date;
  lastUpgrade: Date | null;
}

export interface UpgradeRequest {
  memberId: string;
  currentTier: VIPTier;
  requestedTier: VIPTier;
  requestDate: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
