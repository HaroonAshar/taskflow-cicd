/* ============================================================
   TaskFlow — Shared client-side app logic
   Functional task store (localStorage), theme, nav, helpers.
   ============================================================ */
(function () {
  "use strict";

  const STORE_KEY = "taskflow.tasks.v1";
  const THEME_KEY = "taskflow.theme";

  /* ---------- Seed data (first run only) ---------- */
  const SEED = [
    { id: 1, title: "Design landing page",          due: "2026-06-20", priority: "high",   status: "pending",   desc: "Create the marketing landing page with hero, features and CTA sections." },
    { id: 2, title: "Set up CI pipeline",            due: "2026-06-15", priority: "high",   status: "completed", desc: "Configure GitHub Actions to build and push the Docker image on every PR." },
    { id: 3, title: "Write project README",          due: "2026-06-22", priority: "medium", status: "pending",   desc: "Document setup, architecture and the CI/CD flow for new contributors." },
    { id: 4, title: "Create shared stylesheet",      due: "2026-06-12", priority: "low",    status: "completed", desc: "Build a reusable design system used across all pages." },
    { id: 5, title: "Configure Render deploy hook",  due: "2026-06-25", priority: "medium", status: "pending",   desc: "Wire the develop branch to trigger an automatic Render deployment." },
    { id: 6, title: "Add task detail view",          due: "2026-06-28", priority: "low",    status: "pending",   desc: "Show full metadata, progress and an activity timeline per task." }
  ];

  /* ---------- Store ---------- */
  const Store = {
    all() {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (!raw) { this.save(SEED); return SEED.slice(); }
        return JSON.parse(raw);
      } catch (e) { return SEED.slice(); }
    },
    save(tasks) { try { localStorage.setItem(STORE_KEY, JSON.stringify(tasks)); } catch (e) {} },
    add(task) {
      const tasks = this.all();
      task.id = tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
      tasks.push(task);
      this.save(tasks);
      return task;
    },
    get(id) { return this.all().find(t => t.id === Number(id)); },
    update(id, patch) {
      const tasks = this.all();
      const i = tasks.findIndex(t => t.id === Number(id));
      if (i > -1) { tasks[i] = Object.assign(tasks[i], patch); this.save(tasks); return tasks[i]; }
    },
    remove(id) { this.save(this.all().filter(t => t.id !== Number(id))); }
  };

  /* ---------- Theme ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const btn = document.querySelector(".theme-toggle");
    if (btn) btn.textContent = t === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(saved);
  }
  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* ---------- Helpers ---------- */
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""; }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  function fmtDate(d) {
    if (!d) return "—";
    try { return new Date(d + "T00:00").toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); }
    catch (e) { return d; }
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(a => {
      if (a.getAttribute("href") === path) a.classList.add("active");
    });
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("open"));
    const tt = document.querySelector(".theme-toggle");
    if (tt) tt.addEventListener("click", toggleTheme);
  }

  /* ---------- Expose ---------- */
  window.TaskFlow = { Store, toast, cap, param, fmtDate };

  initTheme();
  document.addEventListener("DOMContentLoaded", initNav);
})();
