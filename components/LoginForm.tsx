'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendMagicLink } from '@/lib/auth'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await sendMagicLink(email)
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
            }, 4000)
        } catch (error) {
            console.error('Error sending magic link:', error)
            alert('Error al enviar el enlace. Por favor, intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    const isEmailValid = email && email.includes('@')

    return (
        <main className="min-h-screen flex flex-col bg-soft-light font-inter">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-beacon-blue rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <i className="fas fa-envelope text-white text-2xl"></i>
                        </div>
                        <h3 className="font-dm font-semibold text-deep-navy text-lg mb-2">
                            Enviando enlace mágico
                        </h3>
                        <p className="text-gray-600 text-sm">Revisa tu correo en unos segundos...</p>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-4 left-4 right-4 bg-green-50 border border-green-200 rounded-2xl p-4 z-50">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                            <i className="fas fa-check text-green-600 text-sm"></i>
                        </div>
                        <div>
                            <h4 className="font-medium text-green-800 text-sm">¡Enlace enviado!</h4>
                            <p className="text-green-600 text-xs">Revisa tu bandeja de entrada</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <section className="flex-1 flex flex-col justify-center px-6">
                {/* Logo Section */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-beacon-blue rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <i className="fas fa-book-open text-white text-3xl"></i>
                    </div>
                    <h1 className="font-dm font-bold text-deep-navy text-2xl mb-2">
                        Diario Misional
                    </h1>
                    <p className="text-gray-500 text-base">Portal Familiar & Sponsors</p>
                </div>

                {/* Welcome Section */}
                <div className="text-center mb-8">
                    <h2 className="font-dm font-semibold text-deep-navy text-xl mb-3">
                        Bienvenido de vuelta
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Ingresa tu correo electrónico para recibir un enlace mágico y acceder a las últimas actualizaciones de tu misionero
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-deep-navy">
                            Correo electrónico
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-deep-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-beacon-blue focus:border-transparent transition-all duration-200"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <i className="fas fa-envelope text-gray-400 text-sm"></i>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isEmailValid || isLoading}
                        className={`w-full py-4 rounded-2xl font-medium text-base focus:outline-none focus:ring-2 focus:ring-beacon-blue focus:ring-offset-2 transition-all duration-200 shadow-lg ${isEmailValid && !isLoading
                                ? 'bg-beacon-blue text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <i className="fas fa-magic-wand-sparkles mr-2"></i>
                        Recibir enlace mágico
                    </button>
                </form>

                {/* Features Section */}
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-beacon-blue/10 rounded-xl flex items-center justify-center">
                                <i className="fas fa-shield-check text-beacon-blue text-sm"></i>
                            </div>
                            <div>
                                <h3 className="font-medium text-deep-navy text-sm">Acceso seguro</h3>
                                <p className="text-gray-500 text-xs">Sin contraseñas, solo tu email</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                                <i className="fas fa-heart text-accent-gold text-sm"></i>
                            </div>
                            <div>
                                <h3 className="font-medium text-deep-navy text-sm">Sigue su progreso</h3>
                                <p className="text-gray-500 text-xs">Actualizaciones en tiempo real</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <i className="fas fa-hands-helping text-green-600 text-sm"></i>
                            </div>
                            <div>
                                <h3 className="font-medium text-deep-navy text-sm">Apoya su misión</h3>
                                <p className="text-gray-500 text-xs">Donaciones fáciles y seguras</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="px-6 pb-8">
                <div className="text-center">
                    <p className="text-gray-400 text-xs mb-4">
                        Al continuar, aceptas nuestros{' '}
                        <span className="text-beacon-blue font-medium cursor-pointer hover:underline">
                            Términos de Servicio
                        </span>{' '}
                        y{' '}
                        <span className="text-beacon-blue font-medium cursor-pointer hover:underline">
                            Política de Privacidad
                        </span>
                    </p>

                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                        <span>v1.2.0</span>
                        <span>•</span>
                        <span className="hover:text-beacon-blue transition-colors cursor-pointer">
                            Soporte
                        </span>
                        <span>•</span>
                        <span className="hover:text-beacon-blue transition-colors cursor-pointer">
                            Ayuda
                        </span>
                    </div>
                </div>
            </section>
        </main>
    )
}
