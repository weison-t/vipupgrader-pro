
import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Gift, Headset, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const privileges = [
  {
    title: "Exclusive Promotion & Bonus",
    description: "Access exclusive promotions and receive special bonuses available only to our VIP members. Enjoy enhanced rewards, boosted rates, and priority access to new offers.",
    icon: <Gift className="w-12 h-12 text-vip-gold" />
  },
  {
    title: "Dedicated VIP Liaison",
    description: "Experience personalized service with your dedicated VIP liaison. Get priority support, custom solutions, and round-the-clock assistance tailored to your needs.",
    icon: <Headset className="w-12 h-12 text-vip-gold" />
  },
  {
    title: "Surprise VIP Experiences & Gifts",
    description: "Receive exclusive invitations to special events, surprise gifts, and unique experiences designed specifically for our valued VIP members.",
    icon: <Trophy className="w-12 h-12 text-vip-gold" />
  }
];

const Privilege = () => {
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
                <Card className="h-full backdrop-blur-sm bg-card/50 border">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privilege;
