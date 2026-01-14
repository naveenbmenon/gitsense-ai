# 🚀 GitSense AI (v1)

GitSense AI is a **full-stack GitHub analytics and developer intelligence platform** that transforms raw GitHub activity into **meaningful analytics and explainable insights**.

The project is designed as an **internship-ready system**, with clean backend architecture and a lightweight frontend dashboard.

---

## 📌 Problem Statement

GitHub provides large amounts of raw data (commits, repositories, languages) but lacks **interpretation**.

Developers often struggle to answer:
- How consistent is my contribution pattern?
- Which repositories are inactive?
- What technologies do I primarily work with?
- Are there meaningful trends in my activity?

Most existing tools focus on numbers, not **insights**.

---

## 💡 Solution

GitSense AI solves this by:

- Ingesting GitHub activity using authenticated APIs
- Normalizing data into a relational schema
- Computing reusable analytics metrics
- Generating **explainable, rule-based insights**
- Exposing everything via REST APIs and a React dashboard

---

## 🧠 Core Features (v1)

### 🔹 Data Ingestion
- GitHub REST API integration
- User, repository, commit, and language ingestion
- **Idempotent ingestion pipeline** (safe re-runs)
- Normalized SQLite database

### 🔹 Analytics Engine
- Total commits
- Commits per day (time series)
- Weekday vs weekend activity
- Active vs inactive repositories
- Language distribution by percentage

### 🔹 Insight Engine
- High weekend activity detection
- Inactive repository identification
- Strong language concentration detection
- Deterministic and explainable rules (no black-box ML)

### 🔹 API Layer
- Built using FastAPI
- REST endpoints:
  - `/health`
  - `/summary/{username}`
  - `/analytics/{username}`
  - `/insights/{username}`
- Swagger/OpenAPI documentation available

### 🔹 Dashboard
- React (Vite) frontend
- Interactive charts using Chart.js
- Insight cards rendered directly from backend outputs
- Frontend contains no business logic

---

## 🏗️ System Architecture

GitHub API
↓
Data Ingestion Layer
↓
SQLite Database
↓
Analytics Engine
↓
Insight Engine
↓
FastAPI REST APIs
↓
React Dashboard

yaml
Copy code

---

## 🛠️ Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- GitHub REST API

### Frontend
- React (Vite)
- Chart.js
- JavaScript

### Concepts
- Data ingestion pipelines
- Idempotent systems
- Analytics and metrics design
- Explainable rule-based intelligence
- Full-stack architecture

---

## 🚀 Running the Project Locally

### Backend

pip install -r requirements.txt
uvicorn app.main:app --reload
Backend runs at: http://127.0.0.1:8000
Swagger docs: http://127.0.0.1:8000/docs
---
###Frontend
cd frontend
npm install
npm run dev
---
Frontend runs at: http://localhost:5173

###🔮 Future Work (v2)
Trend-based analytics

Developer consistency metrics

Repository health scoring

Lightweight predictive indicators

Team and organization dashboards
