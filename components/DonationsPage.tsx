'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DonationPlan {
    id: string
    name: string
    subtitle: string
    price: number
    color: string
    icon: string
    features: string[]
    isPopular?: boolean
    isElite?: boolean
}

const donationPlans: DonationPlan[] = [
    {
        id: 'plata',
        name: 'Plata',
        subtitle: 'Actualizaciones semanales',
        price: 25,
        color: 'gray',
        icon: 'fa-trophy',
        features: [
            'Acceso completo al portal familiar',
            'Actualizaciones semanales del misionero',
            'Reportes detallados de progreso',
            'Galería de fotos y videos',
            'Notificaciones de actividades'
        ],
        isPopular: true
    },
    {
        id: 'oro',
        name: 'Oro',
        subtitle: 'Actualizaciones en 24 horas',
        price: 50,
        color: 'yellow',
        icon: 'fa-crown',
        features: [
            'Todo del plan Plata',
            'Actualizaciones en 24 horas después del contenido',
            'Videollamadas mensuales con el misionero',
            'Dashboard personalizado de seguimiento',
            'Reportes personalizados',
            'Soporte prioritario',
            'Reconocimiento especial'
        ],
        isElite: true
    }
]

export function DonationsPage() {
    const [selectedPlan, setSelectedPlan] = useState<DonationPlan | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [activeTab, setActiveTab] = useState<'personal' | 'other'>('personal')
    const [missionaryCode, setMissionaryCode] = useState('')
    const [missionaryName, setMissionaryName] = useState('')
    const router = useRouter()

    const handlePlanSelect = (plan: DonationPlan) => {
        setSelectedPlan(plan)
    }

    const handleDonate = async () => {
        if (!selectedPlan) return

        setIsProcessing(true)
        try {
            // Aquí integrarías con Stripe
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPlan.price,
                    plan: selectedPlan.id,
                    description: `Plan ${selectedPlan.name} - ${selectedPlan.subtitle}`,
                    type: activeTab
                }),
            })

            const { clientSecret } = await response.json()

            // Aquí abrirías Stripe Checkout
            console.log('Opening Stripe Checkout with:', clientSecret)
            alert(`Redirigiendo a Stripe Checkout para el plan ${selectedPlan.name}`)
        } catch (error) {
            console.error('Error processing donation:', error)
            alert('Error al procesar la donación')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleOtherMissionaryDonate = async () => {
        if (!selectedPlan || !missionaryCode.trim()) {
            alert('Por favor selecciona un plan y ingresa el código del misionero')
            return
        }

        setIsProcessing(true)
        try {
            // Simular búsqueda del misionero
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPlan.price,
                    plan: selectedPlan.id,
                    description: `Plan ${selectedPlan.name} para misionero ${missionaryCode}`,
                    type: 'other',
                    missionaryCode: missionaryCode,
                    missionaryName: missionaryName
                }),
            })

            const { clientSecret } = await response.json()

            console.log('Opening Stripe Checkout for other missionary:', clientSecret)
            alert(`Redirigiendo a Stripe Checkout para donar al misionero ${missionaryCode}`)
        } catch (error) {
            console.error('Error processing donation:', error)
            alert('Error al procesar la donación')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleMissionaryCodeChange = async (code: string) => {
        setMissionaryCode(code)
        if (code.length >= 3) {
            // Simular búsqueda del misionero
            try {
                // Aquí harías una llamada a la API para buscar el misionero
                const response = await fetch(`/api/missionaries/search?code=${code}`)
                const data = await response.json()
                if (data.found) {
                    setMissionaryName(data.name)
                } else {
                    setMissionaryName('')
                }
            } catch (error) {
                console.error('Error searching missionary:', error)
                // Para demo, simular algunos nombres
                const mockNames: { [key: string]: string } = {
                    'M2024001': 'Elder Carlos Rodriguez',
                    'M2024002': 'Sister María González',
                    'M2024003': 'Elder David López',
                    'M2024004': 'Sister Ana Martínez'
                }
                setMissionaryName(mockNames[code] || '')
            }
        } else {
            setMissionaryName('')
        }
    }

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'gray':
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-600',
                    border: 'border-gray-300',
                    button: 'bg-gray-500 hover:bg-gray-600',
                    accent: 'text-gray-600'
                }
            case 'yellow':
                return {
                    bg: 'bg-yellow-100',
                    text: 'text-yellow-600',
                    border: 'border-yellow-400',
                    button: 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600',
                    accent: 'text-yellow-600'
                }
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-600',
                    border: 'border-gray-300',
                    button: 'bg-gray-500 hover:bg-gray-600',
                    accent: 'text-gray-600'
                }
        }
    }

    return (
        <div className="max-w-sm mx-auto bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                        <i className="fa-solid fa-arrow-left text-gray-600 text-sm"></i>
                    </button>
                    <h1 className="font-dm font-semibold text-lg text-deep-navy">Donaciones</h1>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="fa-solid fa-question-circle text-gray-600 text-sm"></i>
                    </button>
                </div>
            </header>

            <main className="pb-20">
                {/* Donation Hero */}
                <section className="px-4 py-6 bg-gradient-to-br from-green-500 to-emerald-600">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i className="fa-solid fa-heart text-green-500 text-2xl"></i>
                        </div>
                        <h2 className="font-dm font-bold text-2xl text-white mb-2">Apoya la Misión</h2>
                        <p className="text-green-100 text-sm">Tu contribución ayuda a que los padres puedan seguir a sus misioneros</p>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="px-4 py-4 bg-white">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                            <div className="text-2xl font-bold text-beacon-blue mb-1">156</div>
                            <div className="text-xs text-blue-600">Misioneros Activos</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                            <div className="text-2xl font-bold text-green-600 mb-1">89</div>
                            <div className="text-xs text-green-600">Familias Apoyadas</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                            <div className="text-2xl font-bold text-accent-gold mb-1">24</div>
                            <div className="text-xs text-amber-600">Países</div>
                        </div>
                    </div>
                </section>

                {/* Tabs */}
                <section className="px-4 py-4">
                    <div className="bg-gray-100 rounded-2xl p-1">
                        <div className="grid grid-cols-2 gap-1">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${activeTab === 'personal'
                                    ? 'bg-white text-beacon-blue shadow-sm'
                                    : 'text-gray-600 hover:text-deep-navy'
                                    }`}
                            >
                                <i className="fa-solid fa-user mr-2"></i>
                                Mi Misionero
                            </button>
                            <button
                                onClick={() => router.push('/donate-other')}
                                className="py-3 px-4 rounded-xl font-medium text-sm transition-all text-gray-600 hover:text-deep-navy hover:bg-gray-50"
                            >
                                <i className="fa-solid fa-hand-holding-heart mr-2"></i>
                                Otro Misionero
                            </button>
                        </div>
                    </div>
                </section>

                {/* Donation Plans */}
                <section className="px-4 py-6">
                    <div className="mb-6">
                        <h3 className="font-dm font-semibold text-xl text-deep-navy mb-2">
                            {activeTab === 'personal' ? 'Selecciona tu Plan de Apoyo' : 'Donar para Otro Misionero'}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {activeTab === 'personal'
                                ? 'Cada plan permite que los padres tengan acceso al seguimiento de su misionero'
                                : 'Ayuda a otros padres a seguir el progreso de sus misioneros'
                            }
                        </p>
                    </div>

                    {/* Other Missionary Section */}
                    {activeTab === 'other' && (
                        <div className="mb-6">
                            <Card className="bg-purple-50 border-purple-200 rounded-2xl p-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-search text-purple-600"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-dm font-semibold text-deep-navy">Buscar Misionero</h4>
                                        <p className="text-sm text-gray-600">Ingresa el código del misionero que quieres apoyar</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <Label htmlFor="missionary-code" className="text-sm font-medium text-deep-navy">
                                            Código del Misionero
                                        </Label>
                                        <Input
                                            id="missionary-code"
                                            placeholder="Ej: M2024001"
                                            value={missionaryCode}
                                            onChange={(e) => handleMissionaryCodeChange(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    {missionaryName && (
                                        <div className="bg-white rounded-xl p-3 border border-purple-200">
                                            <div className="flex items-center space-x-2">
                                                <i className="fa-solid fa-check-circle text-green-600"></i>
                                                <span className="text-sm font-medium text-deep-navy">
                                                    Misionero encontrado: {missionaryName}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {missionaryCode.length >= 3 && !missionaryName && (
                                        <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
                                            <div className="flex items-center space-x-2">
                                                <i className="fa-solid fa-exclamation-triangle text-yellow-600"></i>
                                                <span className="text-sm text-yellow-700">
                                                    Código no encontrado. Verifica el código e intenta de nuevo.
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}

                    <div className="space-y-4">
                        {donationPlans.map((plan) => {
                            const colors = getColorClasses(plan.color)
                            const isSelected = selectedPlan?.id === plan.id

                            return (
                                <Card
                                    key={plan.id}
                                    className={`bg-white rounded-2xl border-2 p-4 shadow-sm transition-all duration-200 cursor-pointer relative overflow-hidden ${isSelected
                                        ? `${colors.border} bg-green-50`
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => handlePlanSelect(plan)}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute top-0 right-0 bg-amber-400 text-white px-3 py-1 text-xs font-medium rounded-bl-xl">
                                            Popular
                                        </div>
                                    )}
                                    {plan.isElite && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 text-xs font-medium rounded-bl-xl">
                                            Elite
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                                                <i className={`fa-solid ${plan.icon} ${colors.accent} text-lg`}></i>
                                            </div>
                                            <div>
                                                <h4 className="font-dm font-semibold text-deep-navy">{plan.name}</h4>
                                                <p className="text-sm text-gray-600">{plan.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-deep-navy">${plan.price}</div>
                                            <div className="text-xs text-gray-500">USD/mes</div>
                                        </div>
                                    </div>

                                    <div className={`${colors.bg} rounded-xl p-3 mb-3`}>
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2 mb-2 last:mb-0">
                                                <i className={`fa-solid fa-check ${colors.accent} text-sm`}></i>
                                                <span className={`text-sm ${colors.text}`}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        className={`w-full ${colors.button} text-white py-3 rounded-xl font-medium text-sm shadow-lg`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handlePlanSelect(plan)
                                        }}
                                    >
                                        Seleccionar Plan {plan.name}
                                    </Button>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                {/* Payment Security */}
                <section className="px-4 py-4">
                    <Card className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-shield-halved text-green-600"></i>
                            </div>
                            <div>
                                <h3 className="font-dm font-semibold text-deep-navy">Pago Seguro</h3>
                                <p className="text-sm text-gray-600">Procesado por Stripe</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <i className="fa-brands fa-cc-visa text-2xl text-blue-600"></i>
                                <i className="fa-brands fa-cc-mastercard text-2xl text-red-500"></i>
                                <i className="fa-brands fa-cc-amex text-2xl text-blue-500"></i>
                                <i className="fa-brands fa-paypal text-2xl text-blue-700"></i>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                            Tus datos están protegidos con encriptación SSL de 256 bits
                        </p>
                    </Card>
                </section>

                {/* Donation Action */}
                <section className="px-4 py-6">
                    <Button
                        onClick={activeTab === 'personal' ? handleDonate : handleOtherMissionaryDonate}
                        disabled={!selectedPlan || isProcessing || (activeTab === 'other' && !missionaryName)}
                        className="w-full bg-green-500 text-white py-4 rounded-2xl font-dm font-semibold text-lg shadow-lg shadow-green-500/20 flex items-center justify-center space-x-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-heart text-xl"></i>
                        <span>
                            {isProcessing
                                ? 'Procesando...'
                                : selectedPlan
                                    ? activeTab === 'personal'
                                        ? `Apoyar $${selectedPlan.price}/mes - ${selectedPlan.name}`
                                        : `Donar $${selectedPlan.price}/mes para ${missionaryName || 'misionero'}`
                                    : 'Selecciona un plan'
                            }
                        </span>
                    </Button>
                    <p className="text-center text-xs text-gray-500 mt-3">
                        {activeTab === 'other' && missionaryName && (
                            <span className="block mb-1 text-purple-600 font-medium">
                                Donando para: {missionaryName}
                            </span>
                        )}
                        Al continuar, aceptas nuestros términos y condiciones
                    </p>
                </section>

                {/* Testimonial */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <img
                                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                                alt="Avatar"
                                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                            />
                            <div>
                                <p className="font-medium text-deep-navy">María González</p>
                                <p className="text-sm text-blue-600">
                                    {activeTab === 'personal' ? 'Sponsor Oro - 2 años' : 'Donante Solidario - 1 año'}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 italic mb-3">
                            {activeTab === 'personal'
                                ? "Poder seguir el progreso de mi hijo en la misión ha sido una bendición. Las actualizaciones frecuentes me mantienen conectada con su experiencia."
                                : "Donar para otros misioneros me llena de alegría. Saber que ayudo a otros padres a seguir a sus hijos es una experiencia muy gratificante."
                            }
                        </p>
                        <div className="flex items-center">
                            <div className="flex text-yellow-400">
                                <i className="fa-solid fa-star text-sm"></i>
                                <i className="fa-solid fa-star text-sm"></i>
                                <i className="fa-solid fa-star text-sm"></i>
                                <i className="fa-solid fa-star text-sm"></i>
                                <i className="fa-solid fa-star text-sm"></i>
                            </div>
                            <span className="ml-2 text-xs text-gray-600">Experiencia 5 estrellas</span>
                        </div>
                    </Card>
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
                    <button
                        onClick={() => router.push('/reports')}
                        className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
                    >
                        <i className="fa-solid fa-chart-bar text-lg"></i>
                        <span className="text-xs">Reportes</span>
                    </button>
                    <button className="flex flex-col items-center space-y-1 py-2 px-3 text-green-500">
                        <i className="fa-solid fa-hand-holding-heart text-lg"></i>
                        <span className="text-xs font-medium">Donaciones</span>
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
