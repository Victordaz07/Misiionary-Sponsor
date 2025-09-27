import {
    signInWithEmailLink,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth'
import { auth } from './firebase'

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: process.env.NODE_ENV === 'production'
        ? 'https://your-domain.com/auth/callback'
        : 'http://localhost:3000/auth/callback',
    // This must be true.
    handleCodeInApp: true,
}

export const sendMagicLink = async (email: string): Promise<void> => {
    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email)
    } catch (error) {
        console.error('Error sending magic link:', error)
        throw error
    }
}

export const signInWithMagicLink = async (): Promise<User | null> => {
    try {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            let email = window.localStorage.getItem('emailForSignIn')
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again.
                email = window.prompt('Please provide your email for confirmation')
            }

            if (email) {
                const result = await signInWithEmailLink(auth, email, window.location.href)
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn')
                return result.user
            }
        }
        return null
    } catch (error) {
        console.error('Error signing in with magic link:', error)
        throw error
    }
}

export const signOutUser = async (): Promise<void> => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error('Error signing out:', error)
        throw error
    }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback)
}
