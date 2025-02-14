
import React, { useRef, useState, useEffect } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  children: React.ReactNode;
  onComplete?: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, children, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e5e5e5');
    gradient.addColorStop(0.5, '#f5f5f5');
    gradient.addColorStop(1, '#e5e5e5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add "Scratch Me!" text
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#666';
    ctx.fillText('Scratch Me!', width / 2, height / 2);

    // Add sparkle pattern
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    
    // Draw diagonal lines
    for (let i = -height; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }
    
    // Draw stars
    const drawStar = (x: number, y: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          x + size * Math.cos((i * 4 * Math.PI) / 5),
          y + size * Math.sin((i * 4 * Math.PI) / 5)
        );
      }
      ctx.closePath();
      ctx.strokeStyle = '#ccc';
      ctx.stroke();
    };

    // Add random stars
    for (let i = 0; i < 10; i++) {
      drawStar(
        Math.random() * width,
        Math.random() * height,
        3
      );
    }
  }, [width, height]);

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isScratching) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) 
      ? e.touches[0].clientX - rect.left 
      : e.clientX - rect.left;
    const y = ('touches' in e) 
      ? e.touches[0].clientY - rect.top 
      : e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    
    // Create a more natural scratch effect
    const radius = 20;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Calculate revealed percentage
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) transparent++;
    }
    const percentRevealed = (transparent / (pixels.length / 4)) * 100;
    setRevealed(percentRevealed);

    if (percentRevealed > 50 && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="relative" style={{ width, height }}>
      <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 cursor-pointer rounded-lg"
        onMouseDown={() => setIsScratching(true)}
        onMouseUp={() => setIsScratching(false)}
        onMouseMove={scratch}
        onTouchStart={() => setIsScratching(true)}
        onTouchEnd={() => setIsScratching(false)}
        onTouchMove={scratch}
      />
    </div>
  );
};

export default ScratchCard;
