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
  const [showPrizeDetails, setShowPrizeDetails] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<typeof prizes[0] | null>(null);
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

  const handleShowDetails = (prize: typeof prizes[0]) => {
    setSelectedPrize(prize);
    setShowPrizeDetails(true);
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
                {revealedPrizes.has(prize.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <button
                      onClick={() => handleShowDetails(prize)}
                      className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Stars className="w-4 h-4" />
                      View Details
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setIsGiftOpen(true)}
          >
            <div className="w-72 h-72 relative">
              <motion.div
                className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                animate={{
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: 'linear-gradient(135deg, #FDE1D3, #F7CAC9)',
                }}
              >
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 w-12 h-full bg-gradient-to-b from-[#9b87f5] to-[#7E69AB]"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-full h-12 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                  
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-24 h-24 relative"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="absolute left-0 w-10 h-16 rounded-full bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] origin-right"
                        animate={{
                          rotate: [-20, -15, -20],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <motion.div
                        className="absolute right-0 w-10 h-16 rounded-full bg-gradient-to-bl from-[#9b87f5] to-[#7E69AB] origin-left"
                        animate={{
                          rotate: [20, 15, 20],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: [0.8, 0.85, 0.8],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Gift className="w-32 h-32 text-[#7E69AB] opacity-80" />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 text-yellow-300"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <motion.p 
              className="text-center mt-6 text-lg font-semibold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Click to open your special gift!
            </motion.p>
          </motion.div>
        </div>

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

        <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
          <DialogContent className="sm:max-w-[425px] duration-500">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    🎊 Congratulations! 🎊
                  </motion.span>
                </DialogTitle>
              </DialogHeader>
              <div className="p-6 text-center">
                <motion.div 
                  className="relative w-24 h-24 mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.6,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
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
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center text-4xl"
                  >
                    🎁
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  You've Won!
                </motion.h3>
                
                <motion.div 
                  className="p-4 rounded-lg mb-4 text-xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  style={{ 
                    background: currentPrize?.gradient || 'linear-gradient(135deg, #845EC2, #6F44C1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {currentPrize?.value}
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  Your exclusive VIP reward has been added to your account! 🌟
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
                  onClick={() => setShowCongrats(false)}
                >
                  Claim Reward
                </motion.button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>

        <Dialog open={showPrizeDetails} onOpenChange={setShowPrizeDetails}>
          <DialogContent className="sm:max-w-[425px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
                  <Stars className="w-6 h-6 text-[#9b87f5]" />
                  Prize Details
                </DialogTitle>
              </DialogHeader>
              {selectedPrize && (
                <div className="p-6">
                  <div 
                    className="w-full h-32 rounded-lg mb-6 flex items-center justify-center"
                    style={{ background: selectedPrize.gradient }}
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-white text-2xl font-bold"
                    >
                      {selectedPrize.value}
                    </motion.div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">How to Claim</h4>
                      <p className="text-sm text-muted-foreground">
                        Your reward has been automatically added to your account. You can use it on your next gaming session!
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        This reward is valid for 30 days from the date of winning. Minimum wagering requirements may apply.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    className="w-full mt-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPrizeDetails(false)}
                  >
                    Got it!
                  </motion.button>
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OnlyYou;
