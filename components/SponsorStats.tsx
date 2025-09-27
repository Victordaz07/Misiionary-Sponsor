'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, DollarSign, Award, Calendar } from 'lucide-react'

interface SponsorStatsProps {
    missionariesSponsored: number
    totalDonated: number
    tier: 'bronze' | 'silver' | 'gold' | 'platinum'
    lastDonationDate: Date
}

const tierConfig = {
    bronze: {
        name: 'Bronce',
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: '🥉',
        minAmount: 0
    },
    silver: {
        name: 'Plata',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: '🥈',
        minAmount: 500
    },
    gold: {
        name: 'Oro',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: '🥇',
        minAmount: 1000
    },
    platinum: {
        name: 'Platino',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: '💎',
        minAmount: 2500
    }
}

export function SponsorStats({
    missionariesSponsored,
    totalDonated,
    tier,
    lastDonationDate
}: SponsorStatsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date)
    }

    const currentTier = tierConfig[tier]
    const nextTier = Object.entries(tierConfig).find(([_, config]) =>
        config.minAmount > totalDonated
    )?.[1]

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Misioneros Patrocinados
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{missionariesSponsored}</div>
                    <p className="text-xs text-muted-foreground">
                        Personas apoyadas
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Donado
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(totalDonated)}</div>
                    <p className="text-xs text-muted-foreground">
                        En donaciones
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Nivel Actual
                    </CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">{currentTier.icon}</span>
                        <Badge className={currentTier.color}>
                            {currentTier.name}
                        </Badge>
                    </div>
                    {nextTier && (
                        <p className="text-xs text-muted-foreground mt-2">
                            {formatCurrency(nextTier.minAmount - totalDonated)} para {nextTier.name}
                        </p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Última Donación
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-sm font-medium">
                        {formatDate(lastDonationDate)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Donación más reciente
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
