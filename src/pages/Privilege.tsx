
import React, { useState } from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Gift, Headset, Trophy, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const privileges = [
  {
    title: "Exclusive Promotion & Bonus",
    description: "Access exclusive promotions and receive special bonuses available only to our VIP members. Enjoy enhanced rewards, boosted rates, and priority access to new offers.",
    icon: <Gift className="w-12 h-12 text-vip-gold" />,
    details: [
      "Up to 200% Welcome Bonus on your first deposit",
      "Weekly Cashback rewards up to 15%",
      "Monthly reload bonuses exclusive to VIP members",
      "Special seasonal promotions with enhanced rates"
    ]
  },
  {
    title: "Dedicated VIP Liaison",
    description: "Experience personalized service with your dedicated VIP liaison. Get priority support, custom solutions, and round-the-clock assistance tailored to your needs.",
    icon: <Headset className="w-12 h-12 text-vip-gold" />,
    details: [
      "24/7 priority support access",
      "Personal account manager",
      "Customized banking solutions",
      "Expedited withdrawal processing"
    ]
  },
  {
    title: "Surprise VIP Experiences & Gifts",
    description: "Receive exclusive invitations to special events, surprise gifts, and unique experiences designed specifically for our valued VIP members.",
    icon: <Trophy className="w-12 h-12 text-vip-gold" />,
    details: [
      "Exclusive event invitations",
      "Birthday and anniversary surprises",
      "Luxury gift packages",
      "VIP-only tournaments and competitions"
    ]
  }
];

const Privilege = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">VIP Privileges</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the exclusive benefits and privileges available to our valued VIP members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privileges.map((privilege, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card 
                  className="h-full backdrop-blur-sm bg-card/50 border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => toggleCard(index)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      {privilege.icon}
                    </div>
                    <CardTitle className="text-xl">{privilege.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">
                      {privilege.description}
                    </CardDescription>
                    <div className="flex justify-center mt-4">
                      {expandedCards.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
                <AnimatePresence>
                  {expandedCards.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 space-y-3"
                    >
                      {privilege.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-start gap-3 bg-card/50 backdrop-blur-sm p-4 rounded-lg border"
                        >
                          <Info className="w-5 h-5 text-primary mt-0.5" />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privilege;
