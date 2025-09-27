import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { updateSponsorStats } from '@/lib/db'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 400 }
        )
    }

    try {
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent
                const userId = paymentIntent.metadata.userId
                const amount = paymentIntent.amount / 100 // Convertir de centavos a dólares

                if (userId) {
                    // Actualizar estadísticas del patrocinador
                    await updateSponsorStats(userId, {
                        totalDonated: amount,
                        lastDonationDate: new Date()
                    })

                    console.log(`Payment succeeded for user ${userId}: $${amount}`)
                }
                break
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent
                console.log(`Payment failed for payment intent: ${paymentIntent.id}`)
                break
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription
                console.log(`Subscription ${event.type}: ${subscription.id}`)
                break
            }

            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Error processing webhook:', error)
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        )
    }
}
