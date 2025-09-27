'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { BottomNavigation } from '@/components/BottomNavigation'

interface Missionary {
    id: string
    code: string
    name: string
    mission: string
    country: string
    startDate: string
    endDate: string
    status: 'active' | 'completed' | 'transferred'
    photo?: string
    description?: string
}

interface DonationPlan {
    id: string
    name: string
    price: number
    color: string
    features: string[]
    isPopular?: boolean
}

const mockMissionaries: Missionary[] = [
    {
        id: '1',
        code: 'M2024001',
        name: 'Elder Carlos Rodriguez',
        mission: 'Misión México Puebla',
        country: 'México',
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        status: 'active',
        description: 'Servicio en comunidades rurales de Puebla, enfocado en el trabajo con jóvenes.'
    },
    {
        id: '2',
        code: 'M2024002',
        name: 'Sister María González',
        mission: 'Misión España Madrid',
        country: 'España',
        startDate: '2024-02-01',
        endDate: '2025-02-01',
        status: 'active',
        description: 'Trabajando en el centro de Madrid, especializada en programas de servicio comunitario.'
    },
    {
        id: '3',
        code: 'M2024003',
        name: 'Elder David López',
        mission: 'Misión Guatemala Ciudad',
        country: 'Guatemala',
        startDate: '2024-03-10',
        endDate: '2025-03-10',
        status: 'active',
        description: 'Servicio en la capital guatemalteca, enfocado en el trabajo familiar.'
    },
    {
        id: '4',
        code: 'M2024004',
        name: 'Sister Ana Martínez',
        mission: 'Misión Perú Lima',
        country: 'Perú',
        startDate: '2024-01-20',
        endDate: '2025-01-20',
        status: 'active',
        description: 'Trabajando en Lima, especializada en programas de alfabetización.'
    }
]

// Misioneros sin patrocinador para donación aleatoria
const unsponsoredMissionaries: Missionary[] = [
    {
        id: '5',
        code: 'M2024005',
        name: 'Elder Miguel Santos',
        mission: 'Misión Honduras Tegucigalpa',
        country: 'Honduras',
        startDate: '2024-04-01',
        endDate: '2025-04-01',
        status: 'active',
        description: 'Servicio en comunidades urbanas de Tegucigalpa.'
    },
    {
        id: '6',
        code: 'M2024006',
        name: 'Sister Carmen Vega',
        mission: 'Misión Nicaragua Managua',
        country: 'Nicaragua',
        startDate: '2024-03-15',
        endDate: '2025-03-15',
        status: 'active',
        description: 'Trabajando en programas de alfabetización en Managua.'
    },
    {
        id: '7',
        code: 'M2024007',
        name: 'Elder Roberto Morales',
        mission: 'Misión El Salvador San Salvador',
        country: 'El Salvador',
        startDate: '2024-02-20',
        endDate: '2025-02-20',
        status: 'active',
        description: 'Servicio en el centro de San Salvador.'
    },
    {
        id: '8',
        code: 'M2024008',
        name: 'Sister Patricia Herrera',
        mission: 'Misión Costa Rica San José',
        country: 'Costa Rica',
        startDate: '2024-01-10',
        endDate: '2025-01-10',
        status: 'active',
        description: 'Trabajando con jóvenes en San José.'
    }
]

const donationPlans: DonationPlan[] = [
    {
        id: 'plata',
        name: 'Plata',
        price: 10,
        color: 'gray',
        features: [
            'Actualizaciones semanales',
            'Acceso completo al seguimiento',
            'Notificaciones por email',
            'Reportes mensuales'
        ],
        isPopular: true
    },
    {
        id: 'oro',
        name: 'Oro',
        price: 20,
        color: 'amber',
        features: [
            'Actualizaciones cada 24 horas',
            'Acceso prioritario al contenido',
            'Notificaciones inmediatas',
            'Reportes detallados',
            'Soporte prioritario'
        ]
    }
]

