import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Search } from 'lucide-react'

export default function BuscarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <Search className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Buscar
          </h1>
          <p className="text-gray-600 text-lg">
            Em breve você poderá buscar notícias e conteúdos aqui
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
