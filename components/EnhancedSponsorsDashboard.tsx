'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Highcharts from 'highcharts'
import { BottomNavigation } from '@/components/BottomNavigation'
import HighchartsReact from 'highcharts-react-official'

interface UserProfile {
    id: string
    type: 'parent' | 'sponsor' | 'mixed'
    name: string
    email: string
    missionaryId?: string
    missionaryName?: string
    missionaryMission?: string
    missionaryEndDate?: string
    autoPayment: boolean
    paymentMethod: 'monthly' | 'full'
    totalPaid: number
    remainingMonths: number
    monthlyAmount: number
    fullMissionCost: number
    lastPaymentDate: string
    nextPaymentDate: string
    sponsoredMissionaries: SponsoredMissionary[]
    thankYouMessages: ThankYouMessage[]
}

interface SponsoredMissionary {
    id: string
    name: string
    mission: string
    country: string
    startDate: string
    endDate: string
    monthlyAmount: number
    totalDonated: number
    status: 'active' | 'completed'
}

interface ThankYouMessage {
    id: string
    missionaryName: string
    message: string
    date: string
    type: 'donation' | 'milestone' | 'general'
}

interface Invoice {
    id: string
    date: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
    description: string
    downloadUrl: string
}

const mockUserProfile: UserProfile = {
    id: '1',
    type: 'mixed', // parent, sponsor, mixed
    name: 'María González',
    email: 'maria@email.com',
    missionaryId: 'M2024001',
    missionaryName: 'Elder Carlos González',
    missionaryMission: 'Misión México Puebla',
    missionaryEndDate: '2025-01-15',
    autoPayment: true,
    paymentMethod: 'monthly',
    totalPaid: 150,
    remainingMonths: 8,
    monthlyAmount: 25,
    fullMissionCost: 200,
    lastPaymentDate: '2024-12-01',
    nextPaymentDate: '2025-01-01',
    sponsoredMissionaries: [
        {
            id: '1',
            name: 'Sister Ana Martínez',
            mission: 'Misión Perú Lima',
            country: 'Perú',
            startDate: '2024-01-20',
            endDate: '2025-01-20',
            monthlyAmount: 20,
            totalDonated: 240,
            status: 'active'
        },
        {
            id: '2',
            name: 'Elder David López',
            mission: 'Misión Guatemala Ciudad',
            country: 'Guatemala',
            startDate: '2024-03-10',
            endDate: '2025-03-10',
            monthlyAmount: 20,
            totalDonated: 180,
            status: 'active'
        }
    ],
    thankYouMessages: [
        {
            id: '1',
            missionaryName: 'Sister Ana Martínez',
            message: '¡Gracias por tu generosidad! Tu apoyo me ha permitido enfocarme completamente en mi servicio.',
            date: '2024-12-20',
            type: 'donation'
        },
        {
            id: '2',
            missionaryName: 'Elder David López',
            message: 'He logrado mi primer bautismo gracias a tu apoyo. ¡Dios te bendiga!',
            date: '2024-12-15',
            type: 'milestone'
        }
    ]
}

const mockInvoices: Invoice[] = [
    {
        id: 'INV-001',
        date: '2024-12-01',
        amount: 25,
        status: 'paid',
        description: 'Plan Plata - Diciembre 2024',
        downloadUrl: '/invoices/INV-001.pdf'
    },
    {
        id: 'INV-002',
        date: '2024-11-01',
        amount: 25,
        status: 'paid',
        description: 'Plan Plata - Noviembre 2024',
        downloadUrl: '/invoices/INV-002.pdf'
    },
    {
        id: 'INV-003',
        date: '2025-01-01',
        amount: 25,
        status: 'pending',
        description: 'Plan Plata - Enero 2025',
        downloadUrl: '/invoices/INV-003.pdf'
    }
]

