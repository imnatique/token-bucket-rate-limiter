# Distributed Token Bucket Rate Limiter

A production-inspired distributed API rate limiter built with **Express.js**, **Redis**, **Lua**, and **React**.

The project demonstrates how modern backend systems protect APIs from abuse while allowing short traffic bursts using the **Token Bucket Algorithm**. It also includes a real-time monitoring dashboard to visualize request statistics and active buckets.

---

## Features

* Token Bucket rate limiting algorithm
* Atomic token consumption using Redis Lua scripts
* Redis-backed distributed bucket storage
* Express.js middleware implementation
* Real-time monitoring dashboard built with React
* Live traffic chart
* Active bucket inspection
* Request statistics (allowed, blocked, success rate)
* Redis health monitoring
* Docker support
* Production deployment on Render & Vercel

---

## Tech Stack

### Backend

* Node.js
* Express.js
* Redis
* Lua
* ioredis

### Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* Recharts
* Axios

### DevOps

* Docker
* Render
* Vercel

---

## Project Structure

```text
token-bucket-rate-limiter/
├── client/          # React Dashboard
├── server/          # Express Backend
├── docker-compose.yml
└── README.md
```

---

## Architecture

```text
                Client
                   │
                   ▼
          Express Middleware
                   │
                   ▼
          Token Bucket Logic
                   │
                   ▼
          Redis + Lua Script
                   │
                   ▼
      Allow / Reject Request
                   │
                   ▼
      Monitoring Dashboard
```

---

## Dashboard

The dashboard provides real-time monitoring including:

* Allowed Requests
* Blocked Requests
* Success Rate
* Active Buckets
* Redis Status
* Live Traffic Chart
* Bucket Details

---

## API Endpoints

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| POST   | `/api/auth/login`      | Login API protected by rate limiter |
| GET    | `/api/search`          | Search endpoint                     |
| GET    | `/api/orders`          | Orders endpoint                     |
| GET    | `/api/monitor/stats`   | Request statistics                  |
| GET    | `/api/monitor/buckets` | Active bucket information           |
| GET    | `/api/monitor/health`  | Health check                        |

---

## Running Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Docker

```bash
docker compose up -d
```

---

## Live Demo

**Frontend**

[Frontend URL](https://token-bucket-rate-limiter.vercel.app/)

**Backend**

[Backend URL](https://token-bucket-rate-limiter-ml4c.onrender.com)

---

## Key Learnings

* Distributed rate limiting
* Token Bucket algorithm
* Redis data structures
* Lua scripting for atomic operations
* Middleware design
* Docker containerization
* Environment configuration
* Production deployment
* Frontend-backend integration

---

## License

This project is available for educational and portfolio purposes.
