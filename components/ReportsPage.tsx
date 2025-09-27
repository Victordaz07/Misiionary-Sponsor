'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { BottomNavigation } from '@/components/BottomNavigation'

interface MonthlyStats {
    lessons: number
    baptisms: number
    contacts: number
    donations: number
    expenses: number
}

interface ReportData {
    month: string
    year: number
    stats: MonthlyStats
    activities: string[]
    generatedDate: string
    missionaryName: string
    missionaryCode: string
}

interface PreviousReport {
    id: string
    month: string
    year: number
    stats: MonthlyStats
    generatedDate: string
    daysAgo: number
}

interface MotivationalScripture {
    id: number
    reference: string
    text: string
    theme: string
}

const mockCurrentReport: ReportData = {
    month: 'Diciembre',
    year: 2024,
    stats: {
        lessons: 156,
        baptisms: 12,
        contacts: 89,
        donations: 2450,
        expenses: 1890
    },
    activities: [
        'Proyecto comunitario en Santa Ana',
        'Capacitación de líderes locales',
        'Programa de juventud expandido'
    ],
    generatedDate: '27 de Diciembre, 2024',
    missionaryName: 'Elder Carlos Rodriguez',
    missionaryCode: 'M2024001'
}

const mockPreviousReports: PreviousReport[] = [
    {
        id: '1',
        month: 'Noviembre',
        year: 2024,
        stats: { lessons: 142, baptisms: 8, contacts: 76, donations: 2200, expenses: 1750 },
        generatedDate: '27 de Noviembre, 2024',
        daysAgo: 30
    },
    {
        id: '2',
        month: 'Octubre',
        year: 2024,
        stats: { lessons: 128, baptisms: 15, contacts: 92, donations: 2100, expenses: 1650 },
        generatedDate: '27 de Octubre, 2024',
        daysAgo: 60
    },
    {
        id: '3',
        month: 'Septiembre',
        year: 2024,
        stats: { lessons: 134, baptisms: 11, contacts: 88, donations: 1950, expenses: 1580 },
        generatedDate: '27 de Septiembre, 2024',
        daysAgo: 90
    }
]

const motivationalScriptures: MotivationalScripture[] = [
    {
        id: 1,
        reference: 'Mateo 28:19-20',
        text: 'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.',
        theme: 'La Gran Comisión'
    },
    {
        id: 2,
        reference: 'Mosíah 2:17',
        text: 'Y he aquí, os digo estas cosas para que aprendáis sabiduría; para que sepáis que cuando estéis al servicio de vuestros semejantes, solo estáis al servicio de vuestro Dios.',
        theme: 'Servicio a Dios'
    },
    {
        id: 3,
        reference: 'Alma 26:12',
        text: 'Sí, sé que soy nada; en cuanto a mi fortaleza, soy débil; por tanto, no me jactaré de mí mismo, sino me jactaré de mi Dios, porque en su fortaleza puedo hacer todas las cosas.',
        theme: 'Fortaleza en Cristo'
    },
    {
        id: 4,
        reference: 'D. y C. 4:2',
        text: 'Por tanto, oh vosotros que os embarcáis en el servicio de Dios, mirad que le sirváis con todo vuestro corazón, alma, mente y fuerza, para que os presentéis sin culpa ante Dios en el último día.',
        theme: 'Servicio Completo'
    },
    {
        id: 5,
        reference: '1 Nefi 3:7',
        text: 'Iré y haré lo que el Señor ha mandado, porque sé que el Señor no da mandamientos a los hijos de los hombres sin prepararles la vía para que puedan cumplir lo que les ha mandado.',
        theme: 'Obediencia y Fe'
    }
]

