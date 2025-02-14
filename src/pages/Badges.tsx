
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
      return "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 border border-slate-200";
    case "rare":
      return "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 border border-blue-200";
    case "epic":
      return "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 border border-purple-200";
    case "legendary":
      return "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 border border-amber-200";
    default:
      return "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 border border-slate-200";
  }
};

const getRarityGlow = (rarity: BadgeItem["rarity"]) => {
  switch (rarity) {
    case "common":
      return "shadow-[0_0_15px_rgba(148,163,184,0.2)]";
    case "rare":
      return "shadow-[0_0_15px_rgba(59,130,246,0.2)]";
    case "epic":
      return "shadow-[0_0_15px_rgba(147,51,234,0.2)]";
    case "legendary":
      return "shadow-[0_0_15px_rgba(245,158,11,0.3)]";
    default:
      return "";
  }
};

const Badges = () => {
  const [selectedRarity, setSelectedRarity] = useState<BadgeItem["rarity"] | "all">("all");

  const filteredBadges = badges.filter(badge => 
    selectedRarity === "all" ? true : badge.rarity === selectedRarity
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4">
        <MenuBar />
        <div className="space-y-6">
          <div className="text-center py-4">
            <h1 className="text-4xl font-bold mb-2 text-primary">Badge Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Collect badges by completing special achievements and showcase your accomplishments!
            </p>
          </div>

          <div className="flex items-center justify-end mb-4 gap-2">
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
                    className={`absolute inset-0 ${
                      badge.earned 
                        ? `bg-gradient-to-br from-primary/5 to-primary/10 ${getRarityGlow(badge.rarity)}` 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    } clip-octagon shadow-lg transition-all duration-300 group-hover:scale-105 backdrop-blur-sm`}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-3 space-y-2">
                      <div className={`${
                        badge.earned 
                          ? badge.rarity === 'legendary' 
                            ? 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                            : badge.rarity === 'epic'
                            ? 'text-purple-500 drop-shadow-[0_0_8px_rgba(147,51,234,0.2)]'
                            : badge.rarity === 'rare'
                            ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.2)]'
                            : 'text-primary drop-shadow-[0_0_8px_rgba(148,163,184,0.2)]'
                          : 'text-gray-400'
                      } transform transition-transform group-hover:scale-110 duration-300`}>
                        {React.cloneElement(badge.icon, { className: 'w-12 h-12' })}
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
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 border border-gray-200'
                        } text-sm px-4 py-1.5 font-medium shadow-sm transition-all duration-300`}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Description overlay */}
                  {badge.earned ? (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 clip-octagon bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                      <div className="text-center">
                        <p className="text-xs text-white mb-2 font-medium">{badge.description}</p>
                        <p className="text-[10px] text-white/70">{badge.requirement}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 clip-octagon bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
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
