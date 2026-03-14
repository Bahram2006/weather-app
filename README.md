# WeatherNow – Modern Weather Web Application

A modern minimal weather web app that lets you search for a city and view current weather conditions using the OpenWeatherMap API.

## Tech stack

- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)
- OpenWeatherMap API

## Features

- City search (input + Search button)
- Weather card with:
  - City + country
  - Temperature (°C)
  - Condition + description
  - Weather icon
  - Humidity
  - Wind speed
- Error handling:
  - Empty input
  - City not found / API errors
  - Missing API key
- Optional:
  - Loading skeleton
  - Dark mode toggle
  - “Use my location” (geolocation)

## Setup

1) Install dependencies:

```bash
cd weathernow
npm install
```

2) Configure environment variables:

- Copy `.env.example` to `.env`
- Fill in your OpenWeatherMap key:

```bash
VITE_OWM_API_KEY=YOUR_KEY_HERE
```

3) Run the app:

```bash
npm run dev
```

## Screenshot

- Add your screenshot at `docs/screenshot.png` (optional) and reference it here.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
