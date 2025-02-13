import React, { useState } from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Gift, Headset, Trophy, ChevronDown, ChevronUp, Info, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    ],
    qrCodes: {
      whatsapp: "/whatsapp-qr.png",
      telegram: "/telegram-qr.png"
    }
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setSelectedCard(prev => prev === index ? null : index);
  };

  const renderQRCodes = (index: number) => {
    if (index !== 1) return null; // Only show QR codes for Dedicated VIP Liaison
    
    return (
      <div className="mt-8">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              WhatsApp Contact
            </h3>
            <div className="p-4 bg-white rounded-lg">
              <img 
                src="/whatsapp-qr.png" 
                alt="WhatsApp QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">Scan to contact us on WhatsApp</p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Telegram Contact
            </h3>
            <div className="p-4 bg-white rounded-lg">
              <img 
                src="/telegram-qr.png" 
                alt="Telegram QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">Scan to contact us on Telegram</p>
          </div>
        </div>
      </div>
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
                  className={`h-full backdrop-blur-sm bg-card/50 border cursor-pointer hover:border-primary/50 transition-colors ${selectedCard === index ? 'border-primary' : ''}`}
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
                      {selectedCard === index ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedCard !== null && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mt-8"
              >
                <Card className="backdrop-blur-sm bg-card/50 border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {privileges[selectedCard].icon}
                      {privileges[selectedCard].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {privileges[selectedCard].details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: detailIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <Info className="w-5 h-5 text-primary mt-0.5" />
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                    {renderQRCodes(selectedCard)}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Privilege;
