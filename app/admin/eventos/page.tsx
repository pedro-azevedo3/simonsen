'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function EventosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Eventos</h1>
          <p className="text-gray-600 mt-1">Gerencie o calendário de eventos</p>
        </div>
        <Link href="/admin/eventos/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendário de Eventos</CardTitle>
          <CardDescription>Todos os eventos escolares</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">Nenhum evento agendado</p>
            <p className="text-sm mt-1 mb-4">Adicione seu primeiro evento</p>
            <Link href="/admin/eventos/novo">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Evento
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
