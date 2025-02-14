
import React, { useState } from 'react';
import { MenuBar } from '@/components/MenuBar';
import { motion } from 'framer-motion';
import { Gift, Stars } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ScratchCard from '@/components/ScratchCard';

const prizes = [
  { id: 1, value: "50 Free Spins", gradient: "linear-gradient(135deg, #FF6B6B, #FFE66D)" },
  { id: 2, value: "$100 Bonus", gradient: "linear-gradient(135deg, #4ECDC4, #45B7AF)" },
  { id: 3, value: "150% Deposit Match", gradient: "linear-gradient(135deg, #9B89B3, #7E69AB)" },
  { id: 4, value: "25% Cashback", gradient: "linear-gradient(135deg, #FF8C94, #FF6F91)" },
  { id: 5, value: "VIP Points x2", gradient: "linear-gradient(135deg, #845EC2, #6F44C1)" }
];

const OnlyYou = () => {
  const [revealedPrizes, setRevealedPrizes] = useState<Set<number>>(new Set());
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<typeof prizes[0] | null>(null);
  const { toast } = useToast();

  const handleScratchComplete = (prizeId: number) => {
    if (!revealedPrizes.has(prizeId)) {
      const prize = prizes.find(p => p.id === prizeId);
      setRevealedPrizes(new Set([...revealedPrizes, prizeId]));
      setCurrentPrize(prize || null);
      setShowCongrats(true);
      
      toast({
        title: "🎉 Prize Revealed!",
        description: "Check out your amazing reward!",
        duration: 3000,
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {prizes.map((prize) => (
            <motion.div 
              key={prize.id}
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: prize.id * 0.1 }}
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-20"></div>
              <div className="relative">
                <ScratchCard
                  width={200}
                  height={200}
                  onComplete={() => handleScratchComplete(prize.id)}
                >
                  <div 
                    className="w-[200px] h-[200px] flex items-center justify-center p-6 rounded-lg"
                    style={{ 
                      background: prize.gradient,
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">💎</div>
                      <div className="text-white font-bold text-xl leading-tight">
                        {prize.value}
                      </div>
                      <div className="text-white/80 text-sm mt-2">
                        Exclusive Reward
                      </div>
                    </div>
                  </div>
                </ScratchCard>
              </div>
            </motion.div>
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

        {/* Congratulations Dialog */}
        <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                🎊 Congratulations! 🎊
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="p-6 text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div 
                    className="w-full h-full rounded-full"
                    style={{ 
                      background: currentPrize?.gradient || 'linear-gradient(135deg, #845EC2, #6F44C1)',
                      opacity: 0.2
                    }}
                  />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  🎁
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">You've Won!</h3>
              <div 
                className="p-4 rounded-lg mb-4 text-xl font-bold"
                style={{ 
                  background: currentPrize?.gradient || 'linear-gradient(135deg, #845EC2, #6F44C1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {currentPrize?.value}
              </div>
              
              <p className="text-muted-foreground mb-4">
                Your exclusive VIP reward has been added to your account! 🌟
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
                onClick={() => setShowCongrats(false)}
              >
                Claim Reward
              </motion.button>
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OnlyYou;
