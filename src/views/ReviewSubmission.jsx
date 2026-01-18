import React, { useState } from 'react';
import { Star, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { GlowCard, HeroSection } from '../components/UIComponents';
import { callAPI } from '../utils';
import { cn } from '../utils';

export default function ReviewSubmission({ setVerificationResult, setCurrentPage }) {
  const [formData, setFormData] = useState({
    businessId: '',
    billId: '',
    reviewText: '',
    mediaFile: null
  });
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState({});
  const [result, setResult] = useState(null);

  const steps = [
    { id: 1, label: 'Intake', icon: CheckCircle2 },
    { id: 2, label: 'Purchase', icon: CheckCircle2 },
    { id: 3, label: 'Text', icon: CheckCircle2 },
    { id: 4, label: 'Consistency', icon: CheckCircle2 },
    { id: 5, label: 'Media', icon: CheckCircle2 },
    { id: 6, label: 'Score', icon: CheckCircle2 }
  ];

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCurrentStep(1);
    setStepStatus({});

    try {
      // STEP 1: Review Intake
      setStepStatus({ 1: 'active' });
      const intakeResponse = await callAPI('/review/intake', {
        business_id: formData.businessId,
        bill_id: formData.billId,
        review_text: formData.reviewText,
        media_uploaded: !!formData.mediaFile
      });
      setStepStatus({ 1: 'completed' });
      setCurrentStep(2);
      await sleep(500);

      // STEP 2: Purchase Verification
      setStepStatus({ 2: 'active' });
      const purchaseResponse = await callAPI('/verify/purchase', {
        bill_id: formData.billId,
        business_id: formData.businessId
      });
      setStepStatus({ 2: 'completed' });
      setCurrentStep(3);
      await sleep(500);

      // STEP 3: Text Authenticity
      setStepStatus({ 3: 'active' });
      const textResponse = await callAPI('/auth/text', {
        review_text: formData.reviewText
      });
      setStepStatus({ 3: 'completed' });
      setCurrentStep(4);
      await sleep(500);

      // STEP 4: Consistency Check
      setStepStatus({ 4: 'active' });
      const consistencyScore = textResponse.text_valid ? 0.85 : 0.45;
      const consistencyResponse = await callAPI('/review/consistency-check', {
        consistency_score: consistencyScore,
        notes: 'Automated consistency validation'
      });
      setStepStatus({ 4: 'completed' });
      setCurrentStep(5);
      await sleep(500);

      // STEP 5: Media Validation
      let mediaScore = 0.5;
      if (formData.mediaFile) {
        setStepStatus({ 5: 'active' });
        const formDataUpload = new FormData();
        formDataUpload.append('file', formData.mediaFile);

        // NOTE: API key temporarily exposed for hackathon demo.
        // In production, all tool calls are routed via backend.
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://trust-proof.onrender.com/tools';
        const API_KEY = import.meta.env.VITE_API_KEY || '7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW';
        
        const uploadResponse = await fetch(`${API_BASE_URL}/media/upload`, {
          method: 'POST',
          headers: { 'X-API-KEY': API_KEY },
          body: formDataUpload
        });
        const uploadData = await uploadResponse.json();
        
        const mediaResponse = await callAPI('/auth/media', {
          media_id: uploadData.media_id,
          media_url: uploadData.media_url,
          media_type: formData.mediaFile.type.startsWith('image/') ? 'image' : 'video'
        });
        mediaScore = mediaResponse.media_score;
        setStepStatus({ 5: 'completed' });
      } else {
        setStepStatus({ 5: 'skipped' });
      }
      setCurrentStep(6);
      await sleep(500);

      // STEP 6: Trust Score
      setStepStatus({ 6: 'active' });
      const trustScoreResponse = await callAPI('/trust/score', {
        text_score: textResponse.text_score,
        media_score: mediaScore,
        purchase_verified: purchaseResponse.verified,
        consistency_score: consistencyScore
      });
      setStepStatus({ 6: 'completed' });
      
      setResult(trustScoreResponse);
      setVerificationResult(trustScoreResponse);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setCurrentPage('page5');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console and try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <HeroSection
        title="AI Verification"
        subtitle={{ regular: "Analyzing your ", gradient: "review" }}
        description="Our AI is validating authenticity, checking consistency, and generating trust scores."
        gridOptions={{ angle: 65, opacity: 0.4, cellSize: 50 }}
      >
        <GlowCard glowColor="purple" customSize className="w-full max-w-4xl bg-black/80">
          <div className="space-y-8">
            <div className="flex justify-center gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const status = stepStatus[step.id];
                return (
                  <div key={step.id} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                      status === 'completed' ? "bg-green-500 border-green-500" :
                      status === 'active' ? "bg-purple-500 border-purple-500 animate-pulse" :
                      "bg-gray-800 border-gray-700"
                    )}>
                      {status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : status === 'active' ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Icon className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{step.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-gray-300">Processing step {currentStep} of 6...</p>
            </div>
          </div>
        </GlowCard>
      </HeroSection>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black relative overflow-y-auto overflow-x-hidden pt-16 pb-8">
      <HeroSection
        title="Review Submission"
        subtitle={{ regular: "Submit a ", gradient: "verified review" }}
        description="Share your experience with proof of purchase"
        gridOptions={{ angle: 65, opacity: 0.4, cellSize: 50 }}
        className="min-h-full"
      >
        <GlowCard glowColor="blue" customSize className="w-full max-w-3xl bg-black/80">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Business</label>
            <select
              value={formData.businessId}
              onChange={(e) => setFormData({...formData, businessId: e.target.value})}
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
            >
              <option value="">-- Select Business --</option>
              <option value="BIZ-HOTEL-5678">Sunset Hotel (BIZ-HOTEL-5678)</option>
              <option value="BIZ-REST-9012">Grand Restaurant (BIZ-REST-9012)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Bill/Receipt ID</label>
            <input
              type="text"
              value={formData.billId}
              onChange={(e) => setFormData({...formData, billId: e.target.value})}
              placeholder="e.g., BILL-2024-001234"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none font-mono"
            />
            <small className="text-xs text-neutral-500">
              Valid IDs: BILL-2024-001234, BILL-2024-001235, BILL-2024-001236
            </small>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    rating >= star ? "text-yellow-400 bg-yellow-400/10" : "text-neutral-600 hover:text-neutral-400"
                  )}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Your Review</label>
            <textarea
              value={formData.reviewText}
              onChange={(e) => setFormData({...formData, reviewText: e.target.value})}
              placeholder="Share your experience..."
              required
              rows={6}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 outline-none resize-none placeholder:text-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-neutral-400">Upload Photo/Video (Optional)</label>
            <input
              type="file"
              onChange={(e) => setFormData({...formData, mediaFile: e.target.files[0]})}
              accept="image/*,video/*"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Submit & Verify Review
          </button>
        </form>
        </GlowCard>
      </HeroSection>
    </div>
  );
}

