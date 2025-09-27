'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ReportPreview } from '@/components/ReportPreview'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { onAuthStateChange } from '@/lib/auth'
import { User } from 'firebase/auth'
import { ArrowLeft, Download, Calendar, FileText } from 'lucide-react'

interface Report {
    id: string
    month: number
    year: number
    totalDonated: number
    missionariesSponsored: number
    feedPosts: number
    createdAt: Date
}

export default function ReportsPage() {
    const [user, setUser] = useState<User | null>(null)
    const [reports, setReports] = useState<Report[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            if (user) {
                setUser(user)
                await loadReports(user.uid)
            } else {
                router.push('/login')
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    const loadReports = async (userId: string) => {
        try {
            // En una implementación real, cargarías los reportes existentes
            // Por ahora, simulamos con datos vacíos
            setReports([])
        } catch (error) {
            console.error('Error loading reports:', error)
        }
    }

    const generateReport = async () => {
        if (!user) return

        setIsGenerating(true)
        try {
            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid,
                    month: selectedMonth,
                    year: selectedYear
                }),
            })

            const report = await response.json()

            // Agregar el reporte a la lista
            setReports(prev => [report, ...prev])
        } catch (error) {
            console.error('Error generating report:', error)
            alert('Error al generar el reporte')
        } finally {
            setIsGenerating(false)
        }
    }

    const downloadPDF = async (report: Report) => {
        try {
            // En una implementación real, generarías el PDF usando jspdf
            // Por ahora, simulamos la descarga
            const element = document.createElement('a')
            const file = new Blob(['Reporte PDF simulado'], { type: 'application/pdf' })
            element.href = URL.createObjectURL(file)
            element.download = `reporte-${report.month}-${report.year}.pdf`
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        } catch (error) {
            console.error('Error downloading PDF:', error)
            alert('Error al descargar el PDF')
        }
    }

    const downloadHTML = async (report: Report) => {
        try {
            // Generar HTML del reporte
            const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reporte Mensual - ${report.month}/${report.year}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
            .stat-card { border: 1px solid #ddd; padding: 20px; text-align: center; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
            .stat-label { color: #666; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reporte Mensual de Patrocinio</h1>
            <p>${report.month}/${report.year}</p>
          </div>
          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">$${report.totalDonated.toFixed(2)}</div>
              <div class="stat-label">Total Donado</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${report.missionariesSponsored}</div>
              <div class="stat-label">Misioneros Patrocinados</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${report.feedPosts}</div>
              <div class="stat-label">Publicaciones en Feed</div>
            </div>
          </div>
        </body>
        </html>
      `

            const element = document.createElement('a')
            const file = new Blob([htmlContent], { type: 'text/html' })
            element.href = URL.createObjectURL(file)
            element.download = `reporte-${report.month}-${report.year}.html`
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        } catch (error) {
            console.error('Error downloading HTML:', error)
            alert('Error al descargar el HTML')
        }
    }

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">Reportes</h1>
                                <p className="text-muted-foreground">
                                    Genera y descarga reportes mensuales de tu actividad
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Generate New Report */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Generar Nuevo Reporte
                            </CardTitle>
                            <CardDescription>
                                Selecciona el mes y año para generar un reporte
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="text-sm font-medium mb-2 block">Mes</label>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        {monthNames.map((month, index) => (
                                            <option key={index} value={index + 1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium mb-2 block">Año</label>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button
                                    onClick={generateReport}
                                    disabled={isGenerating}
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    {isGenerating ? 'Generando...' : 'Generar Reporte'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reports List */}
                    {reports.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <CardTitle className="mb-2">No hay reportes</CardTitle>
                                <CardDescription>
                                    Genera tu primer reporte mensual para ver el resumen de tu actividad
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {reports.map((report) => (
                                <ReportPreview
                                    key={report.id}
                                    month={report.month}
                                    year={report.year}
                                    totalDonated={report.totalDonated}
                                    missionariesSponsored={report.missionariesSponsored}
                                    feedPosts={report.feedPosts}
                                    onDownloadPDF={() => downloadPDF(report)}
                                    onDownloadHTML={() => downloadHTML(report)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
