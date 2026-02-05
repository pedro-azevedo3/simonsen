import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Image } from 'lucide-react'

export default function GaleriaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <Image className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 text-lg">
            Em breve você poderá ver fotos dos eventos e atividades aqui
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
