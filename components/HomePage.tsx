'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BottomNavigation } from '@/components/BottomNavigation'

export function HomePage() {
    const router = useRouter()

    const features = [
        {
            icon: 'fa-chart-bar',
            title: 'Dashboard',
            description: 'Métricas detalladas de tus patrocinios y el impacto de tus donaciones',
            color: 'bg-beacon-blue/10',
            iconColor: 'text-beacon-blue',
            path: '/dashboard'
        },
        {
            icon: 'fa-images',
            title: 'Feed',
            description: 'Fotos y testimonios en tiempo real de los misioneros que patrocinas',
            color: 'bg-accent-gold/10',
            iconColor: 'text-accent-gold',
            path: '/feed'
        },
        {
            icon: 'fa-credit-card',
            title: 'Donaciones',
            description: 'Realiza donaciones seguras y gestiona tu suscripción mensual',
            color: 'bg-green-100',
            iconColor: 'text-green-600',
            path: '/donations'
        },
        {
            icon: 'fa-file-alt',
            title: 'Reportes',
            description: 'Descarga reportes mensuales detallados de tus patrocinios',
            color: 'bg-purple-100',
            iconColor: 'text-purple-600',
            path: '/reports'
        },
        {
            icon: 'fa-user',
            title: 'Perfil',
            description: 'Gestiona tu información personal y configuración de cuenta',
            color: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
            path: '/profile'
        }
    ]

    const stats = [
        { number: '1,200+', label: 'Misioneros Activos' },
        { number: '$50K+', label: 'Donaciones Recaudadas' },
        { number: '95%', label: 'Satisfacción de Padres' },
        { number: '24/7', label: 'Soporte Disponible' }
    ]

    return (
        <div className="w-full bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-beacon-blue rounded-xl flex items-center justify-center">
                                <i className="fa-solid fa-book-open text-white text-lg"></i>
                            </div>
                            <div>
                                <h1 className="font-dm font-bold text-deep-navy text-xl">Diario Misional</h1>
                                <p className="text-xs text-gray-500">Portal Familiar & Sponsors</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push('/login')}
                            className="bg-beacon-blue hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium"
                        >
                            <i className="fa-solid fa-magic-wand-sparkles mr-2"></i>
                            Iniciar Sesión
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pb-20 max-w-4xl mx-auto">
                {/* Hero Section */}
                <section className="px-4 py-8">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-beacon-blue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="fa-solid fa-book-open text-white text-3xl"></i>
                        </div>
                        <h2 className="font-dm font-bold text-deep-navy text-3xl mb-4">
                            Conecta con la Misión
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                            Sigue el trabajo de los misioneros que patrocinas y mantente conectado con su labor espiritual
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                                <i className="fa-solid fa-check-circle text-green-500 mr-2"></i>
                                Actualizaciones en tiempo real
                            </span>
                            <span className="flex items-center">
                                <i className="fa-solid fa-check-circle text-green-500 mr-2"></i>
                                Reportes detallados
                            </span>
                            <span className="flex items-center">
                                <i className="fa-solid fa-check-circle text-green-500 mr-2"></i>
                                Donaciones seguras
                            </span>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="px-4 py-6 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <Card key={index} className="text-center p-4 bg-gradient-to-br from-beacon-blue/5 to-accent-gold/5 border-0">
                                <CardContent className="p-0">
                                    <div className="text-2xl font-bold text-deep-navy mb-1">{stat.number}</div>
                                    <div className="text-xs text-gray-600">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-4 py-6">
                    <div className="text-center mb-8">
                        <h3 className="font-dm font-semibold text-xl text-deep-navy mb-2">Funcionalidades</h3>
                        <p className="text-gray-600 text-sm">Explora todas las herramientas disponibles</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <i className={`fa-solid ${feature.icon} ${feature.iconColor} text-xl`}></i>
                                    </div>
                                    <h4 className="font-dm font-semibold text-deep-navy text-lg mb-3">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <Button
                                        onClick={() => router.push(feature.path)}
                                        variant="outline"
                                        className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-beacon-blue hover:text-beacon-blue transition-colors"
                                    >
                                        <span className="text-sm font-medium">Acceder</span>
                                        <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 py-8">
                    <Card className="bg-gradient-to-br from-beacon-blue to-blue-600 text-white border-0 shadow-xl">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <i className="fa-solid fa-rocket text-white text-2xl"></i>
                            </div>
                            <h3 className="font-dm font-bold text-2xl mb-4">
                                ¿Listo para comenzar?
                            </h3>
                            <p className="text-white/90 mb-6 text-lg">
                                Únete a nuestra comunidad y apoya la obra misional
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={() => router.push('/login')}
                                    className="bg-white text-beacon-blue hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg"
                                >
                                    <i className="fa-solid fa-magic-wand-sparkles mr-2"></i>
                                    Iniciar Sesión
                                </Button>
                                <Button
                                    onClick={() => router.push('/donations')}
                                    className="bg-accent-gold text-white hover:bg-amber-500 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg border-0"
                                >
                                    <i className="fa-solid fa-heart mr-2"></i>
                                    Donar Ahora
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Footer Info */}
                <section className="px-4 py-6">
                    <div className="text-center text-sm text-gray-500">
                        <p className="mb-2">
                            <i className="fa-solid fa-shield-check mr-2"></i>
                            Donaciones 100% seguras con Stripe
                        </p>
                        <p>
                            <i className="fa-solid fa-lock mr-2"></i>
                            Tu información está protegida y encriptada
                        </p>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    )
}
