import React from 'react';
import { Badge as BadgeIcon, Crown, Trophy, Star, Target, Zap, Shield, Filter, Rocket, Medal, Award, Heart, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MenuBar } from "@/components/MenuBar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  requirement: string;
}

const badges: BadgeItem[] = [
  {
    id: "first-win",
    name: "First Victory",
    description: "Win your first game",
    icon: <Trophy className="w-8 h-8" />,
    rarity: "common",
    earned: true,
    requirement: "Win 1 game"
  },
  {
    id: "high-roller",
    name: "High Roller",
    description: "Place a bet of $1,000 or more",
    icon: <Crown className="w-8 h-8" />,
    rarity: "rare",
    earned: false,
    requirement: "Place a $1,000+ bet"
  },
  {
    id: "lucky-streak",
    name: "Lucky Streak",
    description: "Win 5 games in a row",
    icon: <Zap className="w-8 h-8" />,
    rarity: "epic",
    earned: false,
    requirement: "Win 5 consecutive games"
  },
  {
    id: "master-player",
    name: "Master Player",
    description: "Achieve VIP status",
    icon: <Star className="w-8 h-8" />,
    rarity: "legendary",
    earned: false,
    requirement: "Reach VIP status"
  },
  {
    id: "sharp-shooter",
    name: "Sharp Shooter",
    description: "Hit 3 perfect scores",
    icon: <Target className="w-8 h-8" />,
    rarity: "rare",
    earned: true,
    requirement: "Get 3 perfect scores"
  },
  {
    id: "veteran",
    name: "Veteran",
    description: "Play for 30 days",
    icon: <Shield className="w-8 h-8" />,
    rarity: "epic",
    earned: false,
    requirement: "Play for 30 days"
  },
  {
    id: "pioneer",
    name: "Pioneer",
    description: "Be among the first 100 players",
    icon: <Rocket className="w-8 h-8" />,
    rarity: "legendary",
    earned: true,
    requirement: "Early registration"
  },
  {
    id: "champion",
    name: "Champion",
    description: "Win 50 games total",
    icon: <Medal className="w-8 h-8" />,
    rarity: "epic",
    earned: false,
    requirement: "Win 50 games"
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Make 10 friends",
    icon: <Heart className="w-8 h-8" />,
    rarity: "common",
    earned: true,
    requirement: "Add 10 friends"
  },
  {
    id: "hot-streak",
    name: "Hot Streak",
    description: "Win 10 games in one day",
    icon: <Flame className="w-8 h-8" />,
    rarity: "legendary",
    earned: false,
    requirement: "10 wins in 24h"
  },
  {
    id: "achievement-hunter",
    name: "Achievement Hunter",
    description: "Earn 5 different badges",
    icon: <Award className="w-8 h-8" />,
    rarity: "rare",
    earned: true,
    requirement: "Collect 5 badges"
  }
];

const getRarityColor = (rarity: BadgeItem["rarity"]) => {
  switch (rarity) {
    case "common":
      return "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-slate-700 border-2 border-slate-300/50";
    case "rare":
      return "bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 text-blue-700 border-2 border-blue-300/50";
    case "epic":
      return "bg-gradient-to-br from-purple-200 via-purple-100 to-purple-300 text-purple-700 border-2 border-purple-300/50";
    case "legendary":
      return "bg-gradient-to-br from-amber-200 via-amber-100 to-amber-300 text-amber-700 border-2 border-amber-300/50";
    default:
      return "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-slate-700 border-2 border-slate-300/50";
  }
};

const getRarityGlow = (rarity: BadgeItem["rarity"]) => {
  switch (rarity) {
    case "common":
      return "shadow-[0_0_20px_rgba(148,163,184,0.3)] shadow-slate-200/50 drop-shadow-lg";
    case "rare":
      return "shadow-[0_0_25px_rgba(59,130,246,0.3)] shadow-blue-200/50 drop-shadow-lg";
    case "epic":
      return "shadow-[0_0_30px_rgba(147,51,234,0.3)] shadow-purple-200/50 drop-shadow-lg";
    case "legendary":
      return "shadow-[0_0_35px_rgba(245,158,11,0.4)] shadow-amber-200/50 drop-shadow-lg";
    default:
      return "drop-shadow-lg";
  }
};

