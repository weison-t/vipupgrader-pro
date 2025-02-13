
import React from 'react';
import { MenuBar } from '@/components/MenuBar';

const Privilege = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <h1 className="text-4xl font-bold text-center mb-8">VIP Privileges</h1>
        <p className="text-center text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
};

export default Privilege;
