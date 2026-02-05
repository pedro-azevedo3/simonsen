import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PostList } from '@/components/blog/PostList'

export default function NoticiasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Notícias
          </h1>
          <p className="text-gray-600 text-lg">
            Fique por dentro das últimas notícias e acontecimentos do Colégio Roberto Simonsen
          </p>
        </div>

        <PostList />
      </main>
      <Footer />
    </div>
  )
}
