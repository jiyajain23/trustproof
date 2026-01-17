import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Receipt, 
  Star, 
  Wallet, 
  LayoutDashboard, 
  Code, 
  Lock, 
  Loader2,
  Menu,
  Sparkles,
  Globe,
  Activity,
  Zap,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './utils';
import ReviewSubmission from './views/ReviewSubmission';
import GeminiAI from './views/GeminiAI';
import { Spotlight, SplineScene, HeroSection, GlowCard } from './components/UIComponents';
import { FloatingDoodles, ParticleField, AnimatedGrid } from './components/AnimatedDoodles';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('page1');
  const [verificationResult, setVerificationResult] = useState(null);

  // View Entry Page
  const ViewEntry = () => (
    <div className="w-full min-h-screen bg-black relative overflow-y-auto flex flex-col pt-16">
      <div className="w-full min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-black/[0.96]">
        <AnimatedGrid />
        <ParticleField />
        <FloatingDoodles />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="flex h-full w-full max-w-7xl mx-auto z-10 flex-col md:flex-row relative">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center text-center md:text-left">
            <motion.h1 
              className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trust <br/> Proof
            </motion.h1>
            <motion.p 
              className="mt-6 text-neutral-400 max-w-lg text-xl leading-relaxed mx-auto md:mx-0 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The only review platform that cryptographically links feedback to real transactions. No fakes. Just truth.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => setCurrentPage('page4')} 
                className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                <Star className="w-5 h-5" /> Write Review
              </button>
              <button 
                onClick={() => setCurrentPage('gemini')} 
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md hover:scale-105"
              >
                <Sparkles className="w-5 h-5" /> AI Features
              </button>
            </motion.div>
          </div>

          <div className="flex-1 relative min-h-[500px] flex items-center justify-center">
            <SplineScene className="w-full h-full" />
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </div>

      <div className="w-full bg-black/80 backdrop-blur-md border-t border-white/5 py-4 overflow-hidden flex whitespace-nowrap z-30 sticky bottom-0">
        <div className="animate-marquee flex gap-16 text-neutral-400 text-sm font-mono items-center">
          <span className="flex items-center gap-2"><Globe className="w-3 h-3 text-blue-500"/> User #492 verified at Starbucks NYC</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-green-500"/> Bill #9921 verified for $420.00</span>
          <span className="flex items-center gap-2"><Shield className="w-3 h-3 text-purple-500"/> New Business Joined: Tesla Motors</span>
          <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-yellow-500"/> User #882 just earned 50 tokens</span>
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 30s linear infinite; }`}</style>
    </div>
  );

  // View Result Page
  const ViewResult = () => {
    if (!verificationResult) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-400">No verification result available</p>
        </div>
      );
    }

    const isVerified = verificationResult.review_status === 'TRUSTED';
    
    return (
      <HeroSection
        title="Verification Complete"
        subtitle={{ regular: "Trust ", gradient: "Analysis" }}
        description="Your review has been validated"
        gridOptions={{ angle: 65, opacity: 0.4 }}
      >
        <GlowCard 
          glowColor={isVerified ? "green" : "red"} 
          customSize 
          className="w-full max-w-4xl bg-black/80 text-center"
        >
          <div className="space-y-8">
            <div className="relative">
              <div className={`absolute inset-0 ${isVerified ? 'bg-green-500' : 'bg-red-500'} blur-3xl opacity-20 rounded-full`} />
              <div className={`w-24 h-24 ${isVerified ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] relative z-10 mx-auto`}>
                <ShieldCheck className="w-12 h-12 text-black" />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {verificationResult.review_status}
              </h2>
              <p className="text-neutral-400 mb-6">
                Trust Score: {verificationResult.final_trust_score}%
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-neutral-500 uppercase mb-1">Trust Score</p>
                <p className="text-3xl font-bold text-green-400">{verificationResult.final_trust_score}%</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-neutral-500 uppercase mb-1">Level</p>
                <p className="text-3xl font-bold text-blue-400">{verificationResult.trust_level}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-3">
              <h3 className="text-white font-bold text-lg mb-4">Validation Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-neutral-400 text-sm">Purchase Verification</span>
                  <span className="text-green-400 text-sm font-bold">{verificationResult.breakdown?.purchase_verification || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-neutral-400 text-sm">Text Authenticity</span>
                  <span className="text-green-400 text-sm font-bold">{verificationResult.breakdown?.text_authenticity || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-neutral-400 text-sm">Experience Consistency</span>
                  <span className="text-green-400 text-sm font-bold">{verificationResult.breakdown?.experience_consistency || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <span className="text-neutral-400 text-sm">Media Authenticity</span>
                  <span className="text-green-400 text-sm font-bold">{verificationResult.breakdown?.media_authenticity || 'N/A'}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('page1')} 
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </GlowCard>
      </HeroSection>
    );
  };

  // NavBar Component
  const NavBar = () => (
    <div className="fixed top-0 left-0 w-full h-16 bg-black/50 backdrop-blur-lg border-b border-white/10 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('page1')}>
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black text-lg">T</div>
        <span className="text-white font-bold hidden md:block">TrustProof</span>
      </div>
      
      <div className="flex items-center gap-2 justify-center">
        <button 
          onClick={() => setCurrentPage('page1')}
          className={cn("p-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm min-w-[80px]", currentPage === 'page1' ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white hover:bg-white/5")}
        >
          <Menu className="w-6 h-6" />
          <span className="hidden lg:block">Home</span>
        </button>
        <button 
          onClick={() => setCurrentPage('page4')}
          className={cn("p-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm min-w-[80px]", currentPage === 'page4' ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white hover:bg-white/5")}
        >
          <Receipt className="w-6 h-6" />
          <span className="hidden lg:block">Review</span>
        </button>
        <button 
          onClick={() => setCurrentPage('gemini')}
          className={cn("p-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm min-w-[80px]", currentPage === 'gemini' ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white hover:bg-white/5")}
        >
          <Sparkles className="w-6 h-6" />
          <span className="hidden lg:block">Gemini AI</span>
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      <NavBar />
      
      <div className="flex-1 relative h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pt-16">
        {currentPage === 'page1' && <ViewEntry />}
        {currentPage === 'page4' && (
          <ReviewSubmission 
            setVerificationResult={setVerificationResult}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'page5' && <ViewResult />}
        {currentPage === 'gemini' && <GeminiAI />}
      </div>
    </div>
  );
}

