"""
Example: How Agents Call TrustProof APIs
This shows the complete flow from user input to trust score
"""

import requests
import json

# ============================================================================
# CONFIGURATION
# ============================================================================

BASE_URL = "https://trust-proof.onrender.com/tools"
API_KEY = "7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW"

HEADERS = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY
}

# ============================================================================
# EXAMPLE 1: Complete Review Processing Flow
# ============================================================================

def example_complete_flow():
    """
    Simulates the full agent workflow:
    User submits review → All validations → Trust score
    """
    
    print("=" * 80)
    print("🎯 EXAMPLE: Complete Review Validation Flow")
    print("=" * 80)
    
    # Step 1: User submits review (Intake Agent)
    print("\n[STEP 1] Review Intake Agent - Submitting review...")
    
    review_data = {
        "business_id": "BIZ-HOTEL-5678",
        "bill_id": "BILL-2024-001234",
        "review_text": "Amazing hotel with great service! The staff was friendly and rooms were clean. Highly recommend for families.",
        "media_uploaded": True
    }
    
    response = requests.post(
        f"{BASE_URL}/review/intake",
        headers=HEADERS,
        json=review_data
    )
    
    print(f"✅ Response: {response.json()}")
    review_id = response.json().get("review_id")
    
    # Step 2: Purchase Verification Agent
    print("\n[STEP 2] Purchase Verification Agent - Verifying bill...")
    
    verify_data = {
        "bill_id": review_data["bill_id"],
        "business_id": review_data["business_id"]
    }
    
    response = requests.post(
        f"{BASE_URL}/verify/purchase",
        headers=HEADERS,
        json=verify_data
    )
    
    verification_result = response.json()
    print(f"✅ Response: {verification_result}")
    purchase_verified = verification_result.get("verified", False)
    
    # Step 3: Text Authenticity Agent
    print("\n[STEP 3] Text Authenticity Agent - Analyzing review text...")
    
    text_data = {
        "review_text": review_data["review_text"]
    }
    
    response = requests.post(
        f"{BASE_URL}/auth/text",
        headers=HEADERS,
        json=text_data
    )
    
    text_result = response.json()
    print(f"✅ Response: {text_result}")
    text_score = text_result.get("text_score", 0)
    
    # Step 4: Experience Consistency Agent
    print("\n[STEP 4] Consistency Agent - Checking experience patterns...")
    
    consistency_data = {
        "consistency_score": 0.85,
        "notes": "Review timeline and content align with business type"
    }
    
    response = requests.post(
        f"{BASE_URL}/review/consistency-check",
        headers=HEADERS,
        json=consistency_data
    )
    
    consistency_result = response.json()
    print(f"✅ Response: {consistency_result}")
    consistency_score = consistency_result.get("consistency_score", 0)
    
    # Step 5: Media Authenticity Agent (simulated)
    print("\n[STEP 5] Media Authenticity Agent - Validating uploaded media...")
    
    media_data = {
        "media_id": "abc123def456",
        "media_url": "https://trust-proof.onrender.com/media/abc123def456",
        "media_type": "image"
    }
    
    response = requests.post(
        f"{BASE_URL}/auth/media",
        headers=HEADERS,
        json=media_data
    )
    
    media_result = response.json()
    print(f"✅ Response: {media_result}")
    media_score = media_result.get("media_score", 0)
    
    # Step 6: Trust Scoring Agent
    print("\n[STEP 6] Trust Scoring Agent - Generating final trust score...")
    
    trust_data = {
        "text_score": text_score,
        "media_score": media_score,
        "purchase_verified": purchase_verified,
        "consistency_score": consistency_score
    }
    
    response = requests.post(
        f"{BASE_URL}/trust/score",
        headers=HEADERS,
        json=trust_data
    )
    
    final_result = response.json()
    print(f"✅ Final Result: {json.dumps(final_result, indent=2)}")
    
    print("\n" + "=" * 80)
    print(f"🎉 FINAL TRUST SCORE: {final_result['final_trust_score']}/100")
    print(f"📊 Trust Level: {final_result['trust_level']}")
    print(f"🚦 Status: {final_result['review_status']}")
    print("=" * 80)

# ============================================================================
# EXAMPLE 2: Fake Review Detection
# ============================================================================

