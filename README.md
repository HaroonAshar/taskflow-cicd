# TaskFlow

A lightweight, modern **task-management web app** built to demonstrate a complete CI/CD workflow — from feature branch to automated deployment.

![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue) ![Container](https://img.shields.io/badge/container-nginx%20alpine-success) ![Deploy](https://img.shields.io/badge/deploy-Render-purple)

## ✨ Features

- **Dashboard** with live stats (total, pending, completed, high-priority) and recent tasks.
- **Task list** with instant search, status/priority filters, complete & delete actions.
- **Add task** form with validation.
- **Task detail** view with progress bar and activity timeline.
- **Light & dark themes** with a one-click toggle (preference is remembered).
- **Offline-first** — tasks persist in the browser via `localStorage`, no backend required.
- Fully **responsive** and accessible. No frameworks, no build step.

## 🗂️ Project structure

```
index.html        Dashboard
task-list.html    Searchable / filterable task list
add-task.html     Create-task form
task-detail.html  Single-task view (?id=)
about.html        About + CI/CD overview
style.css         Design system (light/dark, responsive)
app.js            Task store (localStorage), theme, helpers
dockerfile        nginx:alpine static server
.github/workflows CI (Docker build/push) & CD (Render deploy)
```

## 🚀 Run locally

```bash
# Any static server works, e.g.:
python3 -m http.server 8080
# then open http://localhost:8080

# Or with Docker:
docker build -t taskflow-cicd .
docker run -p 8080:80 taskflow-cicd
```

## 🔁 CI/CD pipeline

1. **Feature branch** — work on `feature/<name>-dev/<feature>`.
2. **Pull request → CI** — GitHub Actions builds the Docker image and pushes it to Docker Hub.
3. **Merge to `develop` → CD** — a webhook triggers an automatic deploy to Render.
4. **Live** — the site is served from the nginx container.

## 🛠️ Tech stack

HTML5 · CSS3 · Vanilla JavaScript · Docker · nginx · GitHub Actions · Render
