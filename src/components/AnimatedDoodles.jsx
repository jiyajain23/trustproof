import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Sparkles, Zap, Star } from 'lucide-react';

export const FloatingDoodles = () => {
  const doodles = [
    { icon: Shield, x: '10%', y: '20%', delay: 0, size: 40, color: 'blue' },
    { icon: CheckCircle2, x: '85%', y: '30%', delay: 0.2, size: 35, color: 'green' },
    { icon: Sparkles, x: '15%', y: '70%', delay: 0.4, size: 45, color: 'purple' },
    { icon: Zap, x: '90%', y: '60%', delay: 0.6, size: 30, color: 'yellow' },
    { icon: Star, x: '50%', y: '10%', delay: 0.8, size: 25, color: 'orange' },
    { icon: Shield, x: '75%', y: '80%', delay: 1, size: 35, color: 'cyan' },
  ];

  const colorMap = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
    cyan: 'text-cyan-400'
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {doodles.map((doodle, i) => {
        const Icon = doodle.icon;
        return (
          <motion.div
            key={i}
            className={`absolute ${colorMap[doodle.color]} opacity-30`}
            style={{ left: doodle.x, top: doodle.y }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: doodle.delay,
              ease: "easeInOut"
            }}
          >
            <Icon size={doodle.size} />
          </motion.div>
        );
      })}
    </div>
  );
};

export const ParticleField = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

