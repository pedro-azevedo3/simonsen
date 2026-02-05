import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(full_name, avatar_url),
      categories:post_categories(
        category:categories(id, name, slug)
      ),
      tags:post_tags(
        tag:tags(id, name, slug)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !post) {
    return null
  }

  return {
    ...post,
    categories: post.categories?.map((pc: any) => pc.category).filter(Boolean) || [],
    tags: post.tags?.map((pt: any) => pt.tag).filter(Boolean) || []
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="w-full h-96 bg-gray-200 relative">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <Link href="/noticias">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para notícias
            </Button>
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: any) => (
                <span
                  key={category.id}
                  className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar_url ? (
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.author.full_name?.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1 text-sm">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author.full_name}</span>
                  </div>
                </div>
              </div>
            )}
            {post.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t">
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}
