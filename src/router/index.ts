import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ProductDetailsPage from '../pages/ProductDetailsPage.vue'
import BookmarksPage from '../pages/BookmarksPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/product/:id', name: 'product-details', component: ProductDetailsPage },
    { path: '/bookmarks', name: 'bookmarks', component: BookmarksPage },
  ],
})

export default router
