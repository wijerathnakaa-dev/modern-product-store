import { ref, computed, onMounted } from 'vue'
import type { Product, ProductsResponse } from '../types/product'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const searchTerm = ref<string>('')
  const selectedCategory = ref<string>('all')

  const fetchProducts = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = ''

      const response = await fetch('https://dummyjson.com/products')
      const data: ProductsResponse = await response.json()

      products.value = data.products
    } catch (err) {
      error.value = 'Failed to fetch products'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const categories = computed<string[]>(() => {
    const set = new Set(products.value.map((p) => p.category))
    return ['all', ...Array.from(set)]
  })

  const filteredProducts = computed<Product[]>(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.value.toLowerCase())

      const matchesCategory =
        selectedCategory.value === 'all' || product.category === selectedCategory.value

      return matchesSearch && matchesCategory
    })
  })

  onMounted(fetchProducts)

  return {
    products,
    loading,
    error,
    searchTerm,
    selectedCategory,
    categories,
    filteredProducts,
  }
}
