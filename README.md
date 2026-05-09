# 🔐 TrustProof — AI-Verified Review & Trust Scoring System

TrustProof is a **fraud-resistant, AI-powered review verification platform** that replaces opinion-based ratings with **evidence-backed trust signals**.  
It ensures that **every review is real, every experience is verified, and every rating is justified**.

Built using **OnDemand Chat & Media APIs**, **FastAPI**, and a **multi-agent architecture**, TrustProof is designed as a modern replacement for outdated review systems.

---

## 🚨 Problem

Online reviews are no longer trustworthy due to:
- Fake and paid reviews
- AI-generated text
- Reused or manipulated images/videos
- Review bombing and reputation manipulation

Traditional star-rating systems lack:
- Purchase verification
- Authenticity checks
- Evidence requirements
- Transparency

---

## 💡 Solution

TrustProof introduces an **AI-verified review pipeline** where every review must pass multiple validation layers before being trusted.

### Core Principles
- No review without a verified purchase
- No high trust without visual proof
- No opinion without evidence

---

## 🧠 System Architecture

### 🔹 Multi-Agent Design (6 Agents)

Each agent has a **single, well-defined responsibility**:

1. **Review Intake Agent** – Collects structured review data
2. **Purchase Verification Agent** – Validates Bill ID authenticity
3. **Experience Consistency Agent** – Checks realism of the review
4. **Text Authenticity Agent** – Detects AI-generated or templated text
5. **Media Authenticity Agent** – Validates images/videos using Media API
6. **Trust Scoring Agent** – Aggregates all signals into a final trust score

Agents are orchestrated via **OnDemand Chat API sessions** using a supervisor-style reasoning flow.

---

## 🛠 Custom Tools (Execution Layer)

TrustProof includes **three fully custom backend tools**, each exposed via **OpenAPI 3.0 schemas** and callable by agents.

### 1️⃣ Review Processing Tool
- Review submission
- Purchase verification
- Experience consistency checks

### 2️⃣ Authenticity Validation Tool
- AI-generated text detection
- Image & video authenticity analysis
- Uses **OnDemand Media API**

### 3️⃣ Trust Scoring Tool
- Aggregates verification signals
- Outputs normalized trust score

All tools:
- Are custom-built
- Secured via API-key authentication
- Implemented using FastAPI

---

## 🔌 API Usage (OnDemand Track)

✔ **Chat API** — Multi-agent orchestration and reasoning  
✔ **Media API** — Image & video authenticity validation  
✔ **Custom OpenAPI Tools** — Execution & verification layer  

This project exceeds the minimum OnDemand track requirements.

---

## ⚙️ Tech Stack

- **Backend:** FastAPI (Python)
- **AI Platform:** OnDemand
- **APIs:** Chat API, Media API
- **Architecture:** Multi-agent + tool-based execution
- **Deployment:** Render
- **Security:** API Key–based authentication
- **Specs:** OpenAPI 3.0

---

## 🚀 Deployment

The backend is **fully deployed on Render**, enabling live demonstrations:
- Agent-to-tool calls
- Media uploads and analysis
- End-to-end trust score generation

---

## 📊 Output Example

Each review results in:
- Purchase verification status
- Text authenticity score
- Media authenticity score
- Experience consistency score
- **Final Trust Score (0–100)**

---

## 🌐 Open Innovation Impact

TrustProof is designed as a **reusable trust layer** that can be integrated into:
- Booking platforms
- Food delivery apps
- Review websites
- Marketplaces

It transforms trust into an **open, auditable, and interoperable signal**.

---

## 🏆 Hackathon Alignment

- ✅ Working prototype
- ✅ 6 AI agents
- ✅ 3 custom tools
- ✅ Mandatory Chat & Media API usage
- ✅ Real backend deployment
- ✅ Clear real-world impact

---

## 📌 Tagline

**“Trust, backed by evidence — not opinions.”**

---

## 📄 License
MIT License

---

## 👥 Team
Built during a hackathon using OnDemand APIs by a team focused on solving real-world trust problems with AI.

