# modern-product-store

A responsive Vue 3 e-commerce product browser with bookmarking and dark mode support.

## 📌 Project Overview

`modern-product-store` is a small demo app that shows:

- product listing with search/filter by category
- product details page with add/remove bookmark
- bookmark page for saved products
- dark/light mode toggle with persist in `localStorage`
- Tailwind CSS v4 `dark:` manual class variant support

## ✨ Features implemented

- product fetch from `dummyjson.com`
- category filtering and search
- responsive product grid with hover transitions
- product details view and stock/rating display
- bookmark management with Pinia store
- dark mode toggle + persistence
- route-aware navigation and accessible colors

## 🛠️ Tech stack

- Vue 3 + `<script setup>`
- Vite
- TypeScript
- Pinia
- Vue Router
- Tailwind CSS v4

## 🚀 Install and run

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
```

Type-check and lint:

```bash
npm run type-check
npm run lint
```

## 🗺️ Routes

- `/` → Home product listing
- `/product/:id` → Product details
- `/bookmarks` → Bookmarks list

## 🧩 Component structure

- `src/App.vue` — layout, navbar, theme toggle, content wrapper
- `src/pages/HomePage.vue` — search, filter, list
- `src/pages/ProductDetailsPage.vue` — details card + bookmark
- `src/pages/BookmarksPage.vue` — favorites and navigation
- `src/components/ProductGrid.vue` — responsive grid layout
- `src/components/ProductCard.vue` — card presentation
- `src/components/SearchBar.vue`, `src/components/CategoryFilter.vue`
- `src/composables/useProducts.ts` — fetch + filter logic
- `src/composables/useDarkMode.ts` — theme state + persistence
- `src/stores/bookmarkStore.ts` — bookmark state

## 🧹 Clean-up notes

- removed unused `src/stores/counter.ts`
- added error checks for fetch responses in `useProducts.ts` and `ProductDetailsPage.vue`
- removed forced dark mode in `src/main.ts`
- dark variant properly wired in `src/style.css` with `@custom-variant dark (&:where(.dark, .dark *));`

## 📁 Submission checklist

Included in repository:

- `README.md`
- `Report.pdf` (placeholder)
- `prompts.txt` (placeholder)
- all source code