const getBadgeBackground = (rarity: BadgeItem["rarity"], earned: boolean) => {
  if (!earned) return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 shadow-lg shadow-gray-300/20 drop-shadow-md';
  
  switch (rarity) {
    case "common":
      return "bg-gradient-to-br from-slate-100 via-white to-slate-200 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/20 after:to-transparent after:clip-octagon shadow-xl shadow-slate-300/30 drop-shadow-xl";
    case "rare":
      return "bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/30 after:to-transparent after:clip-octagon shadow-xl shadow-blue-300/30 drop-shadow-xl";
    case "epic":
      return "bg-gradient-to-br from-purple-100 via-fuchsia-50 to-purple-200 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/40 after:to-transparent after:clip-octagon shadow-xl shadow-purple-300/30 drop-shadow-xl";
    case "legendary":
      return "bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/50 after:to-transparent after:clip-octagon shadow-xl shadow-amber-300/30 drop-shadow-xl";
    default:
      return "bg-gradient-to-br from-slate-100 via-white to-slate-200 shadow-xl shadow-slate-300/30 drop-shadow-xl";
  }
};

const Badges = () => {
  const [selectedRarity, setSelectedRarity] = useState<BadgeItem["rarity"] | "all">("all");

  const filteredBadges = badges.filter(badge => 
    selectedRarity === "all" ? true : badge.rarity === selectedRarity
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container py-4">
        <MenuBar />
        <div className="space-y-6">
          <div className="text-center py-8">
            <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Badge Collection
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Collect badges by completing special achievements and showcase your accomplishments!
            </p>
          </div>

          <div className="flex items-center justify-end mb-6 gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select
              value={selectedRarity}
              onValueChange={(value) => setSelectedRarity(value as BadgeItem["rarity"] | "all")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredBadges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="group relative aspect-square">
                  <div 
                    className={`absolute inset-0 ${getBadgeBackground(badge.rarity, badge.earned)} 
                    ${badge.earned ? getRarityGlow(badge.rarity) : ''} 
                    clip-octagon transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl
                    backdrop-blur-sm border-2 ${badge.earned ? 'border-primary/10' : 'border-gray-300/50'}
                    before:absolute before:inset-0 before:clip-octagon before:bg-gradient-to-br before:from-white/5 before:to-white/0 before:z-10`}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-3 space-y-2 relative z-20">
                      <div className="absolute inset-0 overflow-hidden clip-octagon opacity-50">
                        <div className="absolute top-0 -left-[100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate-45 transition-transform duration-1500 group-hover:translate-x-[400%]" />
                      </div>
                      
                      <div className={`${
                        badge.earned 
                          ? badge.rarity === 'legendary' 
                            ? 'text-amber-600 drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                            : badge.rarity === 'epic'
                            ? 'text-purple-600 drop-shadow-[0_0_12px_rgba(147,51,234,0.3)]'
                            : badge.rarity === 'rare'
                            ? 'text-blue-600 drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                            : 'text-primary drop-shadow-[0_0_12px_rgba(148,163,184,0.3)]'
                          : 'text-gray-400'
                      } transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        {React.cloneElement(badge.icon, { 
                          className: 'w-12 h-12 transition-transform duration-500 group-hover:rotate-[360deg]' 
                        })}
                      </div>
                      <h3 className={`text-sm font-semibold text-center ${
                        badge.earned ? 'text-primary' : 'text-gray-500'
                      } transition-colors duration-300`}>
                        {badge.name}
                      </h3>
                      <Badge 
                        className={`${
                          badge.earned 
                            ? getRarityColor(badge.rarity) 
                            : 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 text-gray-600 border-2 border-gray-300/50'
                        } text-sm px-4 py-1.5 font-medium shadow-sm transition-all duration-300 group-hover:scale-105`}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  {badge.earned ? (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 clip-octagon 
                      bg-gradient-to-br from-black/90 to-black/70 flex items-center justify-center p-4 backdrop-blur-sm 
                      transform group-hover:scale-105 shadow-lg shadow-black/20">
                      <div className="text-center">
                        <p className="text-xs text-white mb-2 font-medium">{badge.description}</p>
                        <p className="text-[10px] text-white/70">{badge.requirement}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 clip-octagon bg-gradient-to-br from-black/90 to-black/70 
                      flex items-center justify-center p-4 backdrop-blur-sm shadow-lg shadow-black/20">
                      <div className="text-center">
                        <p className="text-xs text-white mb-2 font-medium">{badge.description}</p>
                        <p className="text-[10px] text-white/70">{badge.requirement}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
