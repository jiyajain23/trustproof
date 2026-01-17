"""
TrustProof Backend API Server
Implements all three tools: Review Processing, Authenticity Validation, and Trust Scoring
"""

from fastapi import FastAPI, HTTPException, Header, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Literal
import uvicorn
from datetime import datetime
import random
import hashlib

app = FastAPI(title="TrustProof Backend APIs", version="1.0.0")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security: API Key validation
API_KEY = "7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW"

def verify_api_key(x_api_key: str):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return True

# ============================================================================
# TOOL 1: REVIEW PROCESSING
# ============================================================================

class ReviewIntakeRequest(BaseModel):
    business_id: str
    bill_id: str
    review_text: str
    media_uploaded: bool = False

class ConsistencyCheckRequest(BaseModel):
    consistency_score: float = Field(..., ge=0, le=1)
    notes: Optional[str] = None

class PurchaseVerifyRequest(BaseModel):
    bill_id: str
    business_id: str

# In-memory storage (use database in production)
reviews_db = {}
verified_bills = {
    "BILL-2024-001234": {"business_id": "BIZ-HOTEL-5678", "amount": 2500.0, "date": "2024-01-14"},
    "BILL-2024-001235": {"business_id": "BIZ-REST-9012", "amount": 1200.0, "date": "2024-01-13"},
    "BILL-2024-001236": {"business_id": "BIZ-HOTEL-5678", "amount": 3500.0, "date": "2024-01-12"},
}

