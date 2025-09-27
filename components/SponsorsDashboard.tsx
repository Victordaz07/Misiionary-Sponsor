'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface SponsorStats {
    sponsoredMissionaries: number
    monthlyDonations: number
    monthlyGoal: number
    goalProgress: number
    newSponsors: number
    averageDonation: number
    transactions: number
    retention: number
    totalDonations: number
    newSponsorsThisMonth: number
}

interface ActivityItem {
    id: string
    type: 'donation' | 'new_sponsor' | 'upgrade'
    title: string
    description: string
    timeAgo: string
    color: string
    icon: string
}

const mockStats: SponsorStats = {
    sponsoredMissionaries: 12,
    monthlyDonations: 2340,
    monthlyGoal: 3000,
    goalProgress: 78,
    newSponsors: 3,
    averageDonation: 195,
    transactions: 47,
    retention: 89,
    totalDonations: 156,
    newSponsorsThisMonth: 23
}

const mockActivities: ActivityItem[] = [
    {
        id: '1',
        type: 'donation',
        title: 'Nueva donación recibida',
        description: 'Familia Rodriguez - $99 (Oro)',
        timeAgo: 'Hace 2h',
        color: 'green',
        icon: 'fa-plus'
    },
    {
        id: '2',
        type: 'new_sponsor',
        title: 'Nuevo sponsor registrado',
        description: 'Carlos Mendez - $25 (Bronce)',
        timeAgo: 'Ayer',
        color: 'blue',
        icon: 'fa-user-plus'
    },
    {
        id: '3',
        type: 'upgrade',
        title: 'Upgrade de nivel',
        description: 'Ana García: Plata → Oro',
        timeAgo: 'Hace 2 días',
        color: 'amber',
        icon: 'fa-arrow-up'
    }
]

const distributionData = [
    { name: 'Oro ($99)', y: 35.2, color: '#F59E0B' },
    { name: 'Plata ($50)', y: 28.8, color: '#9CA3AF' },
    { name: 'Bronce ($25)', y: 24.1, color: '#D97706' },
    { name: 'Familiar ($5)', y: 11.9, color: '#10B981' }
]

