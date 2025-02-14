
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

    // Create metallic gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e0e0e0');
    gradient.addColorStop(0.2, '#f5f5f5');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(0.8, '#f5f5f5');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add "Scratch Here!" text with shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 4;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#666';
    ctx.fillText('Scratch Here!', width / 2, height / 2);
    ctx.restore();

    // Add circular pattern
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    
    // Create circular pattern
    for (let radius = 20; radius < Math.max(width, height); radius += 20) {
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Add sparkles
    const drawSparkle = (x: number, y: number) => {
      const size = 3;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
    };

    // Add random sparkles
    for (let i = 0; i < 15; i++) {
      drawSparkle(
        Math.random() * width,
        Math.random() * height
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
    
    // Create a more sophisticated scratch effect
    const radius = 20;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
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

    // Changed from 40 to 25 percent threshold
    if (percentRevealed > 25 && onComplete) {
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
