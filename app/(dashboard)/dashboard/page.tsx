'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SponsorStats } from '@/components/SponsorStats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getSponsorStats } from '@/lib/db'
import { onAuthStateChange } from '@/lib/auth'
import { User } from 'firebase/auth'
import { LogOut, Settings, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null)
    const [stats, setStats] = useState({
        missionariesSponsored: 0,
        totalDonated: 0,
        tier: 'bronze' as 'bronze' | 'silver' | 'gold' | 'platinum',
        lastDonationDate: new Date()
    })
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            if (user) {
                setUser(user)
                try {
                    const userStats = await getSponsorStats(user.uid)
                    if (userStats) {
                        setStats({
                            missionariesSponsored: userStats.missionariesSponsored,
                            totalDonated: userStats.totalDonated,
                            tier: userStats.tier,
                            lastDonationDate: userStats.lastDonationDate.toDate()
                        })
                    }
                } catch (error) {
                    console.error('Error loading stats:', error)
                }
            } else {
                router.push('/login')
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    const handleSignOut = async () => {
        try {
            const { signOutUser } = await import('@/lib/auth')
            await signOutUser()
            router.push('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
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
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-muted-foreground">
                                Bienvenido, {user.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-2" />
                                Configuración
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleSignOut}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Stats Overview */}
                <div className="mb-8">
                    <SponsorStats
                        missionariesSponsored={stats.missionariesSponsored}
                        totalDonated={stats.totalDonated}
                        tier={stats.tier}
                        lastDonationDate={stats.lastDonationDate}
                    />
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/feed')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📸</span>
                                Ver Feed
                            </CardTitle>
                            <CardDescription>
                                Últimas fotos y testimonios de los misioneros
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                Ver Contenido
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/donations')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">💳</span>
                                Realizar Donación
                            </CardTitle>
                            <CardDescription>
                                Apoya las misiones con una nueva donación
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                Donar Ahora
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/reports')}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">📊</span>
                                Ver Reportes
                            </CardTitle>
                            <CardDescription>
                                Descarga reportes mensuales de tu actividad
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                Ver Reportes
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Actividad Reciente
                        </CardTitle>
                        <CardDescription>
                            Resumen de tu actividad como patrocinador
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <span className="text-green-600">💰</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Última donación</p>
                                        <p className="text-sm text-muted-foreground">
                                            {stats.lastDonationDate.toLocaleDateString('es-ES')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">
                                        ${stats.totalDonated.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Total donado</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <span className="text-blue-600">👥</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Misioneros patrocinados</p>
                                        <p className="text-sm text-muted-foreground">
                                            Personas que apoyas actualmente
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600">
                                        {stats.missionariesSponsored}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Activos</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
