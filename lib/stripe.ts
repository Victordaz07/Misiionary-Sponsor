import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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
