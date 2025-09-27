'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, Calendar, DollarSign, Users, Image } from 'lucide-react'

interface ReportPreviewProps {
    month: number
    year: number
    totalDonated: number
    missionariesSponsored: number
    feedPosts: number
    onDownloadPDF: () => void
    onDownloadHTML: () => void
    isLoading?: boolean
}

const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function ReportPreview({
    month,
    year,
    totalDonated,
    missionariesSponsored,
    feedPosts,
    onDownloadPDF,
    onDownloadHTML,
    isLoading = false
}: ReportPreviewProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const monthName = monthNames[month - 1]

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Reporte Mensual
                        </CardTitle>
                        <CardDescription>
                            Resumen de actividades de {monthName} {year}
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {monthName} {year}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Resumen de métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                        <div className="p-2 bg-green-100 rounded-full">
                            <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-800">Total Donado</p>
                            <p className="text-2xl font-bold text-green-900">
                                {formatCurrency(totalDonated)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-800">Misioneros</p>
                            <p className="text-2xl font-bold text-blue-900">
                                {missionariesSponsored}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-full">
                            <Image className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-purple-800">Publicaciones</p>
                            <p className="text-2xl font-bold text-purple-900">
                                {feedPosts}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Detalles del reporte */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Detalles del Reporte</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Actividad de Donaciones</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Total donado: {formatCurrency(totalDonated)}</li>
                                <li>• Misioneros patrocinados: {missionariesSponsored}</li>
                                <li>• Promedio por misionero: {missionariesSponsored > 0 ? formatCurrency(totalDonated / missionariesSponsored) : '$0'}</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Actividad del Feed</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Publicaciones recibidas: {feedPosts}</li>
                                <li>• Promedio por semana: {Math.round(feedPosts / 4)}</li>
                                <li>• Interacción con contenido</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Botones de descarga */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                        onClick={onDownloadPDF}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        {isLoading ? 'Generando...' : 'Descargar PDF'}
                    </Button>

                    <Button
                        onClick={onDownloadHTML}
                        variant="outline"
                        disabled={isLoading}
                        className="flex-1"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Ver HTML
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                    Los reportes se generan en tiempo real con los datos más actualizados
                </p>
            </CardContent>
        </Card>
    )
}
