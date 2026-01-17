# 🪟 Windows PowerShell Testing Commands

## Quick Test - Purchase Verification

```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    bill_id = "BILL-2024-001234"
    business_id = "BIZ-HOTEL-5678"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/verify/purchase" -Method Post -Headers $headers -Body $body
```

---

## All API Tests for PowerShell

### 1. Review Intake
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    business_id = "BIZ-HOTEL-5678"
    bill_id = "BILL-2024-001234"
    review_text = "Great experience!"
    media_uploaded = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/review/intake" -Method Post -Headers $headers -Body $body
```

### 2. Purchase Verification
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    bill_id = "BILL-2024-001234"
    business_id = "BIZ-HOTEL-5678"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/verify/purchase" -Method Post -Headers $headers -Body $body
```

### 3. Text Authenticity
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    review_text = "Amazing place with wonderful service!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/auth/text" -Method Post -Headers $headers -Body $body
```

### 4. Consistency Check
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    consistency_score = 0.85
    notes = "Timeline matches business type"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/review/consistency-check" -Method Post -Headers $headers -Body $body
```

### 5. Media Authenticity
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    media_id = "abc123def456"
    media_url = "http://127.0.0.1:8000/media/abc123def456"
    media_type = "image"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/auth/media" -Method Post -Headers $headers -Body $body
```

### 6. Trust Score
```powershell
$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

$body = @{
    text_score = 0.85
    media_score = 0.90
    purchase_verified = $true
    consistency_score = 0.88
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/trust/score" -Method Post -Headers $headers -Body $body
```

---

## Health Check
```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/health" -Method Get
```

---

## Complete Flow Test (Copy & Paste This)

```powershell
# Complete TrustProof API Test Flow
Write-Host "=== TrustProof API Test ===" -ForegroundColor Cyan

$headers = @{
    "Content-Type" = "application/json"
    "X-API-KEY" = "trustproof_secure_key_2024"
}

# 1. Submit Review
Write-Host "`n[1] Submitting review..." -ForegroundColor Yellow
$review = @{
    business_id = "BIZ-HOTEL-5678"
    bill_id = "BILL-2024-001234"
    review_text = "Great service and clean rooms!"
    media_uploaded = $true
} | ConvertTo-Json

$result1 = Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/review/intake" -Method Post -Headers $headers -Body $review
Write-Host "✅ Review submitted: $($result1.review_id)" -ForegroundColor Green

# 2. Verify Purchase
Write-Host "`n[2] Verifying purchase..." -ForegroundColor Yellow
$verify = @{
    bill_id = "BILL-2024-001234"
    business_id = "BIZ-HOTEL-5678"
} | ConvertTo-Json

$result2 = Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/verify/purchase" -Method Post -Headers $headers -Body $verify
Write-Host "✅ Purchase verified: $($result2.verified)" -ForegroundColor Green

# 3. Check Text
Write-Host "`n[3] Analyzing text..." -ForegroundColor Yellow
$text = @{
    review_text = "Great service and clean rooms!"
} | ConvertTo-Json

$result3 = Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/auth/text" -Method Post -Headers $headers -Body $text
Write-Host "✅ Text score: $($result3.text_score)" -ForegroundColor Green

# 4. Check Consistency
Write-Host "`n[4] Checking consistency..." -ForegroundColor Yellow
$consistency = @{
    consistency_score = 0.85
    notes = "All checks passed"
} | ConvertTo-Json

$result4 = Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/review/consistency-check" -Method Post -Headers $headers -Body $consistency
Write-Host "✅ Consistency: $($result4.verdict)" -ForegroundColor Green

# 5. Check Media
Write-Host "`n[5] Validating media..." -ForegroundColor Yellow
$media = @{
    media_id = "test123"
    media_url = "http://127.0.0.1:8000/media/test123"
    media_type = "image"
} | ConvertTo-Json

$result5 = Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/auth/media" -Method Post -Headers $headers -Body $media
Write-Host "✅ Media authentic: $($result5.media_authentic)" -ForegroundColor Green

# 6. Generate Trust Score
Write-Host "`n[6] Generating trust score..." -ForegroundColor Yellow
$trust = @{
    text_score = $result3.text_score
    media_score = $result5.media_score
    purchase_verified = $result2.verified
    consistency_score = 0.85
} | ConvertTo-Json

$final = Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/trust/score" -Method Post -Headers $headers -Body $trust

Write-Host "`n=== FINAL RESULT ===" -ForegroundColor Cyan
Write-Host "🎉 Trust Score: $($final.final_trust_score)/100" -ForegroundColor Green
Write-Host "📊 Trust Level: $($final.trust_level)" -ForegroundColor Green
Write-Host "🚦 Status: $($final.review_status)" -ForegroundColor Green
Write-Host "`nBreakdown:" -ForegroundColor White
$final.breakdown | ConvertTo-Json
```

---

## Troubleshooting

### If you get "Connection refused":
```powershell
# Check if backend is running
Test-NetConnection -ComputerName 127.0.0.1 -Port 8000
```

### View full response with error details:
```powershell
try {
    Invoke-RestMethod -Uri "http://127.0.0.1:8000/tools/verify/purchase" -Method Post -Headers $headers -Body $body
} catch {
    $_.Exception.Message
    $_.ErrorDetails.Message
}
```

---

## Easier Option: Use Python Tests

Instead of PowerShell, just run:
```powershell
python agent_api_examples.py
```

or

```powershell
python test_backend.py
```

These will work perfectly on Windows! 🎯
