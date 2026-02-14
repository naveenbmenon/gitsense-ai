# GitSense AI

A full-stack GitHub analytics platform that transforms raw GitHub activity into structured analytics and explainable developer insights.

## Problem

GitHub exposes vast amounts of raw activity data — commits, repositories, languages — but provides no interpretation layer. Developers have no easy way to understand their contribution patterns, identify inactive repositories, or track technology trends over time.

## Solution

GitSense AI ingests GitHub activity via authenticated APIs, normalizes it into a relational schema, computes reusable analytics metrics, and generates deterministic, explainable insights — all exposed through a REST API and a React dashboard.

## Architecture

```
GitHub REST API
      ↓
Data Ingestion Layer
      ↓
SQLite Database (SQLAlchemy ORM)
      ↓
Analytics Engine
      ↓
Insight Engine
      ↓
FastAPI REST APIs
      ↓
React Dashboard (Chart.js)
```

## Core Features

**Data Ingestion**
- Authenticated GitHub REST API integration
- Ingests users, repositories, commits, and language data
- Idempotent pipeline — safe to re-run without duplication

**Analytics Engine**
- Commit time series (commits per day)
- Weekday vs weekend activity breakdown
- Active vs inactive repository classification
- Language distribution by percentage

**Insight Engine**
- Rule-based, deterministic insight generation (no black-box ML)
- Detects high weekend activity, inactive repositories, and dominant language concentration
- Insights are fully explainable and traceable to source data

**API Layer**
- Built with FastAPI
- Endpoints: `/health`, `/summary/{username}`, `/analytics/{username}`, `/insights/{username}`
- Swagger/OpenAPI docs available at `/docs`

**Dashboard**
- React (Vite) frontend with Chart.js visualizations
- Insight cards rendered directly from backend API responses
- Frontend contains zero business logic — all computation is backend-driven

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, SQLAlchemy |
| Database | SQLite |
| Frontend | React (Vite), Chart.js |
| External API | GitHub REST API |

## Running Locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
# API: http://127.0.0.1:8000
# Docs: http://127.0.0.1:8000/docs
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# App: http://localhost:5173
```

## Key Engineering Decisions

- **Idempotent ingestion** — pipeline can be re-triggered without corrupting existing data
- **Backend-driven insights** — all analytics logic lives server-side; frontend is purely presentational
- **Normalized schema** — raw API responses are cleaned and stored relationally for efficient querying
- **Rule-based insight engine** — deterministic rules ensure insights are auditable and explainable

## Planned Improvements

- Trend-based analytics over time
- Developer consistency scoring
- Repository health scoring system
- Multi-user and organization dashboards