@app.post("/tools/review/intake")
async def submit_review(request: ReviewIntakeRequest, x_api_key: str = Header(...)):
    """Submit a customer review"""
    verify_api_key(x_api_key)
    try:
        review_id = hashlib.md5(f"{request.bill_id}{datetime.now()}".encode()).hexdigest()[:12]
        
        reviews_db[review_id] = {
            "business_id": request.business_id,
            "bill_id": request.bill_id,
            "review_text": request.review_text,
            "media_uploaded": request.media_uploaded,
            "timestamp": datetime.now().isoformat()
        }
        
        return {
            "status": "success",
            "review_id": review_id,
            "message": "Review submitted successfully",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tools/review/consistency-check")
async def check_consistency(request: ConsistencyCheckRequest, x_api_key: str = Header(...)):
    """Validate experience consistency"""
    verify_api_key(x_api_key)
    try:
        # Determine consistency level
        if request.consistency_score >= 0.8:
            verdict = "Highly Consistent"
        elif request.consistency_score >= 0.5:
            verdict = "Moderately Consistent"
        else:
            verdict = "Suspicious Pattern Detected"
        
        return {
            "status": "success",
            "consistency_score": request.consistency_score,
            "verdict": verdict,
            "notes": request.notes or "Automated consistency validation completed",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tools/verify/purchase")
async def verify_purchase(request: PurchaseVerifyRequest, x_api_key: str = Header(...)):
    """Verify purchase authenticity"""
    verify_api_key(x_api_key)
    try:
        # Check if bill exists and matches business
        bill_data = verified_bills.get(request.bill_id)
        
        if not bill_data:
            return {
                "verified": False,
                "confidence": 0.0,
                "message": "Bill ID not found in records",
                "transaction_date": None,
                "amount": None
            }
        
        if bill_data["business_id"] != request.business_id:
            return {
                "verified": False,
                "confidence": 0.0,
                "message": "Bill ID does not match business records",
                "transaction_date": None,
                "amount": None
            }
        
        return {
            "verified": True,
            "confidence": 0.95,
            "message": "Purchase verified successfully",
            "transaction_date": bill_data["date"],
            "amount": bill_data["amount"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# TOOL 2: AUTHENTICITY VALIDATION
# ============================================================================

class TextAuthRequest(BaseModel):
    review_text: str

class MediaAuthRequest(BaseModel):
    media_id: str
    media_url: str
    media_type: Literal["image", "video"]

# Simulated AI detection patterns
AI_PATTERNS = [
    "delightful experience", "highly recommend", "exceeded expectations",
    "wonderful atmosphere", "impeccable service", "truly memorable"
]

@app.post("/tools/auth/text")
async def validate_text(request: TextAuthRequest, x_api_key: str = Header(...)):
    """Validate review text authenticity"""
    verify_api_key(x_api_key)
    try:
        text_lower = request.review_text.lower()
        
        # Detect AI patterns
        ai_pattern_count = sum(1 for pattern in AI_PATTERNS if pattern in text_lower)
        
        # Calculate AI probability
        ai_probability = min(ai_pattern_count * 0.2, 0.95)
        
        # Word count check
        word_count = len(request.review_text.split())
        if word_count < 10:
            ai_probability += 0.1
        
        # Determine validity
        text_valid = ai_probability < 0.6
        text_score = 1.0 - ai_probability if text_valid else 0.4
        
        flags = []
        if ai_probability > 0.5:
            flags.append("High AI probability detected")
        if word_count < 10:
            flags.append("Suspiciously short review")
        if not flags:
            flags.append("No suspicious patterns detected")
        
        return {
            "ai_probability": round(ai_probability, 2),
            "text_valid": text_valid,
            "reason": ", ".join(flags),
            "text_score": round(text_score, 2),
            "word_count": word_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Simulated media database
media_db = {}

@app.post("/tools/media/upload")
async def upload_media(file: UploadFile = File(...), x_api_key: str = Header(...)):
    """Upload media file"""
    verify_api_key(x_api_key)
    try:
        # Generate media ID
        media_id = hashlib.md5(f"{file.filename}{datetime.now()}".encode()).hexdigest()[:16]
        
        # Simulate file storage
        media_url = f"http://127.0.0.1:8000/media/{media_id}"
        
        media_db[media_id] = {
            "filename": file.filename,
            "media_url": media_url,
            "upload_time": datetime.now().isoformat()
        }
        
        return {
            "status": "success",
            "media_id": media_id,
            "media_url": media_url,
            "message": "Media uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tools/auth/media")
async def validate_media(request: MediaAuthRequest, x_api_key: str = Header(...)):
    """Validate media authenticity"""
    verify_api_key(x_api_key)
    try:
        # Simulate deepfake/manipulation detection
        # In production, this would call actual AI models
        
        # Random authenticity check (replace with real AI model)
        authenticity_score = random.uniform(0.6, 0.98)
        
        # Check if media exists in our database
        media_exists = request.media_id in media_db
        
        if not media_exists:
            authenticity_score *= 0.7  # Penalize unknown sources
        
        media_authentic = authenticity_score > 0.7
        
        return {
            "media_authentic": media_authentic,
            "media_score": round(authenticity_score, 2),
            "deepfake_probability": round(1 - authenticity_score, 2),
            "analysis": "Original media detected" if media_authentic else "Potential manipulation detected"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# TOOL 3: TRUST SCORING
# ============================================================================

class TrustScoreRequest(BaseModel):
    text_score: float = Field(..., ge=0, le=1)
    media_score: Optional[float] = Field(None, ge=0, le=1)
    purchase_verified: bool
    consistency_score: float = Field(..., ge=0, le=1)

@app.post("/tools/trust/score")
async def generate_trust_score(request: TrustScoreRequest, x_api_key: str = Header(...)):
    """Generate final trust score"""
    verify_api_key(x_api_key)
    try:
        # Weighted scoring algorithm
        weights = {
            "purchase": 0.35,      # 35% - Most critical
            "text": 0.25,          # 25%
            "consistency": 0.20,   # 20%
            "media": 0.20          # 20%
        }
        
        # Calculate weighted score
        purchase_score = 1.0 if request.purchase_verified else 0.0
        media_score = request.media_score if request.media_score is not None else 0.5
        
        final_score = (
            weights["purchase"] * purchase_score +
            weights["text"] * request.text_score +
            weights["consistency"] * request.consistency_score +
            weights["media"] * media_score
        )
        
        # Convert to 0-100 scale
        final_trust_score = int(final_score * 100)
        
        # Determine trust level
        if final_trust_score >= 75:
            trust_level = "High"
            review_status = "TRUSTED"
        elif final_trust_score >= 50:
            trust_level = "Medium"
            review_status = "REVIEW MANUALLY"
        else:
            trust_level = "Low"
            review_status = "FLAGGED"
        
        # Generate breakdown
        breakdown = {
            "purchase_verification": f"{purchase_score * 100:.0f}%",
            "text_authenticity": f"{request.text_score * 100:.0f}%",
            "experience_consistency": f"{request.consistency_score * 100:.0f}%",
            "media_authenticity": f"{media_score * 100:.0f}%" if request.media_score else "N/A"
        }
        
        return {
            "final_trust_score": final_trust_score,
            "trust_level": trust_level,
            "review_status": review_status,
            "breakdown": breakdown,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# HEALTH CHECK
# ============================================================================

@app.get("/")
async def root():
    return {
        "service": "TrustProof Backend API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "review_processing": "/tools/review/*",
            "authenticity": "/tools/auth/*",
            "trust_scoring": "/tools/trust/score"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import os
    
    # Use Render's PORT environment variable, fallback to 8000 for local development
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0"  # Listen on all interfaces for cloud deployment
    
    print("🚀 Starting TrustProof Backend Server...")
    print(f"📍 API Base URL: http://{host}:{port}")
    print("🔑 API Key: 7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW")
    print("\n📚 Available Endpoints:")
    print("  - POST /tools/review/intake")
    print("  - POST /tools/review/consistency-check")
    print("  - POST /tools/verify/purchase")
    print("  - POST /tools/auth/text")
    print("  - POST /tools/auth/media")
    print("  - POST /tools/media/upload")
    print("  - POST /tools/trust/score")
    print("\n✅ Server ready for agent requests!\n")
    
    uvicorn.run(app, host=host, port=port)
