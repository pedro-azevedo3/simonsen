import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PostCardProps {
  id: string
  title: string
  slug: string
  excerpt?: string
  coverImageUrl?: string
  publishedAt: string
  author?: {
    full_name: string
  }
  categories?: Array<{
    id: string
    name: string
    slug: string
  }>
}

export function PostCard({
  title,
  slug,
  excerpt,
  coverImageUrl,
  publishedAt,
  author,
  categories
}: PostCardProps) {
  return (
    <Link href={`/noticias/${slug}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Cover Image */}
        {coverImageUrl && (
          <div className="relative h-48 overflow-hidden bg-gray-200">
            <img
              src={coverImageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardContent className="p-6">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 2).map((category) => (
                <span
                  key={category.id}
                  className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(publishedAt), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
              </div>
            )}
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{author.full_name}</span>
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
            <span>Ler mais</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