export function ReportsPage() {
    const [reportSettings, setReportSettings] = useState({
        autoNotifications: true,
        includeCharts: true,
        detailedFormat: false
    })
    const [isGenerating, setIsGenerating] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [currentScripture, setCurrentScripture] = useState(motivationalScriptures[0])
    const [userType, setUserType] = useState<'parent' | 'sponsor'>('parent') // Simular tipo de usuario
    const router = useRouter()

    const handleDownloadReport = async () => {
        setIsDownloading(true)
        try {
            // Simular descarga de reporte
            await new Promise(resolve => setTimeout(resolve, 2000))
            alert('Reporte descargado exitosamente')
        } catch (error) {
            console.error('Error downloading report:', error)
            alert('Error al descargar el reporte')
        } finally {
            setIsDownloading(false)
        }
    }

    const handleGenerateReport = async () => {
        setIsGenerating(true)
        try {
            // Simular generación de reporte
            await new Promise(resolve => setTimeout(resolve, 3000))
            alert('Reporte generado exitosamente')
        } catch (error) {
            console.error('Error generating report:', error)
            alert('Error al generar el reporte')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleShareReport = () => {
        if (navigator.share) {
            navigator.share({
                title: `Reporte Misional - ${mockCurrentReport.month} ${mockCurrentReport.year}`,
                text: `Mira el progreso de ${mockCurrentReport.missionaryName} en su misión`,
                url: window.location.href
            })
        } else {
            // Fallback para navegadores que no soportan Web Share API
            navigator.clipboard.writeText(window.location.href)
            alert('Enlace copiado al portapapeles')
        }
    }

    const handleSendEmail = () => {
        const subject = `Reporte Misional - ${mockCurrentReport.month} ${mockCurrentReport.year}`
        const body = `Hola,\n\nTe comparto el reporte misional de ${mockCurrentReport.missionaryName} para ${mockCurrentReport.month} ${mockCurrentReport.year}.\n\nPuedes verlo aquí: ${window.location.href}\n\n¡Bendiciones!`
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    }

    const getMotivationalMessage = () => {
        if (userType === 'parent') {
            return {
                title: '¡Gracias por traer al mundo un misionero de Dios!',
                message: `Ver el progreso de ${mockCurrentReport.missionaryName} en su misión es una bendición. Su obediencia al servicio de Dios es un ejemplo para todos nosotros.`,
                encouragement: '¡Sigue motivándolo! Tu apoyo y oraciones son fundamentales para su éxito.'
            }
        } else {
            return {
                title: '¡Gracias por patrocinar esta gran obra!',
                message: `Tu generosidad permite que ${mockCurrentReport.missionaryName} pueda servir y compartir el evangelio. Cada donación hace posible que más personas conozcan la verdad.`,
                encouragement: 'Tu contribución está cambiando vidas y construyendo el reino de Dios.'
            }
        }
    }

    const motivationalMessage = getMotivationalMessage()

    return (
        <div className="w-full bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.back()}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        >
                            <i className="fa-solid fa-arrow-left text-gray-600 text-sm"></i>
                        </button>
                        <h1 className="font-dm font-semibold text-lg text-deep-navy">Reportes</h1>
                    </div>
                    <button
                        onClick={handleDownloadReport}
                        disabled={isDownloading}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                    >
                        <i className="fa-solid fa-download text-gray-600 text-sm"></i>
                    </button>
                </div>
            </header>

            <main className="pb-20 max-w-4xl mx-auto">
                {/* Report Header */}
                <section className="px-4 py-6 bg-gradient-to-br from-beacon-blue to-blue-600">
                    <div className="text-center">
                        <h2 className="font-dm font-bold text-2xl text-white mb-2">Informe Mensual</h2>
                        <p className="text-blue-100 text-sm">{mockCurrentReport.month} {mockCurrentReport.year}</p>
                    </div>
                    <div className="mt-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="grid grid-cols-3 gap-4 text-center text-white">
                            <div>
                                <div className="text-2xl font-bold">{mockCurrentReport.stats.lessons}</div>
                                <div className="text-xs text-blue-100">Lecciones</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{mockCurrentReport.stats.baptisms}</div>
                                <div className="text-xs text-blue-100">Bautismos</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{mockCurrentReport.stats.contacts}</div>
                                <div className="text-xs text-blue-100">Contactos</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Motivational Message */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-br from-accent-gold/10 to-yellow-100 rounded-2xl p-4 border border-accent-gold/20">
                        <div className="text-center mb-4">
                            <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="fa-solid fa-heart text-accent-gold text-lg"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-deep-navy text-lg mb-2">
                                {motivationalMessage.title}
                            </h3>
                            <p className="text-sm text-gray-700 mb-3">
                                {motivationalMessage.message}
                            </p>
                            <p className="text-sm font-medium text-accent-gold">
                                {motivationalMessage.encouragement}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* Motivational Scripture */}
                <section className="px-4 py-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 border border-blue-200">
                        <div className="text-center mb-3">
                            <div className="w-10 h-10 bg-beacon-blue/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <i className="fa-solid fa-book text-beacon-blue"></i>
                            </div>
                            <h4 className="font-dm font-semibold text-deep-navy">Escritura del Mes</h4>
                            <p className="text-xs text-gray-600">1 de 24 escrituras motivacionales</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-beacon-blue mb-2">
                                {currentScripture.reference}
                            </p>
                            <p className="text-sm text-gray-700 italic leading-relaxed mb-2">
                                "{currentScripture.text}"
                            </p>
                            <p className="text-xs text-gray-600">
                                Tema: {currentScripture.theme}
                            </p>
                        </div>
                    </Card>
                </section>

                {/* Report Preview */}
                <section className="px-4 py-6">
                    <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-dm font-semibold text-deep-navy">Vista Previa del Reporte</h3>
                                <div className="flex items-center space-x-2">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <i className="fa-solid fa-expand text-sm"></i>
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <i className="fa-solid fa-print text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 min-h-[400px] relative">
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                                <div className="text-center mb-6">
                                    <div className="w-12 h-12 bg-beacon-blue rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <i className="fa-solid fa-book-open text-white text-lg"></i>
                                    </div>
                                    <h1 className="font-dm font-bold text-xl text-deep-navy mb-1">Diario Misional</h1>
                                    <p className="text-sm text-gray-600">Informe Mensual - {mockCurrentReport.month} {mockCurrentReport.year}</p>
                                    <div className="w-16 h-0.5 bg-accent-gold mx-auto mt-3"></div>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                        <h4 className="font-semibold text-deep-navy mb-2">Resumen Ejecutivo</h4>
                                        <p className="text-gray-700 text-xs leading-relaxed">
                                            Este mes hemos experimentado un crecimiento significativo en nuestras actividades misioneras.
                                            Con {mockCurrentReport.stats.lessons} lecciones impartidas y {mockCurrentReport.stats.baptisms} bautismos realizados,
                                            continuamos expandiendo nuestra presencia en las comunidades locales.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                            <div className="text-beacon-blue font-bold text-lg">{mockCurrentReport.stats.lessons}</div>
                                            <div className="text-xs text-gray-600">Lecciones Totales</div>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                            <div className="text-green-600 font-bold text-lg">{mockCurrentReport.stats.baptisms}</div>
                                            <div className="text-xs text-gray-600">Bautismos</div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                                        <h4 className="font-semibold text-deep-navy mb-2">Actividades Destacadas</h4>
                                        <ul className="space-y-1 text-xs text-gray-700">
                                            {mockCurrentReport.activities.map((activity, index) => (
                                                <li key={index} className="flex items-center space-x-2">
                                                    <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                                                    <span>{activity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-accent-gold/10 rounded-lg p-3 border border-accent-gold/30">
                                        <h4 className="font-semibold text-deep-navy mb-2">Impacto Financiero</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="text-accent-gold font-bold">${mockCurrentReport.stats.donations.toLocaleString()}</div>
                                                <div className="text-xs text-gray-600">Donaciones</div>
                                            </div>
                                            <div>
                                                <div className="text-accent-gold font-bold">${mockCurrentReport.stats.expenses.toLocaleString()}</div>
                                                <div className="text-xs text-gray-600">Gastos Operativos</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                                    <p className="text-xs text-gray-500">Generado el {mockCurrentReport.generatedDate}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Report Actions */}
                <section className="px-4 py-4">
                    <div className="space-y-3">
                        <Button
                            onClick={handleDownloadReport}
                            disabled={isDownloading}
                            className="w-full bg-beacon-blue text-white py-4 px-6 rounded-2xl font-semibold text-base shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-3 disabled:opacity-50"
                        >
                            <i className="fa-solid fa-download text-lg"></i>
                            <span>{isDownloading ? 'Descargando...' : 'Descargar Informe Mensual'}</span>
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                onClick={handleShareReport}
                                variant="outline"
                                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-gray-200"
                            >
                                <i className="fa-solid fa-share text-sm"></i>
                                <span>Compartir</span>
                            </Button>
                            <Button
                                onClick={handleSendEmail}
                                variant="outline"
                                className="bg-accent-gold/10 text-accent-gold py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center space-x-2 hover:bg-accent-gold/20"
                            >
                                <i className="fa-solid fa-envelope text-sm"></i>
                                <span>Enviar Email</span>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Previous Reports */}
                <section className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-dm font-semibold text-lg text-deep-navy">Reportes Anteriores</h3>
                        <button className="text-beacon-blue text-sm font-medium">Ver todos</button>
                    </div>

                    <div className="space-y-3">
                        {mockPreviousReports.map((report) => (
                            <Card key={report.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                            <i className="fa-solid fa-file-pdf text-gray-600"></i>
                                        </div>
                                        <div>
                                            <p className="font-medium text-deep-navy text-sm">{report.month} {report.year}</p>
                                            <p className="text-xs text-gray-500">Generado hace {report.daysAgo} días</p>
                                        </div>
                                    </div>
                                    <button className="text-beacon-blue">
                                        <i className="fa-solid fa-download text-sm"></i>
                                    </button>
                                </div>
                                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                                    <div>
                                        <div className="text-sm font-semibold text-deep-navy">{report.stats.lessons}</div>
                                        <div className="text-xs text-gray-500">Lecciones</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-deep-navy">{report.stats.baptisms}</div>
                                        <div className="text-xs text-gray-500">Bautismos</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-deep-navy">{report.stats.contacts}</div>
                                        <div className="text-xs text-gray-500">Contactos</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Report Settings */}
                <section className="px-4 py-4">
                    <Card className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                        <h3 className="font-dm font-semibold text-deep-navy mb-3">Configuración de Reportes</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm text-deep-navy">Notificaciones automáticas</p>
                                    <p className="text-xs text-gray-500">Recibe el reporte mensual por email</p>
                                </div>
                                <Switch
                                    checked={reportSettings.autoNotifications}
                                    onCheckedChange={(checked) =>
                                        setReportSettings(prev => ({ ...prev, autoNotifications: checked }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm text-deep-navy">Incluir gráficos</p>
                                    <p className="text-xs text-gray-500">Agregar visualizaciones de datos</p>
                                </div>
                                <Switch
                                    checked={reportSettings.includeCharts}
                                    onCheckedChange={(checked) =>
                                        setReportSettings(prev => ({ ...prev, includeCharts: checked }))
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm text-deep-navy">Formato detallado</p>
                                    <p className="text-xs text-gray-500">Incluir testimonios y fotos</p>
                                </div>
                                <Switch
                                    checked={reportSettings.detailedFormat}
                                    onCheckedChange={(checked) =>
                                        setReportSettings(prev => ({ ...prev, detailedFormat: checked }))
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                </section>
            </main>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    )
}
