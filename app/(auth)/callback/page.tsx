'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithMagicLink } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthCallbackPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const router = useRouter()

    useEffect(() => {
        const handleAuth = async () => {
            try {
                const user = await signInWithMagicLink()
                if (user) {
                    setStatus('success')
                    setMessage('¡Inicio de sesión exitoso! Redirigiendo...')
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 2000)
                } else {
                    setStatus('error')
                    setMessage('No se pudo completar el inicio de sesión. Por favor, intenta de nuevo.')
                }
            } catch (error) {
                setStatus('error')
                setMessage('Error al procesar el enlace de autenticación.')
                console.error('Auth error:', error)
            }
        }

        handleAuth()
    }, [router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {status === 'loading' && 'Procesando...'}
                        {status === 'success' && '¡Bienvenido!'}
                        {status === 'error' && 'Error'}
                    </CardTitle>
                    <CardDescription>
                        {status === 'loading' && 'Verificando tu enlace de autenticación...'}
                        {status === 'success' && 'Tu sesión ha sido iniciada correctamente'}
                        {status === 'error' && 'Hubo un problema con tu autenticación'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="space-y-4">
                        {status === 'loading' && (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        )}

                        {status === 'success' && (
                            <div className="text-green-600 text-4xl">✓</div>
                        )}

                        {status === 'error' && (
                            <div className="text-red-600 text-4xl">✗</div>
                        )}

                        <p className="text-sm text-muted-foreground">
                            {message}
                        </p>

                        {status === 'error' && (
                            <div className="mt-4">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="text-primary hover:underline text-sm"
                                >
                                    Intentar de nuevo
                                </button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
