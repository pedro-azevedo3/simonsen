'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Image, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const { profile } = useAuth()

  const stats = [
    {
      name: 'Posts Publicados',
      value: '0',
      icon: FileText,
      href: '/admin/noticias',
      color: 'bg-primary-500',
    },
    {
      name: 'Fotos na Galeria',
      value: '0',
      icon: Image,
      href: '/admin/galeria',
      color: 'bg-secondary-400',
    },
    {
      name: 'Eventos Futuros',
      value: '0',
      icon: Calendar,
      href: '/admin/eventos',
      color: 'bg-blue-500',
    },
  ]

  const quickActions = [
    {
      title: 'Nova Notícia',
      description: 'Criar um novo post para o blog',
      href: '/admin/noticias/nova',
      icon: FileText,
    },
    {
      title: 'Adicionar Fotos',
      description: 'Fazer upload de fotos para a galeria',
      href: '/admin/galeria/nova',
      icon: Image,
    },
    {
      title: 'Novo Evento',
      description: 'Adicionar um evento ao calendário',
      href: '/admin/eventos/novo',
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {profile?.full_name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Aqui está um resumo do seu portal
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-white p-3 rounded-lg ${stat.color} w-10 h-10`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Link href={stat.href}>
                <Button variant="link" className="px-0 text-xs">
                  Ver todos →
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <action.icon className="h-8 w-8 text-primary-600 mb-2" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>
            Suas últimas ações no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Eye className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>Nenhuma atividade recente</p>
            <p className="text-sm mt-1">Comece criando uma notícia ou evento</p>
          </div>
        </CardContent>
      </Card>

      {/* Link to public site */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Ver Site Público
              </h3>
              <p className="text-primary-100">
                Visualize como o site aparece para os visitantes
              </p>
            </div>
            <Link href="/" target="_blank">
              <Button variant="secondary">
                Abrir Site
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
