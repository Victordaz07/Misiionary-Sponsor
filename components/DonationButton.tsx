'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, DollarSign } from 'lucide-react'

interface DonationButtonProps {
    onDonate: (amount: number) => void
    isLoading?: boolean
}

const presetAmounts = [25, 50, 100, 250, 500]

export function DonationButton({ onDonate, isLoading = false }: DonationButtonProps) {
    const [amount, setAmount] = useState('')
    const [customAmount, setCustomAmount] = useState('')

    const handlePresetAmount = (presetAmount: number) => {
        setAmount(presetAmount.toString())
        setCustomAmount('')
    }

    const handleCustomAmount = (value: string) => {
        setCustomAmount(value)
        setAmount(value)
    }

    const handleDonate = () => {
        const donationAmount = parseFloat(amount)
        if (donationAmount > 0) {
            onDonate(donationAmount)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Realizar Donación
                </CardTitle>
                <CardDescription>
                    Elige el monto que deseas donar para apoyar las misiones
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Monto sugerido</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {presetAmounts.map((presetAmount) => (
                            <Button
                                key={presetAmount}
                                variant={amount === presetAmount.toString() ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePresetAmount(presetAmount)}
                                className="text-sm"
                            >
                                ${presetAmount}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="custom-amount">Monto personalizado</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="custom-amount"
                            type="number"
                            placeholder="0.00"
                            value={customAmount}
                            onChange={(e) => handleCustomAmount(e.target.value)}
                            className="pl-10"
                            min="1"
                            step="0.01"
                        />
                    </div>
                </div>

                <Button
                    onClick={handleDonate}
                    disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                    className="w-full"
                >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isLoading ? 'Procesando...' : `Donar $${amount || '0'}`}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                    Las donaciones se procesan de forma segura con Stripe
                </p>
            </CardContent>
        </Card>
    )
}