export function DonateOtherPage() {
    const [searchCode, setSearchCode] = useState('')
    const [selectedMissionary, setSelectedMissionary] = useState<Missionary | null>(null)
    const [selectedPlan, setSelectedPlan] = useState<DonationPlan | null>(null)
    const [isSearching, setIsSearching] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [searchResults, setSearchResults] = useState<Missionary[]>([])
    const [showResults, setShowResults] = useState(false)
    const [donorName, setDonorName] = useState('')
    const [donorEmail, setDonorEmail] = useState('')
    const [donorMessage, setDonorMessage] = useState('')
    const [donationType, setDonationType] = useState<'search' | 'random'>('search')
    const [randomMissionary, setRandomMissionary] = useState<Missionary | null>(null)
    const [shareCode, setShareCode] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)
    const router = useRouter()

    // Simular búsqueda de misioneros
    const searchMissionaries = async (code: string) => {
        if (code.length < 3) {
            setSearchResults([])
            setShowResults(false)
            return
        }

        setIsSearching(true)

        // Simular delay de búsqueda
        await new Promise(resolve => setTimeout(resolve, 1000))

        const results = mockMissionaries.filter(missionary =>
            missionary.code.toLowerCase().includes(code.toLowerCase()) ||
            missionary.name.toLowerCase().includes(code.toLowerCase())
        )

        setSearchResults(results)
        setShowResults(true)
        setIsSearching(false)
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchCode.trim()) {
                searchMissionaries(searchCode)
            } else {
                setSearchResults([])
                setShowResults(false)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchCode])

    const handleMissionarySelect = (missionary: Missionary) => {
        setSelectedMissionary(missionary)
        setSearchCode(missionary.code)
        setShowResults(false)
    }

    const handlePlanSelect = (plan: DonationPlan) => {
        setSelectedPlan(plan)
    }

    const handleRandomDonation = async () => {
        if (!selectedPlan) {
            alert('Por favor selecciona un plan de donación')
            return
        }

        if (!donorName.trim() || !donorEmail.trim()) {
            alert('Por favor completa tu información de contacto')
            return
        }

        setIsProcessing(true)

        try {
            // Seleccionar misionero aleatorio sin patrocinador
            const randomIndex = Math.floor(Math.random() * unsponsoredMissionaries.length)
            const randomMissionary = unsponsoredMissionaries[randomIndex]

            // Generar código de compartir
            const shareCode = `M${Date.now().toString().slice(-6)}`

            // Simular procesamiento de donación
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPlan.price,
                    plan: selectedPlan.id,
                    description: `Donación ${selectedPlan.name} para misionero aleatorio`,
                    type: 'random_missionary',
                    missionaryId: randomMissionary.id,
                    missionaryCode: randomMissionary.code,
                    missionaryName: randomMissionary.name,
                    donorName: donorName,
                    donorEmail: donorEmail,
                    donorMessage: donorMessage,
                    shareCode: shareCode
                }),
            })

            if (response.ok) {
                const { clientSecret } = await response.json()

                // Simular redirección a Stripe
                alert(`¡Donación procesada exitosamente!\n\nMisionero seleccionado: ${randomMissionary.name}\nMisión: ${randomMissionary.mission}\nPlan: ${selectedPlan.name} - $${selectedPlan.price}/mes\n\nRedirigiendo a Stripe Checkout...`)

                // Aquí integrarías con Stripe Checkout
                console.log('Stripe Checkout:', clientSecret)

                // Simular éxito y mostrar información
                setRandomMissionary(randomMissionary)
                setShareCode(shareCode)
                setShowSuccess(true)

                // Simular redirección después de mostrar éxito
                setTimeout(() => {
                    router.push('/donations?success=true')
                }, 5000)
            } else {
                throw new Error('Error processing donation')
            }
        } catch (error) {
            console.error('Error processing donation:', error)
            alert('Error al procesar la donación. Por favor intenta de nuevo.')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDonation = async () => {
        if (!selectedMissionary || !selectedPlan) {
            alert('Por favor selecciona un misionero y un plan de donación')
            return
        }

        if (!donorName.trim() || !donorEmail.trim()) {
            alert('Por favor completa tu información de contacto')
            return
        }

        setIsProcessing(true)

        try {
            // Simular procesamiento de donación
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPlan.price,
                    plan: selectedPlan.id,
                    description: `Donación ${selectedPlan.name} para ${selectedMissionary.name}`,
                    type: 'other_missionary',
                    missionaryId: selectedMissionary.id,
                    missionaryCode: selectedMissionary.code,
                    missionaryName: selectedMissionary.name,
                    donorName: donorName,
                    donorEmail: donorEmail,
                    donorMessage: donorMessage
                }),
            })

            if (response.ok) {
                const { clientSecret } = await response.json()

                // Simular redirección a Stripe
                alert(`¡Donación procesada exitosamente!\n\nMisionero: ${selectedMissionary.name}\nPlan: ${selectedPlan.name} - $${selectedPlan.price}/mes\n\nRedirigiendo a Stripe Checkout...`)

                // Aquí integrarías con Stripe Checkout
                console.log('Stripe Checkout:', clientSecret)

                // Simular éxito y redirección
                setTimeout(() => {
                    router.push('/donations?success=true')
                }, 2000)
            } else {
                throw new Error('Error processing donation')
            }
        } catch (error) {
            console.error('Error processing donation:', error)
            alert('Error al procesar la donación. Por favor intenta de nuevo.')
        } finally {
            setIsProcessing(false)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-blue-100 text-blue-800'
            case 'transferred':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Activo'
            case 'completed':
                return 'Completado'
            case 'transferred':
                return 'Transferido'
            default:
                return 'Desconocido'
        }
    }

    const getPlanColorClasses = (color: string) => {
        switch (color) {
            case 'gray':
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    text: 'text-gray-700',
                    button: 'bg-gray-500 hover:bg-gray-600'
                }
            case 'amber':
                return {
                    bg: 'bg-amber-50',
                    border: 'border-amber-200',
                    text: 'text-amber-700',
                    button: 'bg-amber-500 hover:bg-amber-600'
                }
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-700',
                    button: 'bg-blue-500 hover:bg-blue-600'
                }
        }
    }

    return (
        <div className="w-full bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.back()}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                            <i className="fa-solid fa-arrow-left text-gray-600 text-sm"></i>
                        </button>
                        <h1 className="font-dm font-semibold text-lg text-deep-navy">Donar para Otro Misionero</h1>
                    </div>
                    <button
                        onClick={() => router.push('/donations')}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                        <i className="fa-solid fa-heart text-gray-600 text-sm"></i>
                    </button>
                </div>
            </header>

            <main className="pb-20 max-w-4xl mx-auto">
                {/* Hero Section */}
                <section className="px-4 py-6 bg-gradient-to-br from-purple-500 to-purple-600">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-hand-holding-heart text-white text-2xl"></i>
                        </div>
                        <h2 className="font-dm font-bold text-2xl text-white mb-2">Ayuda a Otros Misioneros</h2>
                        <p className="text-purple-100 text-sm">
                            Tu donación permite que otros padres puedan seguir el progreso de sus misioneros
                        </p>
                    </div>
                </section>

                {/* Donation Type Selection */}
                <section className="px-4 py-4">
                    <div className="bg-gray-100 rounded-2xl p-1">
                        <div className="grid grid-cols-2 gap-1">
                            <button
                                onClick={() => setDonationType('search')}
                                className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${donationType === 'search'
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-600 hover:text-deep-navy'
                                    }`}
                            >
                                <i className="fa-solid fa-search mr-2"></i>
                                Buscar Específico
                            </button>
                            <button
                                onClick={() => setDonationType('random')}
                                className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${donationType === 'random'
                                    ? 'bg-white text-purple-600 shadow-sm'
                                    : 'text-gray-600 hover:text-deep-navy'
                                    }`}
                            >
                                <i className="fa-solid fa-random mr-2"></i>
                                Donación Aleatoria
                            </button>
                        </div>
                    </div>
                </section>

                {/* Missionary Search */}
                {donationType === 'search' && (
                    <section className="px-4 py-6">
                        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-search text-purple-600"></i>
                                </div>
                                <div>
                                    <h3 className="font-dm font-semibold text-deep-navy">Buscar Misionero</h3>
                                    <p className="text-sm text-gray-600">Ingresa el código o nombre del misionero</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor="missionary-search" className="text-sm font-medium text-deep-navy">
                                        Código o Nombre del Misionero
                                    </Label>
                                    <div className="relative mt-1">
                                        <Input
                                            id="missionary-search"
                                            placeholder="Ej: M2024001 o Carlos Rodriguez"
                                            value={searchCode}
                                            onChange={(e) => setSearchCode(e.target.value)}
                                            className="pr-10"
                                        />
                                        {isSearching && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Search Results */}
                                {showResults && (
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {searchResults.length > 0 ? (
                                            searchResults.map((missionary) => (
                                                <div
                                                    key={missionary.id}
                                                    onClick={() => handleMissionarySelect(missionary)}
                                                    className="p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-deep-navy text-sm">{missionary.name}</p>
                                                            <p className="text-xs text-gray-600">{missionary.code}</p>
                                                            <p className="text-xs text-gray-500">{missionary.mission}</p>
                                                        </div>
                                                        <Badge className={getStatusColor(missionary.status)}>
                                                            {getStatusText(missionary.status)}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                                                <div className="flex items-center space-x-2">
                                                    <i className="fa-solid fa-exclamation-triangle text-yellow-600"></i>
                                                    <span className="text-sm text-yellow-700">
                                                        No se encontraron misioneros con ese código o nombre
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </section>
                )}

                {/* Random Donation */}
                {donationType === 'random' && (
                    <section className="px-4 py-6">
                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-random text-green-600"></i>
                                </div>
                                <div>
                                    <h3 className="font-dm font-semibold text-deep-navy">Donación Aleatoria</h3>
                                    <p className="text-sm text-gray-600">Ayuda a un misionero que no tiene patrocinador</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-green-200">
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <i className="fa-solid fa-heart text-green-600 text-2xl"></i>
                                    </div>
                                    <h4 className="font-dm font-semibold text-deep-navy mb-2">¿Cómo Funciona?</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        El sistema seleccionará automáticamente un misionero que no tiene patrocinador.
                                        Después de tu donación, el misionero recibirá un código para compartir con sus padres
                                        y así puedan seguir su progreso en la misión.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                                        <i className="fa-solid fa-check-circle text-green-600"></i>
                                        <span className="text-sm text-gray-700">Selección automática de misionero</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                                        <i className="fa-solid fa-check-circle text-green-600"></i>
                                        <span className="text-sm text-gray-700">Código generado para compartir con padres</span>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                                        <i className="fa-solid fa-check-circle text-green-600"></i>
                                        <span className="text-sm text-gray-700">Notificación al misionero sobre la donación</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Selected Missionary */}
                {selectedMissionary && (
                    <section className="px-4 py-4">
                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-check-circle text-green-600"></i>
                                </div>
                                <div>
                                    <h3 className="font-dm font-semibold text-deep-navy">Misionero Seleccionado</h3>
                                    <p className="text-sm text-gray-600">Confirmado para recibir tu donación</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-3 border border-green-200">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-deep-navy">{selectedMissionary.name}</h4>
                                    <Badge className={getStatusColor(selectedMissionary.status)}>
                                        {getStatusText(selectedMissionary.status)}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{selectedMissionary.code}</p>
                                <p className="text-sm text-gray-500">{selectedMissionary.mission}</p>
                                <p className="text-xs text-gray-500 mt-2">{selectedMissionary.country}</p>
                                {selectedMissionary.description && (
                                    <p className="text-xs text-gray-600 mt-2 italic">{selectedMissionary.description}</p>
                                )}
                            </div>
                        </Card>
                    </section>
                )}

                {/* Donation Plans */}
                <section className="px-4 py-4">
                    <div className="mb-4">
                        <h3 className="font-dm font-semibold text-xl text-deep-navy mb-2">
                            Selecciona tu Plan de Donación
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Elige el nivel de apoyo que deseas brindar
                        </p>
                    </div>

                    <div className="space-y-3">
                        {donationPlans.map((plan) => {
                            const colors = getPlanColorClasses(plan.color)
                            const isSelected = selectedPlan?.id === plan.id

                            return (
                                <Card
                                    key={plan.id}
                                    onClick={() => handlePlanSelect(plan)}
                                    className={`cursor-pointer transition-all ${isSelected
                                        ? 'ring-2 ring-purple-500 shadow-lg'
                                        : 'hover:shadow-md'
                                        }`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                                                    <i className={`fa-solid fa-${plan.color === 'amber' ? 'crown' : 'medal'} ${colors.text} text-xl`}></i>
                                                </div>
                                                <div>
                                                    <h4 className="font-dm font-semibold text-deep-navy">{plan.name}</h4>
                                                    <p className="text-sm text-gray-600">Plan de donación</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-deep-navy">${plan.price}</div>
                                                <div className="text-sm text-gray-500">/mes</div>
                                            </div>
                                        </div>

                                        <ul className="space-y-2 mb-3">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <i className="fa-solid fa-check text-green-500 text-xs"></i>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {plan.isPopular && (
                                            <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full inline-block mb-3">
                                                Más Popular
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                {/* Donor Information */}
                <section className="px-4 py-4">
                    <Card className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-user text-blue-600"></i>
                            </div>
                            <div>
                                <h3 className="font-dm font-semibold text-deep-navy">Tu Información</h3>
                                <p className="text-sm text-gray-600">Para procesar la donación</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <Label htmlFor="donor-name" className="text-sm font-medium text-deep-navy">
                                    Nombre Completo
                                </Label>
                                <Input
                                    id="donor-name"
                                    placeholder="Tu nombre completo"
                                    value={donorName}
                                    onChange={(e) => setDonorName(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="donor-email" className="text-sm font-medium text-deep-navy">
                                    Correo Electrónico
                                </Label>
                                <Input
                                    id="donor-email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={donorEmail}
                                    onChange={(e) => setDonorEmail(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="donor-message" className="text-sm font-medium text-deep-navy">
                                    Mensaje para el Misionero (Opcional)
                                </Label>
                                <textarea
                                    id="donor-message"
                                    placeholder="Escribe un mensaje de ánimo para el misionero..."
                                    value={donorMessage}
                                    onChange={(e) => setDonorMessage(e.target.value)}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-xl resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Donation Summary */}
                {selectedMissionary && selectedPlan && (
                    <section className="px-4 py-4">
                        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-receipt text-white"></i>
                                </div>
                                <div>
                                    <h3 className="font-dm font-semibold text-lg">Resumen de Donación</h3>
                                    <p className="text-purple-100 text-sm">Revisa los detalles antes de continuar</p>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-xl p-3 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Misionero:</span>
                                    <span className="font-medium">{selectedMissionary.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Plan:</span>
                                    <span className="font-medium">{selectedPlan.name} - ${selectedPlan.price}/mes</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Misión:</span>
                                    <span className="font-medium">{selectedMissionary.mission}</span>
                                </div>
                                <div className="border-t border-white/20 pt-2 mt-2">
                                    <div className="flex justify-between text-base font-semibold">
                                        <span>Total mensual:</span>
                                        <span>${selectedPlan.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Donation Action */}
                <section className="px-4 py-6">
                    <Button
                        onClick={donationType === 'random' ? handleRandomDonation : handleDonation}
                        disabled={
                            donationType === 'random'
                                ? (!selectedPlan || !donorName.trim() || !donorEmail.trim() || isProcessing)
                                : (!selectedMissionary || !selectedPlan || !donorName.trim() || !donorEmail.trim() || isProcessing)
                        }
                        className="w-full bg-purple-500 text-white py-4 rounded-2xl font-dm font-semibold text-lg shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-heart text-xl"></i>
                        <span>
                            {isProcessing
                                ? 'Procesando...'
                                : donationType === 'random'
                                    ? (selectedPlan ? `Donar $${selectedPlan.price}/mes a misionero aleatorio` : 'Selecciona un plan')
                                    : (selectedMissionary && selectedPlan ? `Donar $${selectedPlan.price}/mes para ${selectedMissionary.name}` : 'Selecciona un misionero y plan')
                            }
                        </span>
                    </Button>
                    <p className="text-center text-xs text-gray-500 mt-3">
                        Al continuar, aceptas nuestros términos y condiciones
                    </p>
                </section>

                {/* Success Modal - Random Donation */}
                {showSuccess && randomMissionary && (
                    <section className="px-4 py-4">
                        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white shadow-lg">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <i className="fa-solid fa-check-circle text-white text-2xl"></i>
                                </div>
                                <h3 className="font-dm font-semibold text-xl mb-2">¡Donación Exitosa!</h3>
                                <p className="text-green-100 text-sm">
                                    Tu donación ha sido procesada y asignada a un misionero
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 mb-4">
                                <h4 className="font-semibold text-lg mb-2">Misionero Seleccionado</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Nombre:</span>
                                        <span className="font-medium">{randomMissionary.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Misión:</span>
                                        <span className="font-medium">{randomMissionary.mission}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>País:</span>
                                        <span className="font-medium">{randomMissionary.country}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 mb-4">
                                <h4 className="font-semibold text-lg mb-2">Código para Compartir</h4>
                                <div className="bg-white/20 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold tracking-wider">{shareCode}</p>
                                    <p className="text-xs text-green-100 mt-1">
                                        Comparte este código con los padres del misionero
                                    </p>
                                </div>
                                <Button
                                    onClick={() => navigator.clipboard.writeText(shareCode)}
                                    className="w-full mt-3 bg-white text-green-600 hover:bg-green-50"
                                >
                                    <i className="fa-solid fa-copy mr-2"></i>
                                    Copiar Código
                                </Button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-green-100 mb-3">
                                    El misionero recibirá una notificación sobre tu donación y podrá compartir
                                    el código con sus padres para que puedan seguir su progreso.
                                </p>
                                <Button
                                    onClick={() => setShowSuccess(false)}
                                    className="bg-white/20 text-white hover:bg-white/30"
                                >
                                    Entendido
                                </Button>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Help Section */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-blue-200">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fa-solid fa-question-circle text-blue-600 text-lg"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-deep-navy mb-2">¿Necesitas Ayuda?</h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Si no encuentras el misionero que buscas o tienes alguna pregunta, contáctanos.
                            </p>
                            <Button
                                variant="outline"
                                className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                                <i className="fa-solid fa-envelope mr-2"></i>
                                Contactar Soporte
                            </Button>
                        </div>
                    </Card>
                </section>
            </main>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    )
}
