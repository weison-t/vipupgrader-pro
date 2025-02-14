
import React, { useState } from 'react';
import { MenuBar } from '@/components/MenuBar';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ScratchCard from '@/components/ScratchCard';

const prizes = [
  { id: 1, value: "50 Free Spins", color: "#F97316" },
  { id: 2, value: "$100 Bonus", color: "#D946EF" },
  { id: 3, value: "150% Deposit Match", color: "#8B5CF6" },
  { id: 4, value: "25% Cashback", color: "#EC4899" },
  { id: 5, value: "VIP Points x2", color: "#F43F5E" }
];

const OnlyYou = () => {
  const [revealedPrizes, setRevealedPrizes] = useState<Set<number>>(new Set());
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const { toast } = useToast();

  const handleScratchComplete = (prizeId: number) => {
    if (!revealedPrizes.has(prizeId)) {
      setRevealedPrizes(new Set([...revealedPrizes, prizeId]));
      toast({
        title: "Congratulations! 🎉",
        description: `You won ${prizes.find(p => p.id === prizeId)?.value}!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <h1 className="text-4xl font-bold text-center mb-4">Special Rewards Just For You</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Welcome to your exclusive VIP rewards showcase! We've prepared these special scratch cards just for you. 
          Each one holds an exciting surprise waiting to be discovered. Start scratching and unveil your lucky rewards! ✨
        </p>
        
        {/* Scratch Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {prizes.map((prize) => (
            <div key={prize.id} className="relative flex justify-center transform hover:scale-105 transition-transform duration-200">
              <ScratchCard
                width={200}
                height={192}
                onComplete={() => handleScratchComplete(prize.id)}
              >
                <div 
                  className="w-[200px] h-[192px] flex items-center justify-center text-white font-bold text-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${prize.color}, ${prize.color}dd)`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                  }}
                >
                  {prize.value}
                </div>
              </ScratchCard>
            </div>
          ))}
        </div>

        {/* Gift Box Section */}
        <div className="flex justify-center mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setIsGiftOpen(true)}
          >
            <div className="w-64 h-64 relative">
              <motion.div
                className="absolute inset-0 bg-[#FDE1D3] rounded-lg shadow-lg"
                animate={{
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className="w-24 h-24 text-[#9b87f5]" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-32 bg-[#9b87f5] transform -rotate-45 origin-bottom" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-32 bg-[#9b87f5] transform rotate-45 origin-bottom" />
              </motion.div>
            </div>
            <p className="text-center mt-4 text-lg font-semibold">Click to open your special gift!</p>
          </motion.div>
        </div>

        {/* Gift Dialog */}
        <Dialog open={isGiftOpen} onOpenChange={setIsGiftOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Your Special VIP Gift! 🎁</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="p-6 text-center"
              >
                <img 
                  src="/viplogo.png" 
                  alt="VIP Gift" 
                  className="w-32 h-32 mx-auto mb-4 rounded-full shadow-lg"
                />
                <p className="text-lg mb-4">
                  As a valued VIP member, you've unlocked exclusive access to our premium services and special bonuses!
                </p>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="font-semibold text-primary">
                    Enjoy your VIP status and all its amazing benefits!
                  </p>
                </div>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OnlyYou;
