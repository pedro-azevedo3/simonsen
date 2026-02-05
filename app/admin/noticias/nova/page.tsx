'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { PostEditor } from '@/components/blog/PostEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'
import slugify from 'slugify'

interface Category {
  id: string
  name: string
  slug: string
}

interface Tag {
  id: string
  name: string
  slug: string
}

export default function NovaNoticiaPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState('')

  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    loadCategoriesAndTags()
  }, [])

  const loadCategoriesAndTags = async () => {
    const supabase = createClient()

    const [categoriesResult, tagsResult] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase.from('tags').select('*').order('name')
    ])

    if (categoriesResult.data) {
      setCategories(categoriesResult.data)
    }
    if (tagsResult.data) {
      setTags(tagsResult.data)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('posts-images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Erro no upload:', uploadError)
        return null
      }

      const { data } = supabase.storage
        .from('posts-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Erro no upload:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      // Upload da imagem de capa
      let coverImageUrl = null
      if (coverImage) {
        coverImageUrl = await uploadImage(coverImage)
        if (!coverImageUrl) {
          setError('Erro ao fazer upload da imagem')
          setLoading(false)
          return
        }
      }

      // Gerar slug
      const slug = slugify(title, { lower: true, strict: true })

      // Criar post
      const { data: post, error: insertError } = await supabase
        .from('posts')
        .insert({
          title,
          slug,
          content,
          excerpt,
          cover_image_url: coverImageUrl,
          author_id: user?.id,
          status,
          published_at: status === 'published' ? new Date().toISOString() : null,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Erro ao criar post:', insertError)
        setError('Erro ao criar notícia: ' + insertError.message)
        return
      }

      // Salvar categorias
      if (selectedCategories.length > 0 && post) {
        const postCategories = selectedCategories.map(categoryId => ({
          post_id: post.id,
          category_id: categoryId
        }))

        const { error: categoriesError } = await supabase
          .from('post_categories')
          .insert(postCategories)

        if (categoriesError) {
          console.error('Erro ao salvar categorias:', categoriesError)
        }
      }

      // Salvar tags
      if (selectedTags.length > 0 && post) {
        const postTags = selectedTags.map(tagId => ({
          post_id: post.id,
          tag_id: tagId
        }))

        const { error: tagsError } = await supabase
          .from('post_tags')
          .insert(postTags)

        if (tagsError) {
          console.error('Erro ao salvar tags:', tagsError)
        }
      }

      // Redirecionar
      router.push('/admin/noticias')
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro ao criar notícia')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/noticias">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Nova Notícia</h1>
            <p className="text-gray-600 mt-1">Crie uma nova notícia para o blog</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título da Notícia *</Label>
              <Input
                id="title"
                placeholder="Digite o título da notícia..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Resumo */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea
                id="excerpt"
                placeholder="Breve resumo da notícia (opcional)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <p className="text-sm text-gray-500">
                Aparecerá na listagem de notícias
              </p>
            </div>

            {/* Imagem de Capa */}
            <div className="space-y-2">
              <Label htmlFor="cover">Imagem de Capa</Label>
              <Input
                id="cover"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {coverImagePreview && (
                <div className="mt-2">
                  <img
                    src={coverImagePreview}
                    alt="Preview"
                    className="w-full max-w-md rounded-lg border"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias e Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categorias */}
            <div className="space-y-3">
              <Label>Categorias</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              {categories.length === 0 && (
                <p className="text-sm text-gray-500">Nenhuma categoria disponível</p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label>Tags</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onCheckedChange={() => toggleTag(tag.id)}
                    />
                    <label
                      htmlFor={`tag-${tag.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tag.name}
                    </label>
                  </div>
                ))}
              </div>
              {tags.length === 0 && (
                <p className="text-sm text-gray-500">Nenhuma tag disponível</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <PostEditor content={content} onChange={setContent} />
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Link href="/admin/noticias">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>

          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={loading || !title}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Rascunho
            </Button>

            <Button
              type="button"
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={loading || !title}
            >
              <Eye className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
