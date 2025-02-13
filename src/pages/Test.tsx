
import React from 'react';
import { MenuBar } from '@/components/MenuBar';

const Test = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <MenuBar />
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Test -1</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This is the test page content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