export function EnhancedSponsorsDashboard() {
    const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
    const [invoices] = useState<Invoice[]>(mockInvoices)
    const [showFullPayment, setShowFullPayment] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const router = useRouter()

    const calculateFullMissionCost = () => {
        return profile.remainingMonths * profile.monthlyAmount
    }

    const calculateSavings = () => {
        const fullCost = calculateFullMissionCost()
        const monthlyTotal = profile.remainingMonths * profile.monthlyAmount
        return monthlyTotal - fullCost
    }

    const handlePaymentMethodChange = (method: 'monthly' | 'full') => {
        setProfile(prev => ({ ...prev, paymentMethod: method }))
    }

    const handleAutoPaymentToggle = (enabled: boolean) => {
        setProfile(prev => ({ ...prev, autoPayment: enabled }))
    }

    const handleFullPayment = async () => {
        setIsProcessingPayment(true)
        try {
            // Simular procesamiento de pago completo
            await new Promise(resolve => setTimeout(resolve, 2000))
            alert(`Pago completo procesado: $${calculateFullMissionCost()}`)
            setShowFullPayment(false)
        } catch (error) {
            console.error('Error processing payment:', error)
            alert('Error al procesar el pago')
        } finally {
            setIsProcessingPayment(false)
        }
    }

    const handleDownloadInvoice = (invoice: Invoice) => {
        // Simular descarga de factura
        alert(`Descargando factura: ${invoice.id}`)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'overdue':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'paid':
                return 'Pagado'
            case 'pending':
                return 'Pendiente'
            case 'overdue':
                return 'Vencido'
            default:
                return 'Desconocido'
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'parent':
                return 'fa-user'
            case 'sponsor':
                return 'fa-hand-holding-heart'
            case 'mixed':
                return 'fa-users'
            default:
                return 'fa-user'
        }
    }

    const getTypeText = (type: string) => {
        switch (type) {
            case 'parent':
                return 'Padre de Misionero'
            case 'sponsor':
                return 'Sponsor'
            case 'mixed':
                return 'Padre y Sponsor'
            default:
                return 'Usuario'
        }
    }

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
            name: 'Misioneros',
            colorByPoint: true,
            data: [
                { name: 'Mi Misionero', y: 1, color: '#1D4ED8' },
                { name: 'Misioneros Patrocinados', y: profile.sponsoredMissionaries.length, color: '#F59E0B' }
            ]
        }]
    }

    return (
        <div className="w-full bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-beacon-blue rounded-xl flex items-center justify-center">
                            <i className="fa-solid fa-book-open text-white text-sm"></i>
                        </div>
                        <div>
                            <h1 className="font-dm font-semibold text-lg text-deep-navy">Mi Cuenta</h1>
                            <p className="text-xs text-gray-600">{getTypeText(profile.type)}</p>
                        </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fa-solid fa-bell text-gray-600 text-sm"></i>
                    </button>
                </div>
            </header>

            <main className="pb-20">
                {/* Profile Header */}
                <section className="px-4 py-6 bg-gradient-to-br from-beacon-blue to-blue-600">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className={`fa-solid ${getTypeIcon(profile.type)} text-white text-2xl`}></i>
                        </div>
                        <h2 className="font-dm font-bold text-xl text-white mb-1">{profile.name}</h2>
                        <p className="text-blue-100 text-sm">{profile.email}</p>
                        <Badge className="mt-2 bg-white/20 text-white border-white/30">
                            {getTypeText(profile.type)}
                        </Badge>
                    </div>
                </section>

                {/* Parent Section */}
                {profile.type === 'parent' || profile.type === 'mixed' ? (
                    <>
                        {/* Missionary Info */}
                        <section className="px-4 py-4">
                            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-user text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Mi Misionero</h3>
                                        <p className="text-sm text-gray-600">Información de tu hijo/a en la misión</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 border border-blue-200">
                                    <div className="text-center mb-3">
                                        <h4 className="font-semibold text-deep-navy text-lg">{profile.missionaryName}</h4>
                                        <p className="text-sm text-gray-600">{profile.missionaryMission}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                                            <div className="font-semibold text-blue-600">{profile.remainingMonths}</div>
                                            <div className="text-xs text-gray-600">Meses restantes</div>
                                        </div>
                                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                                            <div className="font-semibold text-blue-600">{profile.missionaryEndDate}</div>
                                            <div className="text-xs text-gray-600">Fecha de regreso</div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </section>

                        {/* Payment Options */}
                        <section className="px-4 py-4">
                            <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-credit-card text-green-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Opciones de Pago</h3>
                                        <p className="text-sm text-gray-600">Elige cómo quieres pagar la misión</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Payment Method Selection */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handlePaymentMethodChange('monthly')}
                                            className={`p-3 rounded-xl border-2 transition-all ${profile.paymentMethod === 'monthly'
                                                ? 'border-beacon-blue bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <i className="fa-solid fa-calendar text-2xl mb-2 text-beacon-blue"></i>
                                                <div className="font-semibold text-sm">Mensual</div>
                                                <div className="text-xs text-gray-600">${profile.monthlyAmount}/mes</div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => handlePaymentMethodChange('full')}
                                            className={`p-3 rounded-xl border-2 transition-all ${profile.paymentMethod === 'full'
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <i className="fa-solid fa-check-circle text-2xl mb-2 text-green-500"></i>
                                                <div className="font-semibold text-sm">Completa</div>
                                                <div className="text-xs text-gray-600">${calculateFullMissionCost()}</div>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Full Payment Benefits */}
                                    {profile.paymentMethod === 'full' && (
                                        <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <i className="fa-solid fa-gift text-green-600"></i>
                                                <span className="font-semibold text-green-800 text-sm">Ahorro por Pago Completo</span>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">${calculateSavings()}</div>
                                                <div className="text-xs text-green-700">Ahorras pagando por adelantado</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Auto Payment Toggle */}
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div>
                                            <div className="font-medium text-sm text-deep-navy">Pago Automático</div>
                                            <div className="text-xs text-gray-600">
                                                {profile.autoPayment ? 'Activado' : 'Desactivado'}
                                            </div>
                                        </div>
                                        <Switch
                                            checked={profile.autoPayment}
                                            onCheckedChange={handleAutoPaymentToggle}
                                        />
                                    </div>

                                    {/* Payment Action */}
                                    <Button
                                        onClick={() => setShowFullPayment(true)}
                                        disabled={isProcessingPayment}
                                        className="w-full bg-beacon-blue text-white py-3 rounded-xl font-semibold"
                                    >
                                        {isProcessingPayment ? 'Procesando...' : 'Realizar Pago'}
                                    </Button>
                                </div>
                            </Card>
                        </section>

                        {/* Invoices */}
                        <section className="px-4 py-4">
                            <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-dm font-semibold text-deep-navy">Facturas</h3>
                                    <button className="text-beacon-blue text-sm font-medium">Ver todas</button>
                                </div>

                                <div className="space-y-3">
                                    {invoices.map((invoice) => (
                                        <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                                    <i className="fa-solid fa-file-invoice text-gray-600"></i>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-deep-navy text-sm">{invoice.id}</p>
                                                    <p className="text-xs text-gray-600">{invoice.date}</p>
                                                    <p className="text-xs text-gray-500">{invoice.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-deep-navy">${invoice.amount}</div>
                                                <Badge className={getStatusColor(invoice.status)}>
                                                    {getStatusText(invoice.status)}
                                                </Badge>
                                                <button
                                                    onClick={() => handleDownloadInvoice(invoice)}
                                                    className="text-beacon-blue text-xs mt-1 block"
                                                >
                                                    <i className="fa-solid fa-download mr-1"></i>
                                                    Descargar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </section>
                    </>
                ) : null}

                {/* Sponsor Section */}
                {profile.type === 'sponsor' || profile.type === 'mixed' ? (
                    <>
                        {/* Sponsored Missionaries */}
                        <section className="px-4 py-4">
                            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-hand-holding-heart text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Misioneros Patrocinados</h3>
                                        <p className="text-sm text-gray-600">Personas que estás ayudando</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {profile.sponsoredMissionaries.map((missionary) => (
                                        <div key={missionary.id} className="bg-white rounded-xl p-3 border border-purple-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-deep-navy">{missionary.name}</h4>
                                                <Badge className="bg-green-100 text-green-800">
                                                    {missionary.status === 'active' ? 'Activo' : 'Completado'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">{missionary.mission}</p>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div className="text-center p-2 bg-purple-50 rounded-lg">
                                                    <div className="font-semibold text-purple-600">${missionary.monthlyAmount}/mes</div>
                                                    <div className="text-xs text-gray-600">Donación mensual</div>
                                                </div>
                                                <div className="text-center p-2 bg-purple-50 rounded-lg">
                                                    <div className="font-semibold text-purple-600">${missionary.totalDonated}</div>
                                                    <div className="text-xs text-gray-600">Total donado</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </section>

                        {/* Thank You Messages */}
                        <section className="px-4 py-4">
                            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-heart text-yellow-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-dm font-semibold text-deep-navy">Agradecimientos</h3>
                                        <p className="text-sm text-gray-600">Mensajes de los misioneros</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {profile.thankYouMessages.map((message) => (
                                        <div key={message.id} className="bg-white rounded-xl p-3 border border-yellow-200">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <i className="fa-solid fa-quote-left text-yellow-600 text-xs"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-700 italic mb-2">"{message.message}"</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-medium text-deep-navy">{message.missionaryName}</span>
                                                        <span className="text-xs text-gray-500">{message.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </section>
                    </>
                ) : null}

                {/* Mixed User Summary */}
                {profile.type === 'mixed' && (
                    <section className="px-4 py-4">
                        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-200">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fa-solid fa-chart-pie text-indigo-600 text-2xl"></i>
                                </div>
                                <h3 className="font-dm font-semibold text-deep-navy text-lg">Resumen de Impacto</h3>
                                <p className="text-sm text-gray-600">Tu contribución total a la obra misional</p>
                            </div>

                            <div className="h-64 mb-4">
                                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div className="bg-white rounded-xl p-3 border border-indigo-200">
                                    <div className="text-2xl font-bold text-indigo-600">1</div>
                                    <div className="text-xs text-gray-600">Mi Misionero</div>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-indigo-200">
                                    <div className="text-2xl font-bold text-purple-600">{profile.sponsoredMissionaries.length}</div>
                                    <div className="text-xs text-gray-600">Patrocinados</div>
                                </div>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Quick Actions */}
                <section className="px-4 py-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={() => router.push('/donations')}
                            className="bg-beacon-blue text-white py-4 px-4 rounded-2xl font-medium text-sm flex flex-col items-center space-y-2 shadow-lg shadow-blue-500/20"
                        >
                            <i className="fa-solid fa-heart text-xl"></i>
                            <span>Mis Donaciones</span>
                        </Button>
                        <Button
                            onClick={() => router.push('/donate-other')}
                            className="bg-purple-500 text-white py-4 px-4 rounded-2xl font-medium text-sm flex flex-col items-center space-y-2 shadow-lg shadow-purple-500/20"
                        >
                            <i className="fa-solid fa-hand-holding-heart text-xl"></i>
                            <span>Donar Otros</span>
                        </Button>
                    </div>
                </section>
            </main>

            {/* Full Payment Modal */}
            {showFullPayment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="bg-white rounded-2xl p-6 max-w-sm w-full">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fa-solid fa-check-circle text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-deep-navy text-lg">Pago Completo de Misión</h3>
                            <p className="text-sm text-gray-600">Confirma el pago por adelantado</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-deep-navy">${calculateFullMissionCost()}</div>
                                    <div className="text-sm text-gray-600">Pago completo de {profile.remainingMonths} meses</div>
                                    <div className="text-xs text-green-600 mt-1">
                                        Ahorras ${calculateSavings()} vs pago mensual
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    onClick={handleFullPayment}
                                    disabled={isProcessingPayment}
                                    className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
                                >
                                    {isProcessingPayment ? 'Procesando...' : 'Confirmar Pago Completo'}
                                </Button>
                                <Button
                                    onClick={() => setShowFullPayment(false)}
                                    variant="outline"
                                    className="w-full py-3 rounded-xl"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    )
}
