# 🔧 OnDemand Platform Agent Configuration

## API Configuration for TrustProof Backend

Your OnDemand agents need to be configured with the following settings to call the TrustProof APIs:

### 📍 Base Configuration

```python
# API Endpoint Configuration
API_BASE_URL = "https://trust-proof.onrender.com/tools"
API_KEY = "7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW"

# Headers for all API calls
HEADERS = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY
}
```

---

## 🔌 Available Endpoints

### 1. Review Intake
**Endpoint:** `POST /tools/review/intake`

**Request Body:**
```json
{
    "business_id": "BIZ-HOTEL-5678",
    "bill_id": "BILL-2024-001234",
    "review_text": "Great service!",
    "media_uploaded": true
}
```

**Response:**
```json
{
    "status": "success",
    "review_id": "abc123xyz",
    "message": "Review submitted successfully",
    "timestamp": "2024-01-14T10:30:00"
}
```

---

### 2. Purchase Verification
**Endpoint:** `POST /tools/verify/purchase`

**Request Body:**
```json
{
    "bill_id": "BILL-2024-001234",
    "business_id": "BIZ-HOTEL-5678"
}
```

**Response:**
```json
{
    "verified": true,
    "confidence": 0.95,
    "message": "Purchase verified successfully",
    "transaction_date": "2024-01-14",
    "amount": 2500.0
}
```

---

### 3. Text Authenticity Check
**Endpoint:** `POST /tools/auth/text`

**Request Body:**
```json
{
    "review_text": "Amazing place with wonderful service!"
}
```

**Response:**
```json
{
    "ai_probability": 0.15,
    "text_valid": true,
    "reason": "No suspicious patterns detected",
    "text_score": 0.85,
    "word_count": 5
}
```

---

### 4. Consistency Check
**Endpoint:** `POST /tools/review/consistency-check`

**Request Body:**
```json
{
    "consistency_score": 0.85,
    "notes": "Timeline matches business type"
}
```

**Response:**
```json
{
    "status": "success",
    "consistency_score": 0.85,
    "verdict": "Highly Consistent",
    "notes": "Timeline matches business type",
    "timestamp": "2024-01-14T10:30:00"
}
```

---

### 5. Media Upload
**Endpoint:** `POST /tools/media/upload`

**Request:** Multipart form data with file

**Response:**
```json
{
    "status": "success",
    "media_id": "xyz789abc",
    "media_url": "https://trust-proof.onrender.com/media/xyz789abc",
    "message": "Media uploaded successfully"
}
```

---

### 6. Media Authenticity Check
**Endpoint:** `POST /tools/auth/media`

**Request Body:**
```json
{
    "media_id": "xyz789abc",
    "media_url": "https://trust-proof.onrender.com/media/xyz789abc",
    "media_type": "image"
}
```

**Response:**
```json
{
    "media_authentic": true,
    "media_score": 0.92,
    "deepfake_probability": 0.08,
    "analysis": "Original media detected"
}
```

---

### 7. Trust Score Generation
**Endpoint:** `POST /tools/trust/score`

**Request Body:**
```json
{
    "text_score": 0.85,
    "media_score": 0.90,
    "purchase_verified": true,
    "consistency_score": 0.88
}
```

**Response:**
```json
{
    "final_trust_score": 88,
    "trust_level": "High",
    "review_status": "TRUSTED",
    "breakdown": {
        "purchase_verification": "100%",
        "text_authenticity": "85%",
        "experience_consistency": "88%",
        "media_authenticity": "90%"
    },
    "timestamp": "2024-01-14T10:30:00"
}
```

---

## 💻 Python Agent Example

```python
import requests

# Configuration
API_BASE_URL = "https://trust-proof.onrender.com/tools"
API_KEY = "7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW"

HEADERS = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY
}

def call_trust_api(endpoint, data):
    """Generic function to call TrustProof APIs"""
    response = requests.post(
        f"{API_BASE_URL}{endpoint}",
        headers=HEADERS,
        json=data,
        timeout=30
    )
    response.raise_for_status()
    return response.json()

# Example: Verify Purchase
def verify_purchase(bill_id, business_id):
    result = call_trust_api("/verify/purchase", {
        "bill_id": bill_id,
        "business_id": business_id
    })
    return result

# Example: Check Text Authenticity
def check_text_authenticity(review_text):
    result = call_trust_api("/auth/text", {
        "review_text": review_text
    })
    return result

# Example: Generate Trust Score
def generate_trust_score(text_score, media_score, purchase_verified, consistency_score):
    result = call_trust_api("/trust/score", {
        "text_score": text_score,
        "media_score": media_score,
        "purchase_verified": purchase_verified,
        "consistency_score": consistency_score
    })
    return result
```

---

## 🔄 Complete Workflow Example

```python
# Step 1: Submit Review
review_response = call_trust_api("/review/intake", {
    "business_id": "BIZ-HOTEL-5678",
    "bill_id": "BILL-2024-001234",
    "review_text": "Great service!",
    "media_uploaded": True
})

# Step 2: Verify Purchase
purchase_response = call_trust_api("/verify/purchase", {
    "bill_id": "BILL-2024-001234",
    "business_id": "BIZ-HOTEL-5678"
})

# Step 3: Check Text
text_response = call_trust_api("/auth/text", {
    "review_text": "Great service!"
})

# Step 4: Check Consistency
consistency_response = call_trust_api("/review/consistency-check", {
    "consistency_score": 0.85,
    "notes": "All checks passed"
})

# Step 5: Generate Final Score
trust_score = call_trust_api("/trust/score", {
    "text_score": text_response["text_score"],
    "media_score": 0.90,
    "purchase_verified": purchase_response["verified"],
    "consistency_score": consistency_response["consistency_score"]
})

print(f"Final Trust Score: {trust_score['final_trust_score']}/100")
print(f"Status: {trust_score['review_status']}")
```

---

## ⚠️ Important Notes

1. **API Key Required**: All requests must include the `X-API-KEY` header
2. **Base URL**: Always use `https://trust-proof.onrender.com/tools`
3. **Timeout**: Set timeout to 30 seconds for all requests
4. **Error Handling**: Always check response status codes
5. **Content-Type**: Use `application/json` for all POST requests (except media upload)

---

## 🧪 Testing

Test your agent configuration with:

```bash
python test_backend.py
```

Or run the complete examples:

```bash
python agent_api_examples.py
```

---

## 📞 Support

If you encounter issues:
1. Verify API key is correct: `7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW`
2. Check base URL: `https://trust-proof.onrender.com/tools`
3. Ensure headers include `X-API-KEY`
4. Check server status: `https://trust-proof.onrender.com/health`

