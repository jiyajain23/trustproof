# 🧪 Professional Testing Guide for TrustProof

## Test Scenarios - Valid vs Invalid Cases

### ✅ Test Case 1: VALID Review (Should PASS)
**Purpose:** Verify system accepts legitimate reviews

**Input:**
- Business ID: `BIZ-HOTEL-5678`
- Bill ID: `BILL-2024-001234` ✅ (This exists in database)
- Review Text: `"Great hotel! Clean rooms and friendly staff. Had a wonderful stay."`
- Media: Optional

**Expected Results:**
- ✅ Purchase Verified: `true`
- ✅ Text Score: `> 0.7` (high authenticity)
- ✅ Trust Score: `> 75` (High trust level)
- ✅ Status: `TRUSTED`

---

### ❌ Test Case 2: INVALID Bill ID (Should FAIL)
**Purpose:** Verify system detects fake reviews with non-existent bills

**Input:**
- Business ID: `BIZ-HOTEL-5678`
- Bill ID: `FAKE-BILL-999` ❌ (Does NOT exist)
- Review Text: `"Amazing experience! Highly recommend!"`
- Media: Optional

**Expected Results:**
- ❌ Purchase Verified: `false`
- ⚠️ Text Score: `0.4-0.6` (may detect AI patterns)
- ❌ Trust Score: `< 50` (Low trust level)
- ❌ Status: `FLAGGED` or `REVIEW MANUALLY`

---

### ❌ Test Case 3: WRONG Business-Bill Combination (Should FAIL)
**Purpose:** Verify system detects mismatched business and bill

**Input:**
- Business ID: `BIZ-REST-9012` 
- Bill ID: `BILL-2024-001234` ❌ (This bill belongs to BIZ-HOTEL-5678, not BIZ-REST-9012)
- Review Text: `"Best restaurant ever!"`
- Media: Optional

**Expected Results:**
- ❌ Purchase Verified: `false` (Bill doesn't match business)
- ⚠️ Trust Score: `< 50`
- ❌ Status: `FLAGGED`

---

### ❌ Test Case 4: AI-Generated Review Text (Should DETECT)
**Purpose:** Verify system detects AI-generated content

**Input:**
- Business ID: `BIZ-HOTEL-5678`
- Bill ID: `BILL-2024-001234` ✅ (Valid bill)
- Review Text: `"Absolutely delightful experience! Wonderful atmosphere and impeccable service. Truly memorable and exceeded all expectations!"` ❌ (Contains AI patterns)
- Media: Optional

**Expected Results:**
- ✅ Purchase Verified: `true` (Bill is valid)
- ❌ Text Score: `< 0.6` (High AI probability detected)
- ⚠️ Trust Score: `50-75` (Medium - flagged due to text)
- ⚠️ Status: `REVIEW MANUALLY`

---

### ❌ Test Case 5: Suspiciously Short Review (Should FLAG)
**Purpose:** Verify system flags very short reviews

**Input:**
- Business ID: `BIZ-HOTEL-5678`
- Bill ID: `BILL-2024-001234` ✅
- Review Text: `"Good"` ❌ (Too short - only 1 word)
- Media: Optional

**Expected Results:**
- ✅ Purchase Verified: `true`
- ❌ Text Score: `< 0.5` (Flagged as suspiciously short)
- ⚠️ Trust Score: `< 60`
- ⚠️ Status: `REVIEW MANUALLY`

---

### ✅ Test Case 6: Complete Valid Review with Media (Should PASS)
**Purpose:** Verify full workflow with all validations

**Input:**
- Business ID: `BIZ-HOTEL-5678`
- Bill ID: `BILL-2024-001234` ✅
- Review Text: `"Stayed here for 3 nights. The room was spacious and clean. Breakfast was excellent. Staff was helpful. Would definitely come back."`
- Media: Upload an image

**Expected Results:**
- ✅ Purchase Verified: `true`
- ✅ Text Score: `> 0.7`
- ✅ Media Score: `> 0.7` (if media uploaded)
- ✅ Consistency Score: `> 0.7`
- ✅ Trust Score: `> 80` (High)
- ✅ Status: `TRUSTED`

---

## 📊 Test Results Checklist

For each test case, verify:

- [ ] **Purchase Verification** - Correctly identifies valid/invalid bills
- [ ] **Text Authenticity** - Detects AI patterns and suspicious content
- [ ] **Consistency Check** - Validates experience patterns
- [ ] **Media Validation** - Checks media authenticity (if uploaded)
- [ ] **Trust Score** - Calculates appropriate score based on all factors
- [ ] **Status** - Returns correct status (TRUSTED/REVIEW MANUALLY/FLAGGED)
- [ ] **Error Handling** - Shows appropriate error messages for invalid inputs
- [ ] **UI Feedback** - Loading states and progress indicators work correctly

---

## 🎯 Quick Test Matrix

| Test # | Bill ID | Business ID | Expected Result |
|--------|---------|-------------|-----------------|
| 1 | `BILL-2024-001234` | `BIZ-HOTEL-5678` | ✅ TRUSTED (Valid match) |
| 2 | `FAKE-BILL-999` | `BIZ-HOTEL-5678` | ❌ FLAGGED (Bill doesn't exist) |
| 3 | `BILL-2024-001234` | `BIZ-REST-9012` | ❌ FLAGGED (Wrong business) |
| 4 | `BILL-2024-001235` | `BIZ-REST-9012` | ✅ TRUSTED (Valid match) |
| 5 | `BILL-2024-001236` | `BIZ-HOTEL-5678` | ✅ TRUSTED (Valid match) |
| 6 | `INVALID-123` | `BIZ-HOTEL-5678` | ❌ FLAGGED (Invalid format) |

---

## 🔍 What to Look For

### ✅ **System Working Correctly:**
- Valid bills → Purchase verified = `true`
- Invalid bills → Purchase verified = `false`
- AI text → Lower text scores
- Short reviews → Flagged appropriately
- All scores contribute to final trust score
- Status reflects the trust level correctly

### ❌ **System NOT Working:**
- Invalid bills showing as verified
- AI text getting high scores
- Trust scores don't match inputs
- No error messages for invalid data
- UI doesn't show loading states
- Results don't display properly

---

## 📝 Test Report Template

```
Test Case: [Number]
Date: [Date]
Input: [Details]
Expected: [Expected Result]
Actual: [Actual Result]
Status: ✅ PASS / ❌ FAIL
Notes: [Any observations]
```

---

## 🚀 Ready to Test?

1. Open the website (index.html)
2. Start with Test Case 1 (Valid) - Should PASS
3. Then Test Case 2 (Invalid Bill) - Should FAIL
4. Continue through all test cases
5. Document any discrepancies

Good luck with your testing! 🎯

