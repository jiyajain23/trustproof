#!/usr/bin/env python3
"""
Quick Test Script for TrustProof Backend
Run this to verify all APIs are working correctly
"""

import requests
import sys
import os

# Fix Windows console encoding for emoji characters
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

BASE_URL = "https://trust-proof.onrender.com/tools"
API_KEY = "7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW"
HEADERS = {"Content-Type": "application/json", "X-API-KEY": API_KEY}

def test_health():
    """Test if server is running"""
    try:
        # Health endpoint is at root level, not under /tools
        health_url = BASE_URL.replace("/tools", "") + "/health"
        response = requests.get(health_url, timeout=5)
        if response.status_code == 200:
            print("✅ Server is running")
            return True
        else:
            print("❌ Server responded with error")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Is it running?")
        print("   Start with: python trustproof_backend.py")
        return False

def test_review_intake():
    """Test review intake endpoint"""
    data = {
        "business_id": "BIZ-HOTEL-5678",
        "bill_id": "BILL-2024-001234",
        "review_text": "Test review",
        "media_uploaded": True
    }
    response = requests.post(f"{BASE_URL}/tools/review/intake", headers=HEADERS, json=data)
    if response.status_code == 200:
        print("✅ Review Intake API working")
        return True
    else:
        print(f"❌ Review Intake failed: {response.status_code}")
        return False

def test_purchase_verify():
    """Test purchase verification endpoint"""
    data = {
        "bill_id": "BILL-2024-001234",
        "business_id": "BIZ-HOTEL-5678"
    }
    response = requests.post(f"{BASE_URL}/tools/verify/purchase", headers=HEADERS, json=data)
    if response.status_code == 200 and response.json().get("verified"):
        print("✅ Purchase Verification API working")
        return True
    else:
        print("❌ Purchase Verification failed")
        return False

def test_text_auth():
    """Test text authenticity endpoint"""
    data = {"review_text": "This is a test review"}
    response = requests.post(f"{BASE_URL}/tools/auth/text", headers=HEADERS, json=data)
    if response.status_code == 200:
        print("✅ Text Authenticity API working")
        return True
    else:
        print("❌ Text Authenticity failed")
        return False

def test_trust_score():
    """Test trust scoring endpoint"""
    data = {
        "text_score": 0.85,
        "media_score": 0.90,
        "purchase_verified": True,
        "consistency_score": 0.88
    }
    response = requests.post(f"{BASE_URL}/tools/trust/score", headers=HEADERS, json=data)
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Trust Scoring API working (Score: {result['final_trust_score']}/100)")
        return True
    else:
        print("❌ Trust Scoring failed")
        return False

def main():
    print("=" * 60)
    print("🧪 TrustProof Backend API Tests")
    print("=" * 60)
    print()
    
    tests = [
        ("Server Health", test_health),
        ("Review Intake", test_review_intake),
        ("Purchase Verification", test_purchase_verify),
        ("Text Authenticity", test_text_auth),
        ("Trust Scoring", test_trust_score)
    ]
    
    results = []
    for name, test_func in tests:
        print(f"Testing {name}...", end=" ")
        sys.stdout.flush()
        result = test_func()
        results.append(result)
        print()
    
    print()
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"🎉 All tests passed! ({passed}/{total})")
        print("✅ Backend is ready for agent integration!")
    else:
        print(f"⚠️  {passed}/{total} tests passed")
        print("❌ Please fix failing tests before proceeding")
    
    print("=" * 60)
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
