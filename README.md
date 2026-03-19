# 🎮 Tetris DevSecOps — End-to-End Kubernetes Project

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions)
![Docker](https://img.shields.io/badge/Docker-Hub-blue?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-k3s-blue?logo=kubernetes)
![SonarCloud](https://img.shields.io/badge/Code%20Quality-SonarCloud-orange?logo=sonarcloud)
![OWASP](https://img.shields.io/badge/Security-OWASP-red)
![ArgoCD](https://img.shields.io/badge/GitOps-ArgoCD-orange?logo=argo)
![Prometheus](https://img.shields.io/badge/Monitoring-Prometheus-orange?logo=prometheus)
![Grafana](https://img.shields.io/badge/Monitoring-Grafana-orange?logo=grafana)

A fully containerized, production-style **Tetris game with a Leaderboard** — built to demonstrate an end-to-end DevSecOps pipeline using modern tools and best practices.

---

## 🏗️ Architecture

```
React Frontend  +  Node.js Backend  +  MongoDB
        ↓
    Dockerfile (Multi-stage build)
        ↓
  GitHub Actions CI Pipeline
    → SonarCloud (Code Quality)
    → OWASP (Security Scan)
    → Docker Build & Push to Docker Hub
    → Update Kubernetes Manifest
        ↓
    ArgoCD (GitOps - Auto Deploy)
        ↓
  Kubernetes (k3s on AWS EC2)
        ↓
  Prometheus + Grafana (Monitoring)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Containerization** | Docker |
| **Container Registry** | Docker Hub |
| **CI Pipeline** | GitHub Actions |
| **Code Quality** | SonarCloud |
| **Security Scan** | OWASP Dependency Check |
| **Kubernetes** | k3s on AWS EC2 |
| **GitOps** | ArgoCD |
| **Monitoring** | Prometheus + Grafana |

---

## 🎮 About the App

A classic **Tetris game** with a real-time **Leaderboard** feature:
- Play Tetris in the browser
- Save your score with your name when the game ends
- View the Top 10 leaderboard powered by MongoDB

---

## 🚀 CI/CD Pipeline

Every push to the `main` branch automatically triggers the GitHub Actions pipeline:

1. **Code Checkout** — pulls latest code
2. **SonarCloud Scan** — checks code quality and bugs
3. **OWASP Dependency Check** — scans for security vulnerabilities
4. **Docker Build** — builds the Docker image
5. **Push to Docker Hub** — pushes image to `kavinnaik/tetris-frontend` or `kavinnaik/tetris-backend`
6. **Update K8s Manifest** — updates the image tag in the Kubernetes manifest

ArgoCD then detects the manifest change and **automatically deploys** to the Kubernetes cluster.

---

## 📁 Project Structure

```
Tetris-DevOps/
├── frontend/                  # React Tetris game
│   ├── src/
│   │   ├── components/
│   │   │   ├── TetrisGame.js
│   │   │   ├── Leaderboard.js
│   │   │   └── GameOver.js
│   │   ├── App.js
│   │   └── App.css
│   └── Dockerfile
├── backend/                   # Node.js REST API
│   ├── models/
│   │   └── Score.js
│   ├── routes/
│   │   └── scores.js
│   ├── server.js
│   └── Dockerfile
├── kubernetes/                # K8s manifests
│   ├── frontend-deployment.yml
│   ├── backend-deployment.yml
│   └── mongodb-deployment.yml
├── docker-compose.yml         # Local development
├── sonar-project.properties   # SonarCloud config
└── .github/
    └── workflows/
        ├── frontend.yml       # Frontend CI pipeline
        └── backend.yml        # Backend CI pipeline
```

---

## 🖥️ Run Locally

### Prerequisites
- Docker & Docker Compose
- Node.js v20+
- MongoDB

### Using Docker Compose
```bash
# Clone the repo
git clone https://github.com/kavinnaik/Tetris-DevOps.git
cd Tetris-DevOps

# Run all services
docker-compose up -d

# Open in browser
http://localhost:3000
```

### Without Docker
```bash
# Start MongoDB
sudo service mongod start

# Start Backend
cd backend
npm install
npm run dev

# Start Frontend (new terminal)
cd frontend
npm install
npm start
```

---

## 📊 Monitoring

- **Prometheus** scrapes metrics from the Kubernetes cluster
- **Grafana** visualizes cluster health, pod status, and resource usage
- Accessible via NodePort on the k3s cluster

---

## 🔐 Security

- **SonarCloud** — static code analysis on every push
- **OWASP Dependency Check** — scans all npm dependencies for known CVEs
- **Docker multi-stage builds** — minimizes attack surface in production images

---

## 📬 Connect


- GitHub: [@kavinnaik](https://github.com/kavinnaik)
- Docker Hub: [kavinnaik](https://hub.docker.com/u/kavinnaik)
