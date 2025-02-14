
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
      return "bg-slate-100 text-slate-600";
    case "rare":
      return "bg-blue-100 text-blue-600";
    case "epic":
      return "bg-purple-100 text-purple-600";
    case "legendary":
      return "bg-amber-100 text-amber-600";
    default:
      return "bg-slate-100 text-slate-600";
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                        ? 'bg-gradient-to-br from-primary/20 to-primary/10' 
                        : 'bg-gray-200'
                    } clip-octagon shadow-lg transition-all duration-300 group-hover:scale-105`}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-3 space-y-2">
                      <div className={`${
                        badge.earned 
                          ? badge.rarity === 'legendary' 
                            ? 'text-amber-500'
                            : badge.rarity === 'epic'
                            ? 'text-purple-500'
                            : badge.rarity === 'rare'
                            ? 'text-blue-500'
                            : 'text-primary'
                          : 'text-gray-400'
                      } transform transition-transform group-hover:scale-110`}>
                        {React.cloneElement(badge.icon, { className: 'w-12 h-12' })}
                      </div>
                      <h3 className={`text-xs font-semibold text-center ${
                        badge.earned ? 'text-primary' : 'text-gray-500'
                      }`}>
                        {badge.name}
                      </h3>
                      <Badge 
                        className={`${
                          badge.earned 
                            ? getRarityColor(badge.rarity) 
                            : 'bg-gray-100 text-gray-500'
                        } text-xs px-3 py-1`}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Description overlay */}
                  {badge.earned ? (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 clip-octagon bg-black/80 flex items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-xs text-white mb-2">{badge.description}</p>
                        <p className="text-[10px] text-white/70">{badge.requirement}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 clip-octagon bg-black/80 flex items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-xs text-white mb-2">{badge.description}</p>
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
