import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Image, Calendar, ArrowRight } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: 'Notícias',
      description: 'Fique por dentro das últimas notícias e acontecimentos do colégio',
      href: '/noticias',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Image,
      title: 'Galeria',
      description: 'Veja fotos dos eventos e atividades realizadas pelos alunos',
      href: '/galeria',
      color: 'from-secondary-400 to-secondary-500',
    },
    {
      icon: Calendar,
      title: 'Eventos',
      description: 'Confira o calendário com datas importantes e eventos escolares',
      href: '/eventos',
      color: 'from-blue-500 to-blue-600',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Logo */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full text-white text-4xl font-bold shadow-lg mb-4">
                RS
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Colégio Roberto Simonsen
              </h1>

              <p className="text-xl md:text-2xl text-gray-600">
                Educação de qualidade para formar cidadãos conscientes
              </p>

              <div className="flex items-center justify-center gap-3 pt-4">
                <span className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></span>
                <span className="w-3 h-3 bg-secondary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-3 h-3 bg-white border-2 border-gray-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Portal de Informações
              </h2>
              <p className="text-gray-600">
                Acesse notícias, fotos e eventos do nosso colégio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                        <span>Ver mais</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Fique Sempre Informado
              </h2>
              <p className="text-primary-100 text-lg">
                Acompanhe as novidades, eventos e conquistas dos nossos alunos através do nosso portal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/noticias">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Ver Notícias
                  </Button>
                </Link>
                <Link href="/eventos">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white hover:text-primary-600">
                    Calendário de Eventos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
