import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <FileText className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notícia não encontrada
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            A notícia que você está procurando não existe ou foi removida.
          </p>
          <Link href="/noticias">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para notícias
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
