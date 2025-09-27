'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DonationButton } from '@/components/DonationButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getDonations } from '@/lib/db'
import { onAuthStateChange } from '@/lib/auth'
import { User } from 'firebase/auth'
import { ArrowLeft, CreditCard, History, ExternalLink } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

interface Donation {
    id: string
    amount: number
    currency: string
    status: 'pending' | 'completed' | 'failed'
    createdAt: any
    description?: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function DonationsPage() {
    const [user, setUser] = useState<User | null>(null)
    const [donations, setDonations] = useState<Donation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            if (user) {
                setUser(user)
                await loadDonations(user.uid)
            } else {
                router.push('/login')
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    const loadDonations = async (userId: string) => {
        try {
            const userDonations = await getDonations(userId)
            setDonations(userDonations.map(donation => ({
                ...donation,
                createdAt: donation.createdAt.toDate()
            })))
        } catch (error) {
            console.error('Error loading donations:', error)
        }
    }

    const handleDonate = async (amount: number) => {
        if (!user) return

        setIsProcessing(true)
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    userId: user.uid,
                    description: `Donación de $${amount} para misiones`
                }),
            })

            const { clientSecret } = await response.json()

            const stripe = await stripePromise
            if (!stripe) {
                throw new Error('Stripe no se pudo cargar')
            }

            const { error } = await stripe.confirmPayment({
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/donations?success=true`,
                },
            })

            if (error) {
                console.error('Error:', error)
                alert('Error al procesar el pago: ' + error.message)
            } else {
                // Recargar las donaciones después del pago exitoso
                await loadDonations(user.uid)
            }
        } catch (error) {
            console.error('Error processing donation:', error)
            alert('Error al procesar la donación')
        } finally {
            setIsProcessing(false)
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completada'
            case 'pending':
                return 'Pendiente'
            case 'failed':
                return 'Fallida'
            default:
                return 'Desconocido'
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
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">Donaciones</h1>
                                <p className="text-muted-foreground">
                                    Realiza donaciones y gestiona tu historial
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Portal de Cliente
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Donation Form */}
                    <div className="lg:col-span-1">
                        <DonationButton
                            onDonate={handleDonate}
                            isLoading={isProcessing}
                        />
                    </div>

                    {/* Donation History */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="h-5 w-5" />
                                    Historial de Donaciones
                                </CardTitle>
                                <CardDescription>
                                    Todas tus donaciones y su estado actual
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {donations.length === 0 ? (
                                    <div className="text-center py-8">
                                        <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            Aún no has realizado donaciones
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {donations.map((donation) => (
                                            <div
                                                key={donation.id}
                                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-primary/10 rounded-full">
                                                        <CreditCard className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {donation.description || 'Donación para misiones'}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {formatDate(donation.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg">
                                                        {formatCurrency(donation.amount)}
                                                    </p>
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
                                                        {getStatusText(donation.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
