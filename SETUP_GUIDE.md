# 🚀 TrustProof Backend - Setup & Run Guide

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## ⚡ Quick Start

### 1️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 2️⃣ Start the Backend Server

```bash
python trustproof_backend.py
```

You should see:
```
🚀 Starting TrustProof Backend Server...
📍 API Base URL: http://127.0.0.1:8000
🔑 API Key: trustproof_secure_key_2024
```

### 3️⃣ Test the APIs

Open a new terminal and run:

```bash
python agent_api_examples.py
```

---

## 🔧 Manual API Testing

### Using cURL

**1. Test Health Check:**
```bash
curl http://127.0.0.1:8000/health
```

**2. Submit a Review:**
```bash
curl -X POST http://127.0.0.1:8000/tools/review/intake \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: trustproof_secure_key_2024" \
  -d '{
    "business_id": "BIZ-HOTEL-5678",
    "bill_id": "BILL-2024-001234",
    "review_text": "Great experience!",
    "media_uploaded": true
  }'
```

**3. Verify Purchase:**
```bash
curl -X POST http://127.0.0.1:8000/tools/verify/purchase \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: trustproof_secure_key_2024" \
  -d '{
    "bill_id": "BILL-2024-001234",
    "business_id": "BIZ-HOTEL-5678"
  }'
```

**4. Validate Text:**
```bash
curl -X POST http://127.0.0.1:8000/tools/auth/text \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: trustproof_secure_key_2024" \
  -d '{
    "review_text": "Amazing place with wonderful service!"
  }'
```

**5. Generate Trust Score:**
```bash
curl -X POST http://127.0.0.1:8000/tools/trust/score \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: trustproof_secure_key_2024" \
  -d '{
    "text_score": 0.85,
    "media_score": 0.90,
    "purchase_verified": true,
    "consistency_score": 0.88
  }'
```

---

## 🧪 Testing with Postman

1. Import the OpenAPI schemas into Postman
2. Set base URL: `http://127.0.0.1:8000/tools`
3. Add header: `X-API-KEY: trustproof_secure_key_2024`
4. Test each endpoint

---

## 📊 Pre-loaded Test Data

The backend comes with sample verified bills:

| Bill ID            | Business ID      | Amount | Date       |
|--------------------|------------------|--------|------------|
| BILL-2024-001234   | BIZ-HOTEL-5678   | 2500   | 2024-01-14 |
| BILL-2024-001235   | BIZ-REST-9012    | 1200   | 2024-01-13 |
| BILL-2024-001236   | BIZ-HOTEL-5678   | 3500   | 2024-01-12 |

Use these for testing purchase verification.

---

## 🔐 API Key Configuration

Default API Key: `trustproof_secure_key_2024`

To change it, edit `trustproof_backend.py`:
```python
API_KEY = "your_custom_key_here"
```

---

## 🐛 Troubleshooting

**Problem: "Connection refused"**
- Solution: Make sure backend server is running (`python trustproof_backend.py`)

**Problem: "403 Forbidden"**
- Solution: Check API key in headers matches the server's API key

**Problem: "Port already in use"**
- Solution: Kill existing process or change port in `trustproof_backend.py`

---

## 📚 API Documentation

Once server is running, visit:
- **Swagger UI:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc

---

## 🔄 Integration with OnDemand Agents

Your OnDemand agents should call these endpoints with the following pattern:

```python
# In your agent code
import requests

API_URL = "http://127.0.0.1:8000/tools"
API_KEY = "trustproof_secure_key_2024"

def call_trust_api(endpoint, data):
    response = requests.post(
        f"{API_URL}/{endpoint}",
        headers={
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        },
        json=data
    )
    return response.json()

# Example usage
result = call_trust_api("verify/purchase", {
    "bill_id": "BILL-2024-001234",
    "business_id": "BIZ-HOTEL-5678"
})
```

---

## 🎯 Next Steps

1. ✅ Backend is running
2. ✅ APIs are tested
3. 🔜 Connect your OnDemand agents
4. 🔜 Build frontend UI
5. 🔜 Add database persistence

---

## 📞 Support

For issues, check:
1. Server logs in terminal
2. API response error messages
3. Example code in `agent_api_examples.py`
