import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    isSignInWithEmailLink,
    User
} from 'firebase/auth'
import { auth } from './firebase'

// Configuración para el magic link
const actionCodeSettings = {
    // URL a la que se redirige después del login
    url: process.env.NODE_ENV === 'production'
        ? 'https://tu-dominio.vercel.app/auth/callback'
        : 'http://localhost:3001/auth/callback',
    // Dominio que maneja el link
    handleCodeInApp: true,
}

/**
 * Envía un magic link al email proporcionado
 * @param email - Email del usuario
 * @returns Promise<boolean> - true si se envió correctamente
 */
export async function sendMagicLink(email: string): Promise<boolean> {
    try {
        // Validar email
        if (!email || !email.includes('@')) {
            throw new Error('Email inválido')
        }

        // Enviar magic link
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)

        // Guardar email en localStorage para completar el login
        localStorage.setItem('emailForSignIn', email)

        console.log('✅ Magic link enviado a:', email)
        return true

    } catch (error) {
        console.error('❌ Error enviando magic link:', error)
        throw error
    }
}

/**
 * Completa el login con el magic link
 * @param email - Email del usuario (opcional, se obtiene de localStorage si no se proporciona)
 * @returns Promise<User> - Usuario autenticado
 */
export async function completeMagicLinkSignIn(email?: string): Promise<User> {
    try {
        // Verificar que estamos en un magic link
        if (!isSignInWithEmailLink(auth, window.location.href)) {
            throw new Error('No es un magic link válido')
        }

        // Obtener email del localStorage si no se proporciona
        const emailToUse = email || localStorage.getItem('emailForSignIn')

        if (!emailToUse) {
            throw new Error('No se encontró email para completar el login')
        }

        // Completar el login
        const result = await signInWithEmailLink(auth, emailToUse, window.location.href)

        // Limpiar localStorage
        localStorage.removeItem('emailForSignIn')

        console.log('✅ Login completado para:', result.user.email)
        return result.user

    } catch (error) {
        console.error('❌ Error completando login:', error)
        throw error
    }
}

/**
 * Verifica si el usuario está autenticado
 * @returns boolean
 */
export function isUserAuthenticated(): boolean {
    return !!auth.currentUser
}

/**
 * Obtiene el usuario actual
 * @returns User | null
 */
export function getCurrentUser(): User | null {
    return auth.currentUser
}

/**
 * Cierra la sesión del usuario
 */
export async function signOut(): Promise<void> {
    try {
        await auth.signOut()
        console.log('✅ Usuario deslogueado')
    } catch (error) {
        console.error('❌ Error cerrando sesión:', error)
        throw error
    }
}