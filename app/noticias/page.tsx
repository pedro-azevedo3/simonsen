import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FileText } from 'lucide-react'

export default function NoticiasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <FileText className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notícias
          </h1>
          <p className="text-gray-600 text-lg">
            Em breve você poderá acessar todas as notícias do colégio aqui
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
