'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FeedPost {
    id: string
    author: string
    location: string
    content: string
    imageUrl: string
    avatarUrl: string
    timeAgo: string
    likes: number
}

const mockPosts: FeedPost[] = [
    {
        id: '1',
        author: 'Elder Martinez',
        location: 'Guatemala, Zona Central',
        content: '"Hoy visitamos una familia que ha estado preparándose para el bautismo. Su fe y dedicación me inspiran cada día. Es increíble ver cómo el evangelio transforma vidas."',
        imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2faf5c9908-177a380863e0d8bb7bdd.png',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        timeAgo: 'Hace 2 horas',
        likes: 12
    },
    {
        id: '2',
        author: 'Sister Johnson',
        location: 'Honduras, San Pedro',
        content: '"Esta semana pudimos organizar una clase especial para los jóvenes de la comunidad. Ver su entusiasmo por aprender me llena de alegría y esperanza."',
        imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b719362464-9c3fe50dbaa943f1cf89.png',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        timeAgo: 'Hace 5 horas',
        likes: 8
    },
    {
        id: '3',
        author: 'Elder Rodriguez',
        location: 'El Salvador, Santa Ana',
        content: '"Participamos en un proyecto de servicio comunitario ayudando a construir un centro de reuniones. El trabajo duro se siente diferente cuando sabes que estás sirviendo a otros."',
        imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/7046e4dcad-ed30257788fbc572a530.png',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        timeAgo: 'Ayer',
        likes: 15
    },
    {
        id: '4',
        author: 'Sister Garcia',
        location: 'Nicaragua, Managua',
        content: '"Qué bendición fue presenciar el bautismo de María Elena. Después de meses de preparación, finalmente dio este paso de fe. Momentos como estos hacen que todo valga la pena."',
        imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8fcd098a84-18537b579addde3ba09d.png',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        timeAgo: 'Hace 2 días',
        likes: 22
    },
    {
        id: '5',
        author: 'Elder Thompson',
        location: 'Costa Rica, San José',
        content: '"Las lecciones familiares siempre son especiales. Hoy estudiamos sobre la oración con la familia Morales. Su hijo de 8 años hizo preguntas muy profundas que nos hicieron reflexionar a todos."',
        imageUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/bcdf8eeb1c-0d49d85e526071369ca2.png',
        avatarUrl: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        timeAgo: 'Hace 3 días',
        likes: 18
    }
]

export function FeedPage() {
    const [posts, setPosts] = useState<FeedPost[]>(mockPosts)
    const router = useRouter()

    const handleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, likes: post.likes + 1 }
                : post
        ))
    }

    return (
        <div className="max-w-sm mx-auto bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-beacon-blue rounded-xl flex items-center justify-center">
                            <i className="fa-solid fa-book-open text-white text-sm"></i>
                        </div>
                        <h1 className="font-dm font-semibold text-lg text-deep-navy">Diario Misional</h1>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fa-solid fa-bell text-gray-600 text-sm"></i>
                    </button>
                </div>
            </header>

            <main className="pb-20">
                {/* Feed Header */}
                <section className="px-4 py-6 bg-gradient-to-br from-beacon-blue to-blue-600">
                    <div className="text-center">
                        <h2 className="font-dm font-bold text-2xl text-white mb-2">Portal Familiar</h2>
                        <p className="text-blue-100 text-sm">Mantente conectado con la misión</p>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="px-4 py-4 bg-white">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => router.push('/reports')}
                            className="bg-accent-gold text-white py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
                        >
                            <i className="fa-solid fa-chart-line text-sm"></i>
                            <span>Resumen Semanal</span>
                        </button>
                        <button
                            onClick={() => router.push('/donations')}
                            className="bg-green-500 text-white py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 shadow-lg shadow-green-500/20"
                        >
                            <i className="fa-solid fa-heart text-sm"></i>
                            <span>Donar Ahora</span>
                        </button>
                    </div>
                </section>

                {/* Feed Posts */}
                <section className="px-4 py-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-dm font-semibold text-lg text-deep-navy">Publicaciones Recientes</h3>
                        <button className="text-beacon-blue text-sm font-medium">Ver todas</button>
                    </div>

                    <div className="space-y-4">
                        {posts.map((post) => (
                            <Card key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="aspect-w-16 aspect-h-10">
                                    <img
                                        className="w-full h-48 object-cover"
                                        src={post.imageUrl}
                                        alt={`Post by ${post.author}`}
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <img
                                            src={post.avatarUrl}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium text-sm text-deep-navy">{post.author}</p>
                                            <p className="text-xs text-gray-500">{post.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{post.timeAgo}</span>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                className="text-red-500 flex items-center space-x-1"
                                            >
                                                <i className="fa-solid fa-heart text-sm"></i>
                                                <span className="text-xs">{post.likes}</span>
                                            </button>
                                            <button className="text-gray-400">
                                                <i className="fa-solid fa-share text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Weekly Summary Card */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-r from-accent-gold to-amber-400 rounded-2xl p-4 text-white shadow-lg shadow-amber-500/20">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-dm font-semibold text-lg">Resumen Semanal</h3>
                            <i className="fa-solid fa-calendar-week text-xl opacity-80"></i>
                        </div>
                        <p className="text-amber-50 text-sm mb-4">
                            Descubre los momentos más destacados de esta semana en la misión
                        </p>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">24</div>
                                <div className="text-xs text-amber-100">Lecciones</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">3</div>
                                <div className="text-xs text-amber-100">Bautismos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">45</div>
                                <div className="text-xs text-amber-100">Contactos</div>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push('/reports')}
                            className="w-full bg-white text-accent-gold py-2 rounded-xl font-medium text-sm hover:bg-amber-50"
                        >
                            Ver Reporte Completo
                        </Button>
                    </Card>
                </section>

                {/* Donation CTA */}
                <section className="px-4 py-4">
                    <Card className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-heart text-green-600"></i>
                            </div>
                            <div>
                                <h3 className="font-dm font-semibold text-deep-navy">Apoya la Misión</h3>
                                <p className="text-sm text-gray-600">Tu contribución hace la diferencia</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">
                            Ayuda a que los padres de los misioneros puedan tener acceso completo al seguimiento de sus hijos en la misión.
                        </p>
                        <Button
                            onClick={() => router.push('/donations')}
                            className="w-full bg-green-500 text-white py-3 rounded-xl font-medium shadow-lg shadow-green-500/20 hover:bg-green-600"
                        >
                            Hacer una Donación
                        </Button>
                    </Card>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-2">
                <div className="flex items-center justify-around">
                    <button className="flex flex-col items-center space-y-1 py-2 px-3 text-beacon-blue">
                        <i className="fa-solid fa-home text-lg"></i>
                        <span className="text-xs font-medium">Inicio</span>
                    </button>
                    <button
                        onClick={() => router.push('/reports')}
                        className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
                    >
                        <i className="fa-solid fa-chart-bar text-lg"></i>
                        <span className="text-xs">Reportes</span>
                    </button>
                    <button
                        onClick={() => router.push('/donations')}
                        className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
                    >
                        <i className="fa-solid fa-hand-holding-heart text-lg"></i>
                        <span className="text-xs">Donaciones</span>
                    </button>
                    <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400">
                        <i className="fa-solid fa-user text-lg"></i>
                        <span className="text-xs">Perfil</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}