export function SponsorsDashboard() {
    const [stats] = useState<SponsorStats>(mockStats)
    const [activities] = useState<ActivityItem[]>(mockActivities)
    const router = useRouter()

    const chartOptions = {
        chart: {
            type: 'pie',
            height: 250,
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        fontSize: '12px'
                    }
                },
                showInLegend: false
            }
        },
        series: [{
            name: 'Sponsors',
            colorByPoint: true,
            data: distributionData
        }]
    }


    const getActivityColorClasses = (color: string) => {
        switch (color) {
            case 'green':
                return 'bg-green-50 border-green-100'
            case 'blue':
                return 'bg-blue-50 border-blue-100'
            case 'amber':
                return 'bg-amber-50 border-amber-100'
            default:
                return 'bg-gray-50 border-gray-100'
        }
    }

    const getActivityIconColor = (color: string) => {
        switch (color) {
            case 'green':
                return 'text-green-600 bg-green-100'
            case 'blue':
                return 'text-blue-600 bg-blue-100'
            case 'amber':
                return 'text-amber-600 bg-amber-100'
            default:
                return 'text-gray-600 bg-gray-100'
        }
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
                        <h1 className="font-dm font-semibold text-lg text-deep-navy">Dashboard Sponsors</h1>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fa-solid fa-bell text-gray-600 text-sm"></i>
                    </button>
                </div>
            </header>

            <main className="pb-20">
                {/* Dashboard Header */}
                <section className="px-4 py-6 bg-gradient-to-br from-beacon-blue to-blue-600">
                    <div className="text-center">
                        <h2 className="font-dm font-bold text-2xl text-white mb-2">Panel de Sponsors</h2>
                        <p className="text-blue-100 text-sm">Resumen de tu impacto misional</p>
                        <div className="mt-4 bg-white/10 backdrop-blur rounded-xl p-3">
                            <div className="text-white">
                                <div className="text-2xl font-bold">Diciembre 2024</div>
                                <div className="text-blue-100 text-sm">Período actual</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Overview */}
                <section className="px-4 py-4">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Sponsored Missionaries Card */}
                        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-beacon-blue/10 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-users text-beacon-blue text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Misioneros Patrocinados</h3>
                                        <p className="text-sm text-gray-600">Total activos</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-beacon-blue">{stats.sponsoredMissionaries}</div>
                                    <div className="text-sm text-green-600 flex items-center">
                                        <i className="fa-solid fa-arrow-up text-xs mr-1"></i>
                                        +{stats.newSponsors} este mes
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Nuevos sponsors:</span>
                                    <span className="font-medium text-deep-navy">{stats.newSponsors} familias</span>
                                </div>
                            </div>
                        </Card>

                        {/* Monthly Donations Card */}
                        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-heart text-accent-gold text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Donaciones del Mes</h3>
                                        <p className="text-sm text-gray-600">Total recaudado</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-accent-gold">${stats.monthlyDonations.toLocaleString()}</div>
                                    <div className="text-sm text-green-600 flex items-center">
                                        <i className="fa-solid fa-arrow-up text-xs mr-1"></i>
                                        +15% vs mes anterior
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Promedio:</span>
                                        <span className="font-medium text-deep-navy">${stats.averageDonation}/mes</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Transacciones:</span>
                                        <span className="font-medium text-deep-navy">{stats.transactions}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Goal Progress Card */}
                        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-target text-green-600 text-xl"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Meta Mensual</h3>
                                        <p className="text-sm text-gray-600">Progreso actual</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">{stats.goalProgress}%</div>
                                    <div className="text-sm text-gray-500">${stats.monthlyDonations.toLocaleString()} / ${stats.monthlyGoal.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                                    style={{ width: `${stats.goalProgress}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-600 text-center">
                                Faltan ${(stats.monthlyGoal - stats.monthlyDonations).toLocaleString()} para alcanzar la meta
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Distribution Chart */}
                <section className="px-4 py-4">
                    <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-dm font-semibold text-lg text-deep-navy">Distribución por Niveles</h3>
                            <button className="text-beacon-blue text-sm font-medium">Ver detalles</button>
                        </div>
                        <div className="h-64">
                            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <div className="text-lg font-bold text-accent-gold">$99</div>
                                <div className="text-sm text-gray-600">Nivel Oro</div>
                                <div className="text-xs text-gray-500">8 sponsors</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <div className="text-lg font-bold text-gray-500">$50</div>
                                <div className="text-sm text-gray-600">Nivel Plata</div>
                                <div className="text-xs text-gray-500">12 sponsors</div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Recent Activity */}
                <section className="px-4 py-4">
                    <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <h3 className="font-dm font-semibold text-lg text-deep-navy mb-4">Actividad Reciente</h3>
                        <div className="space-y-3">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className={`flex items-center space-x-3 p-3 rounded-xl border ${getActivityColorClasses(activity.color)}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityIconColor(activity.color)}`}>
                                        <i className={`fa-solid ${activity.icon} text-sm`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-deep-navy">{activity.title}</p>
                                        <p className="text-xs text-gray-600">{activity.description}</p>
                                    </div>
                                    <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Quick Donation CTA */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-hand-holding-heart text-white"></i>
                            </div>
                            <div>
                                <h3 className="font-dm font-semibold text-lg">¿Quieres Ayudar a Otros?</h3>
                                <p className="text-sm text-purple-100">Donar para otros misioneros</p>
                            </div>
                        </div>
                        <p className="text-sm text-purple-100 mb-4">
                            Ayuda a otros padres a seguir el progreso de sus misioneros con una donación adicional.
                        </p>
                        <div className="space-y-2">
                            <Button
                                onClick={() => router.push('/donations')}
                                className="w-full bg-white text-purple-600 py-2 rounded-xl font-medium text-sm hover:bg-purple-50"
                            >
                                <i className="fa-solid fa-heart mr-2"></i>
                                Mis Donaciones
                            </Button>
                            <Button
                                onClick={() => router.push('/donate-other')}
                                className="w-full bg-purple-500 text-white py-2 rounded-xl font-medium text-sm hover:bg-purple-600"
                            >
                                <i className="fa-solid fa-hand-holding-heart mr-2"></i>
                                Donar para Otros
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* Monthly Summary */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-r from-beacon-blue to-blue-600 rounded-2xl p-4 text-white shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-dm font-semibold text-lg">Resumen Mensual</h3>
                            <i className="fa-solid fa-chart-line text-xl opacity-80"></i>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{stats.totalDonations}</div>
                                <div className="text-xs text-blue-100">Donaciones</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{stats.newSponsorsThisMonth}</div>
                                <div className="text-xs text-blue-100">Nuevos Sponsors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{stats.retention}%</div>
                                <div className="text-xs text-blue-100">Retención</div>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push('/reports')}
                            className="w-full bg-white text-beacon-blue py-2 rounded-xl font-medium text-sm hover:bg-blue-50"
                        >
                            Descargar Reporte Completo
                        </Button>
                    </Card>
                </section>

                {/* Quick Actions */}
                <section className="px-4 py-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={() => router.push('/reports')}
                            className="bg-accent-gold text-white py-4 px-4 rounded-2xl font-medium text-sm flex flex-col items-center space-y-2 shadow-lg shadow-amber-500/20 hover:bg-amber-600"
                        >
                            <i className="fa-solid fa-file-pdf text-xl"></i>
                            <span>Generar Reporte</span>
                        </Button>
                        <Button
                            onClick={() => {/* Implementar compartir */ }}
                            className="bg-green-500 text-white py-4 px-4 rounded-2xl font-medium text-sm flex flex-col items-center space-y-2 shadow-lg shadow-green-500/20 hover:bg-green-600"
                        >
                            <i className="fa-solid fa-share text-xl"></i>
                            <span>Compartir Dashboard</span>
                        </Button>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-2">
                <div className="flex items-center justify-around">
                    <button
                        onClick={() => router.push('/')}
                        className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
                    >
                        <i className="fa-solid fa-home text-lg"></i>
                        <span className="text-xs">Inicio</span>
                    </button>
                    <button className="flex flex-col items-center space-y-1 py-2 px-3 text-beacon-blue">
                        <i className="fa-solid fa-chart-bar text-lg"></i>
                        <span className="text-xs font-medium">Dashboard</span>
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
