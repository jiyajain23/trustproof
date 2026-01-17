import React, { useState } from 'react';
import { Sparkles, Clock, Users, BrainCircuit, Search, AlertTriangle, Loader2, Bot, History } from 'lucide-react';
import { GlowCard } from '../components/UIComponents';
import { cn } from '../utils';

export default function GeminiAI() {
  const [collusionAnalyzing, setCollusionAnalyzing] = useState(false);
  const [collusionResult, setCollusionResult] = useState(null);
  const [intentText, setIntentText] = useState("");
  const [intentResult, setIntentResult] = useState(null);
  const [decayAnalyzing, setDecayAnalyzing] = useState(false);
  const [decayResult, setDecayResult] = useState(null);
  const [decayInput, setDecayInput] = useState({ 
    text: "The lobster bisque here is to die for! Best I've ever had.", 
    date: "2021-05-15" 
  });

  const mockReviews = [
    { id: 1, user: "User A", text: "Great food, loved the atmosphere! 5 stars.", time: "10:00 AM" },
    { id: 2, user: "User B", text: "Great food, loved the atmosphere! 5 stars.", time: "10:05 AM" },
    { id: 3, user: "User C", text: "The service was slow but food was okay.", time: "11:00 AM" }
  ];

  const runCollusionCheck = () => {
    setCollusionAnalyzing(true);
    setTimeout(() => {
      setCollusionResult({
        detected: true,
        clusters: [
          { ids: [1, 2], reason: "Identical phrasing detected within 5 minute window." }
        ]
      });
      setCollusionAnalyzing(false);
    }, 2000);
  };

  const analyzeIntent = (e) => {
    const text = e.target.value;
    setIntentText(text);
    if (text.length > 5) {
      let type = "Constructive Criticism";
      let color = "text-blue-400";
      const lower = text.toLowerCase();
      if (lower.includes("love") || lower.includes("great")) { 
        type = "Genuine Praise"; 
        color = "text-green-400"; 
      }
      else if (lower.includes("hate") || lower.includes("worst")) { 
        type = "Emotional Rant"; 
        color = "text-red-400"; 
      }
      else if (lower.includes("perfect") && text.length < 20) { 
        type = "Suspicious Over-praise"; 
        color = "text-yellow-400"; 
      }
      setIntentResult({ type, color });
    } else {
      setIntentResult(null);
    }
  };

  const analyzeTrustDecay = () => {
    setDecayAnalyzing(true);
    setTimeout(() => {
      const reviewYear = new Date(decayInput.date).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - reviewYear;
      
      let score = 100;
      let reason = "Review is recent and relevant.";
      let status = "Active";
      let color = "text-green-400";

      if (age > 3) {
        score = 45;
        reason = "Menu overhaul detected in 2023. 'Lobster Bisque' is no longer served.";
        status = "Decayed";
        color = "text-red-400";
      } else if (age > 1) {
        score = 80;
        reason = "Minor seasonal menu updates since posting.";
        status = "Aging";
        color = "text-yellow-400";
      }

      setDecayResult({ score, reason, status, color });
      setDecayAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="relative z-10 w-full h-full overflow-y-auto p-8 pt-24 bg-black">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-blue-400" /> Gemini Intelligence
          </h1>
          <p className="text-neutral-400 text-lg">Advanced AI heuristics for next-gen review integrity.</p>
        </div>

        {/* Trust Decay Engine */}
        <GlowCard glowColor="orange" customSize className="w-full bg-black/60 border border-orange-500/30">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-400" /> Trust Decay Engine
              </h3>
              <p className="text-neutral-400 mb-6 text-sm">
                Solves the "old review problem". Gemini analyzes if a review is still relevant based on business changes over time.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-500 uppercase mb-1 block">Review Content</label>
                  <textarea 
                    value={decayInput.text}
                    onChange={(e) => setDecayInput({...decayInput, text: e.target.value})}
                    className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-500 uppercase mb-1 block">Original Post Date</label>
                  <input 
                    type="date" 
                    value={decayInput.date}
                    onChange={(e) => setDecayInput({...decayInput, date: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none text-sm"
                  />
                </div>
                <button 
                  onClick={analyzeTrustDecay} 
                  disabled={decayAnalyzing}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-lg text-white font-bold flex items-center justify-center gap-2"
                >
                  {decayAnalyzing ? <Loader2 className="animate-spin w-4 h-4" /> : <History className="w-4 h-4" />}
                  Analyze Temporal Relevance
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center items-center">
              {decayResult ? (
                <div className="text-center w-full animate-in zoom-in">
                  <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className={decayResult.color} strokeDasharray="377" strokeDashoffset={377 - (377 * decayResult.score) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">{decayResult.score}%</span>
                      <span className="text-[10px] text-neutral-400 uppercase">Relevance</span>
                    </div>
                  </div>
                  <h4 className={cn("text-xl font-bold mb-2", decayResult.color)}>{decayResult.status}</h4>
                  <p className="text-sm text-neutral-300 bg-black/40 p-3 rounded-lg border border-white/5">
                    <Bot className="w-4 h-4 inline mr-2 -mt-1 text-blue-400" />
                    "{decayResult.reason}"
                  </p>
                </div>
              ) : (
                <div className="text-center text-neutral-500">
                  <Clock className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Select a date and review to check temporal validity.</p>
                </div>
              )}
            </div>
          </div>
        </GlowCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Collusion Detection */}
          <GlowCard glowColor="purple" customSize className="w-full bg-black/60 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-400" /> Collusion Detection
            </h3>
            <p className="text-neutral-400 mb-6 text-sm">Identifies review clusters with suspicious similarity patterns.</p>
            
            <div className="space-y-3 mb-6">
              {mockReviews.map(r => (
                <div key={r.id} className={cn("p-3 rounded-lg border", collusionResult?.clusters?.[0]?.ids?.includes(r.id) ? "bg-red-500/10 border-red-500/50" : "bg-white/5 border-white/10")}>
                  <div className="flex justify-between text-xs text-neutral-500 mb-1">
                    <span>{r.user}</span><span>{r.time}</span>
                  </div>
                  <p className="text-sm text-neutral-300">"{r.text}"</p>
                </div>
              ))}
            </div>

            {collusionResult && (
              <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg mb-4 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <p className="text-red-400 font-bold text-sm">Collusion Detected</p>
                  <p className="text-red-300/80 text-xs">{collusionResult.clusters[0].reason}</p>
                </div>
              </div>
            )}

            <button 
              onClick={runCollusionCheck} 
              disabled={collusionAnalyzing}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-bold flex items-center justify-center gap-2"
            >
              {collusionAnalyzing ? <Loader2 className="animate-spin" /> : <Search className="w-4 h-4" />}
              {collusionAnalyzing ? "Analyzing Patterns..." : "Run Forensic Scan"}
            </button>
          </GlowCard>

          {/* Intent Analysis */}
          <GlowCard glowColor="blue" customSize className="w-full bg-black/60 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-blue-400" /> Intent Analysis
            </h3>
            <p className="text-neutral-400 mb-6 text-sm">Decodes the underlying intent behind customer feedback.</p>

            <div className="space-y-4">
              <textarea 
                value={intentText}
                onChange={analyzeIntent}
                placeholder="Type a review to analyze intent..."
                className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 outline-none resize-none"
              />
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center min-h-[120px]">
                {intentResult ? (
                  <div className="text-center animate-in zoom-in">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Detected Intent</p>
                    <p className={cn("text-2xl font-bold", intentResult.color)}>{intentResult.type}</p>
                  </div>
                ) : (
                  <p className="text-neutral-600 italic">Waiting for input...</p>
                )}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}

