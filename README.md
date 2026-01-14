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

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn app.main:app --reload
```

4. Access the backend:
   - API: http://127.0.0.1:8000
   - Swagger documentation: http://127.0.0.1:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the frontend at: http://localhost:5173

## 🔮 Future Work (v2)

The following features are planned for future releases:

- **Trend-based analytics**: Track repository metrics over time
- **Developer consistency metrics**: Measure code contribution patterns
- **Repository health scoring**: Automated health assessments
- **Lightweight predictive indicators**: Early warning systems for potential issues
- **Team and organization dashboards**: Multi-repository overview and insights
