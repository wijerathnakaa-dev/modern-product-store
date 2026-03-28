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

      console.log('Fetching products from dummyjson.com...')
      const response = await fetch('https://dummyjson.com/products?limit=100')
      const data: ProductsResponse = await response.json()

      console.log('Products fetched successfully (up to 100):', data.products.length)
      products.value = data.products.length
        ? data.products
        : [
            {
              id: 999,
              title: 'Fallback Product',
              description: 'Fallback product loaded because API returned no items or failed',
              category: 'fallback',
              price: 0,
              discountPercentage: 0,
              rating: 0,
              stock: 1,
              brand: 'Testing',
              thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
              images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
            },
          ]
    } catch (err) {
      error.value = 'Failed to fetch products'
      console.error('ERROR fetching products:', err)
      products.value = [
        {
          id: 998,
          title: 'Offline fallback product',
          description: 'This product is shown when API request fails',
          category: 'fallback',
          price: 1,
          discountPercentage: 0,
          rating: 0,
          stock: 1,
          brand: 'Offline',
          thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
        },
      ]
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
