"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const AIBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Node class for neural network visualization
    class Node {
      x: number;
      y: number;
      radius: number;
      color: string;
      connections: Node[];
      velocity: { x: number; y: number };
      
      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.connections = [];
        this.velocity = {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2
        };
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update(canvas: HTMLCanvasElement | null) {
        // Move node
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Bounce off edges
        if (this.x + this.radius > canvas!.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        }
        
        if (this.y + this.radius > canvas!.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }
        
        this.draw();
      }
      
      connect() {
        if (!ctx) return;
        
        this.connections.forEach(node => {
          const distance = Math.hypot(this.x - node.x, this.y - node.y);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            
            // Gradient line based on distance
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
            ctx.lineWidth = opacity * 2;
            ctx.stroke();
          }
        });
      }
    }
    
    // Create nodes
    const nodeCount = Math.min(50, Math.floor(window.innerWidth / 40));
    const nodes: Node[] = [];
    
    // Use deterministic positions for initial render
    const createDeterministicNodes = () => {
      for (let i = 0; i < nodeCount; i++) {
        const radius = 1 + (i % 3);
        const x = (canvas.width / nodeCount) * i + radius;
        const y = (canvas.height / 2) + (i % 5) * 30 - 60;
        
        // Different colors for some nodes to represent AI "thinking"
        const color = i % 8 === 0 
          ? 'rgba(6, 182, 212, 0.8)' // Cyan for special nodes
          : 'rgba(255, 255, 255, 0.3)'; // White for regular nodes
        
        nodes.push(new Node(x, y, radius, color));
      }
    };
    
    createDeterministicNodes();
    
    // Connect nodes
    nodes.forEach(node => {
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          node.connections.push(otherNode);
        }
      });
    });
    
    // Pulse effect for nodes
    nodes.forEach((node, index) => {
      gsap.to(node, {
        radius: node.radius * 1.5,
        duration: 1 + (index % 5) * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.05
      });
    });
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind nodes)
      nodes.forEach(node => node.connect());
      
      // Then draw and update nodes
      nodes.forEach(node => node.update(canvas));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add glow effects
    const glowContainer = document.createElement('div');
    glowContainer.className = 'absolute inset-0 pointer-events-none';
    canvas.parentNode?.appendChild(glowContainer);
    
    const createGlow = (color: string, position: string) => {
      const glow = document.createElement('div');
      glow.className = `absolute ${position} rounded-full blur-[100px] opacity-20`;
      glow.style.backgroundColor = color;
      glow.style.width = '30vw';
      glow.style.height = '30vw';
      glowContainer.appendChild(glow);
      return glow;
    };
    
    const topGlow = createGlow('#06b6d4', 'top-0 -left-20'); // Cyan
    const bottomGlow = createGlow('#3b0764', 'bottom-0 -right-20'); // Purple
    
    // Animate glows
    gsap.to([topGlow, bottomGlow], {
      opacity: 0.1,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 2
    });
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
      gsap.killTweensOf(nodes);
      gsap.killTweensOf([topGlow, bottomGlow]);
      glowContainer.remove();
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      {!isClient && (
        <div className="absolute inset-0 bg-black">
          {/* Static placeholder for server-side rendering */}
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-900/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-[150px]" />
        </div>
      )}
    </div>
  );
};

export default AIBackground; 