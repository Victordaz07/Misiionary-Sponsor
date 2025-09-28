import Stripe from 'stripe'

// Mock Stripe configuration for development
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_development'

export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
    typescript: true,
})

export const formatAmountForDisplay = (
    amount: number,
    currency: string
): string => {
    let numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    })
    return numberFormat.format(amount)
}

export const formatAmountForStripe = (
    amount: number,
    currency: string
): number => {
    let numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    })
    const parts = numberFormat.formatToParts(amount)
    let zeroDecimalCurrency: boolean = true
    for (let part of parts) {
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
