'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FeedCard } from '@/components/FeedCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getFeedPosts } from '@/lib/db'
import { onAuthStateChange } from '@/lib/auth'
import { User } from 'firebase/auth'
import { ArrowLeft, RefreshCw, Image, Calendar } from 'lucide-react'

interface FeedPost {
    id: string
    title: string
    content: string
    imageUrl?: string
    author: string
    createdAt: any
    tags: string[]
}

export default function FeedPage() {
    const [user, setUser] = useState<User | null>(null)
    const [posts, setPosts] = useState<FeedPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            if (user) {
                setUser(user)
                await loadPosts()
            } else {
                router.push('/login')
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    const loadPosts = async () => {
        try {
            const feedPosts = await getFeedPosts(20)
            setPosts(feedPosts.map(post => ({
                ...post,
                createdAt: post.createdAt.toDate()
            })))
        } catch (error) {
            console.error('Error loading posts:', error)
        }
    }

    const handleRefresh = async () => {
        setIsRefreshing(true)
        await loadPosts()
        setIsRefreshing(false)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">Feed de Misiones</h1>
                                <p className="text-muted-foreground">
                                    Fotos y testimonios de los misioneros que patrocinas
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualizar
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {posts.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <CardTitle className="mb-2">No hay publicaciones</CardTitle>
                            <CardDescription className="mb-4">
                                Aún no hay contenido disponible en el feed.
                            </CardDescription>
                            <Button onClick={handleRefresh} disabled={isRefreshing}>
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Actualizar
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {/* Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Resumen del Feed
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">{posts.length}</div>
                                        <div className="text-sm text-muted-foreground">Publicaciones</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">
                                            {new Set(posts.map(p => p.author)).size}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Misioneros</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-primary">
                                            {posts.filter(p => p.imageUrl).length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Con Fotos</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Feed Posts */}
                        <div className="grid gap-6">
                            {posts.map((post) => (
                                <FeedCard
                                    key={post.id}
                                    title={post.title}
                                    content={post.content}
                                    imageUrl={post.imageUrl}
                                    author={post.author}
                                    createdAt={post.createdAt}
                                    tags={post.tags}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
