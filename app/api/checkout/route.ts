import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
    try {
        const { amount, userId, description } = await request.json()

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Monto inválido' },
                { status: 400 }
            )
        }

        if (!userId) {
            return NextResponse.json(
                { error: 'Usuario no autenticado' },
                { status: 401 }
            )
        }

        // Crear Payment Intent en Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir a centavos
            currency: 'usd',
            metadata: {
                userId,
                description: description || 'Donación para misiones'
            },
            automatic_payment_methods: {
                enabled: true,
            },
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {
        console.error('Error creating checkout session:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