def example_fake_review():
    """
    Demonstrates how system detects fake reviews
    """
    
    print("\n\n" + "=" * 80)
    print("🚨 EXAMPLE: Fake Review Detection")
    print("=" * 80)
    
    # Fake review with no bill ID
    print("\n[TEST] Submitting review with invalid bill ID...")
    
    fake_review = {
        "business_id": "BIZ-REST-9012",
        "bill_id": "FAKE-BILL-999",  # This doesn't exist
        "review_text": "Absolutely delightful experience! Wonderful atmosphere and impeccable service. Truly memorable!",
        "media_uploaded": False
    }
    
    # Step 1: Submit review
    response = requests.post(
        f"{BASE_URL}/review/intake",
        headers=HEADERS,
        json=fake_review
    )
    print(f"✅ Review submitted: {response.json()}")
    
    # Step 2: Verify purchase (will fail)
    verify_data = {
        "bill_id": fake_review["bill_id"],
        "business_id": fake_review["business_id"]
    }
    
    response = requests.post(
        f"{BASE_URL}/verify/purchase",
        headers=HEADERS,
        json=verify_data
    )
    
    verification = response.json()
    print(f"❌ Purchase verification: {verification}")
    
    # Step 3: Text analysis (will detect AI patterns)
    text_data = {"review_text": fake_review["review_text"]}
    
    response = requests.post(
        f"{BASE_URL}/auth/text",
        headers=HEADERS,
        json=text_data
    )
    
    text_analysis = response.json()
    print(f"⚠️  Text analysis: {text_analysis}")
    
    # Step 4: Final scoring
    trust_data = {
        "text_score": text_analysis["text_score"],
        "media_score": 0.0,  # No media
        "purchase_verified": verification["verified"],
        "consistency_score": 0.3  # Low consistency
    }
    
    response = requests.post(
        f"{BASE_URL}/trust/score",
        headers=HEADERS,
        json=trust_data
    )
    
    final_score = response.json()
    print(f"\n🚨 RESULT: {json.dumps(final_score, indent=2)}")

# ============================================================================
# EXAMPLE 3: Individual API Calls
# ============================================================================

def example_individual_calls():
    """
    Shows how to call each API independently
    """
    
    print("\n\n" + "=" * 80)
    print("🔧 EXAMPLE: Individual API Calls")
    print("=" * 80)
    
    # 1. Text Authenticity Check
    print("\n[1] Text Authenticity API:")
    response = requests.post(
        f"{BASE_URL}/auth/text",
        headers=HEADERS,
        json={"review_text": "Great food and service!"}
    )
    print(json.dumps(response.json(), indent=2))
    
    # 2. Purchase Verification
    print("\n[2] Purchase Verification API:")
    response = requests.post(
        f"{BASE_URL}/verify/purchase",
        headers=HEADERS,
        json={
            "bill_id": "BILL-2024-001235",
            "business_id": "BIZ-REST-9012"
        }
    )
    print(json.dumps(response.json(), indent=2))
    
    # 3. Consistency Check
    print("\n[3] Consistency Check API:")
    response = requests.post(
        f"{BASE_URL}/review/consistency-check",
        headers=HEADERS,
        json={
            "consistency_score": 0.92,
            "notes": "All checks passed"
        }
    )
    print(json.dumps(response.json(), indent=2))
    
    # 4. Trust Score Generation
    print("\n[4] Trust Score API:")
    response = requests.post(
        f"{BASE_URL}/trust/score",
        headers=HEADERS,
        json={
            "text_score": 0.85,
            "media_score": 0.90,
            "purchase_verified": True,
            "consistency_score": 0.88
        }
    )
    print(json.dumps(response.json(), indent=2))

# ============================================================================
# RUN ALL EXAMPLES
# ============================================================================

if __name__ == "__main__":
    try:
        # Make sure backend is running first
        health_check = requests.get("https://trust-proof.onrender.com/health")
        print("✅ Backend server is running!\n")
        
        # Run examples
        example_complete_flow()
        example_fake_review()
        example_individual_calls()
        
        print("\n\n✅ All examples completed successfully!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Cannot connect to backend server!")
        print("Please check if the server is deployed at: https://trust-proof.onrender.com")
