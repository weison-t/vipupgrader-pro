
import React from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Map, Navigation, MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Journey = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Your VIP Journey</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your progress and discover the incredible journey ahead as a valued VIP member.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/50 border">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Map className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle>Current Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    You are at the beginning of an exciting journey. Keep playing to unlock more rewards!
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/50 border">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Navigation className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle>Next Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Continue your journey to unlock exclusive VIP privileges and rewards.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
