import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Portal Familiar Sponsor',
    description: 'Portal para familias patrocinadoras de misiones',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <div className="min-h-screen bg-background">
                    {children}
                </div>
            </body>
        </html>
    )
}
