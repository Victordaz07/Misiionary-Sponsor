'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            if (isLogin) {
                // Iniciar sesión
                await signInWithEmailAndPassword(auth, email, password)
                router.push('/dashboard')
            } else {
                // Crear cuenta
                await createUserWithEmailAndPassword(auth, email, password)
                router.push('/dashboard')
            }
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                setError('No existe una cuenta con este email')
            } else if (err.code === 'auth/wrong-password') {
                setError('Contraseña incorrecta')
            } else if (err.code === 'auth/email-already-in-use') {
                setError('Ya existe una cuenta con este email')
            } else {
                setError('Error: ' + err.message)
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="w-full bg-white min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md mx-4">
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-beacon-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-book-open text-white text-2xl"></i>
                        </div>
                        <h1 className="font-dm font-bold text-deep-navy text-2xl mb-2">
                            Diario Misional
                        </h1>
                        <p className="text-gray-600">
                            Portal Familiar & Sponsors
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="mt-2"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Contraseña
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tu contraseña"
                                required
                                className="mt-2"
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-800">
                                    <i className="fa-solid fa-exclamation-triangle mr-2"></i>
                                    {error}
                                </p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-beacon-blue hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                            disabled={isLoading || !email || !password}
                        >
                            {isLoading ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                    {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-sign-in-alt mr-2"></i>
                                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <Button
                            onClick={() => setIsLogin(!isLogin)}
                            variant="outline"
                            className="text-gray-600 hover:text-gray-800 mb-4"
                        >
                            {isLogin ? '¿No tienes cuenta? Crear una' : '¿Ya tienes cuenta? Iniciar sesión'}
                        </Button>

                        <Button
                            onClick={() => router.push('/')}
                            variant="ghost"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i className="fa-solid fa-arrow-left mr-2"></i>
                            Volver al inicio
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
