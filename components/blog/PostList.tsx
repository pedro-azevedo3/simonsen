'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PostCard } from './PostCard'
import { FileText } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image_url: string | null
  published_at: string
  author: {
    full_name: string
  }
  categories: Array<{
    id: string
    name: string
    slug: string
  }>
}

interface PostListProps {
  limit?: number
  showEmptyState?: boolean
}

export function PostList({ limit, showEmptyState = true }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const supabase = createClient()

      let query = supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          cover_image_url,
          published_at,
          author:profiles!posts_author_id_fkey(full_name),
          categories:post_categories(
            category:categories(id, name, slug)
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) {
        console.error('Erro ao carregar posts:', error)
        return
      }

      // Transform data to match expected structure
      const transformedPosts = data?.map((post: any) => ({
        ...post,
        categories: post.categories?.map((pc: any) => pc.category).filter(Boolean) || []
      })) || []

      setPosts(transformedPosts)
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="bg-white p-6 rounded-b-lg space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0 && showEmptyState) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma notícia publicada ainda
        </h3>
        <p className="text-gray-600">
          As notícias publicadas aparecerão aqui
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          slug={post.slug}
          excerpt={post.excerpt || ''}
          coverImageUrl={post.cover_image_url || ''}
          publishedAt={post.published_at}
          author={post.author}
          categories={post.categories}
        />
      ))}
    </div>
  )
}
