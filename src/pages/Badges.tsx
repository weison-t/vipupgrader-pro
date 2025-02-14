
import { Badge as BadgeIcon, Crown, Trophy, Star, Target, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import MenuBar from "@/components/MenuBar";
import { Badge } from "@/components/ui/badge";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  progress: number;
  requirement: string;
}

const badges: BadgeItem[] = [
  {
    id: "first-win",
    name: "First Victory",
    description: "Win your first game",
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    rarity: "common",
    earned: true,
    progress: 100,
    requirement: "Win 1 game"
  },
  {
    id: "high-roller",
    name: "High Roller",
    description: "Place a bet of $1,000 or more",
    icon: <Crown className="w-6 h-6 text-purple-500" />,
    rarity: "rare",
    earned: false,
    progress: 50,
    requirement: "Place a $1,000+ bet"
  },
  {
    id: "lucky-streak",
    name: "Lucky Streak",
    description: "Win 5 games in a row",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    rarity: "epic",
    earned: false,
    progress: 20,
    requirement: "Win 5 consecutive games"
  },
  {
    id: "master-player",
    name: "Master Player",
    description: "Achieve VIP status",
    icon: <Star className="w-6 h-6 text-blue-500" />,
    rarity: "legendary",
    earned: false,
    progress: 0,
    requirement: "Reach VIP status"
  },
  {
    id: "sharp-shooter",
    name: "Sharp Shooter",
    description: "Hit 3 perfect scores",
    icon: <Target className="w-6 h-6 text-red-500" />,
    rarity: "rare",
    earned: false,
    progress: 33,
    requirement: "Get 3 perfect scores"
  },
  {
    id: "veteran",
    name: "Veteran",
    description: "Play for 30 days",
    icon: <Shield className="w-6 h-6 text-green-500" />,
    rarity: "epic",
    earned: false,
    progress: 80,
    requirement: "Play for 30 days"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`p-4 relative ${badge.earned ? 'border-primary' : 'border-border'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${badge.earned ? 'bg-primary/10' : 'bg-muted'}`}>
                      {badge.icon}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-primary">{badge.name}</h3>
                        <Badge className={`${getRarityColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{badge.requirement}</span>
                          <span className="font-medium text-primary">{badge.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 rounded-full ${
                              badge.earned 
                                ? 'bg-primary' 
                                : badge.progress >= 50 
                                  ? 'bg-blue-500' 
                                  : 'bg-muted-foreground'
                            }`}
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {badge.earned && (
                    <div className="absolute top-2 right-2">
                      <BadgeIcon className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
