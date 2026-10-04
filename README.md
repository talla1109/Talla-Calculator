# Pocket Calc

A calculator website built with **React** and **Tailwind CSS** (Vite).

## Features
- Display screen, digits 0-9, decimal point, + − × ÷, %, AC, backspace, and =
- React state (`useReducer`) and event handling for every key
- Keyboard support, divide-by-zero and overflow errors, recent-results history
- Responsive layout and an in-page User Guide

## Run locally
```bash
npm install
npm run dev
```

## Deploy
**Vercel:** push to GitHub, then Add New > Project > import the repo > Deploy.
**Netlify:** push to GitHub, then Add new site > Import an existing project. Build command `npm run build`, publish directory `dist`.
