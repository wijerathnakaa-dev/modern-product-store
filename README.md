# Modern Product Store

A responsive Single Page Application (SPA) built using **Vue 3**, **TypeScript**, **Vite**, and **Tailwind CSS**.

This project uses the **DummyJSON API** to display products and allows users to search, filter, view product details, bookmark items, and switch between light and dark mode.

---

## Project Overview

This mini project was developed for the GUI Programming module.

The main goal of this project is to build a modern, data-driven web application using:
- Vue 3
- TypeScript
- Tailwind CSS
- reusable components
- responsive design
- API integration

The application allows users to browse products, search by name, filter by category, open product details, save bookmarks, and switch between light and dark mode.

---

## Features Implemented

- Product listing from DummyJSON API
- Search products by title
- Filter products by category
- Product details page
- Bookmark products using Pinia
- Dark mode toggle with `localStorage`
- Responsive layout for desktop and mobile
- Dynamic routing with Vue Router

---

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Pinia
- Vue Router

---

## Project Structure

```text
src/
├── components/
│   ├── CategoryFilter.vue
│   ├── ProductCard.vue
│   ├── ProductGrid.vue
│   └── SearchBar.vue
├── composables/
│   ├── useDarkMode.ts
│   └── useProducts.ts
├── pages/
│   ├── HomePage.vue
│   ├── ProductDetailsPage.vue
│   └── BookmarksPage.vue
├── router/
│   └── index.ts
├── stores/
│   └── bookmarkStore.ts
├── types/
│   └── product.ts
├── App.vue
├── main.ts
└── style.css
```

---

## Routes

- `/` → Home page
- `/product/:id` → Product details page
- `/bookmarks` → Bookmarks page

---

## How to Run the Project

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Type-check the project
```bash
npm run type-check
```

### Lint the project
```bash
npm run lint
```

---

## Component Architecture

- `App.vue` handles the main layout and router view
- `HomePage.vue` handles product listing, search, and filtering
- `ProductDetailsPage.vue` shows full information about one product
- `BookmarksPage.vue` displays saved bookmarked products
- `ProductGrid.vue` shows products in a responsive grid
- `ProductCard.vue` displays individual product details
- `SearchBar.vue` and `CategoryFilter.vue` handle user input
- `useProducts.ts` manages fetching and filtering product data
- `useDarkMode.ts` manages theme switching
- `bookmarkStore.ts` manages bookmarks using Pinia

---

## Bonus Features

- Dynamic routing using Vue Router
- Bookmark system using Pinia
- Dark mode with persistent theme state

---

## Notes

- Product data is fetched from the public DummyJSON API
- Bookmarks are stored in browser `localStorage`
- Dark mode preference is also stored in `localStorage`

---

## Submission Files

The final submission includes:
- `README.md`
- `Report.pdf`
- `prompts.txt`

---

## Author

**Achintha Wijerathna**
