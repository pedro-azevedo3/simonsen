'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Image } from 'lucide-react'
import Link from 'next/link'

export default function GaleriaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Galeria de Fotos</h1>
          <p className="text-gray-600 mt-1">Gerencie os álbuns e fotos</p>
        </div>
        <Link href="/admin/galeria/nova">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Álbum
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Álbuns de Fotos</CardTitle>
          <CardDescription>Organize suas fotos por eventos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Image className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">Nenhum álbum ainda</p>
            <p className="text-sm mt-1 mb-4">Crie seu primeiro álbum de fotos</p>
            <Link href="/admin/galeria/nova">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Álbum
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
