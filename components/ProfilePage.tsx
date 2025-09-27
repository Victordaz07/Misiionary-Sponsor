'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { BottomNavigation } from '@/components/BottomNavigation'

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    monthly: true,
    achievements: true,
    donations: true
  })

    // Datos del usuario (simulados)
    const userData = {
        name: "María González",
        email: "maria.gonzalez@email.com",
        role: "parent", // "parent", "sponsor", "mixed"
        joinDate: "Enero 2024",
        avatar: "MG",
        missionary: {
            name: "Elder Carlos González",
            mission: "Misión México Puebla",
            startDate: "Enero 2024",
            endDate: "Enero 2026",
            monthsRemaining: 12
        },
        stats: {
            totalDonated: 1250,
            missionariesSponsored: 3,
            monthsActive: 8,
            reportsDownloaded: 24
        }
    }

    const handleSave = () => {
        setIsEditing(false)
        // Aquí se guardarían los cambios en la base de datos
        console.log('Perfil guardado')
    }

  const handleCancel = () => {
    setIsEditing(false)
    // Aquí se restaurarían los valores originales
  }


    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'parent':
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Padre de Misionero</Badge>
            case 'sponsor':
                return <Badge className="bg-green-100 text-green-800 border-green-200">Sponsor</Badge>
            case 'mixed':
                return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Padre y Sponsor</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Usuario</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-soft-light to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-beacon-blue rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-user text-white text-lg"></i>
                            </div>
                            <div>
                                <h1 className="font-dm font-bold text-xl text-deep-navy">Mi Perfil</h1>
                                <p className="text-sm text-gray-600">Gestiona tu información personal</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-beacon-blue hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                        >
                            <i className="fa-solid fa-edit mr-2"></i>
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 pb-24 space-y-6">
                {/* Información Personal */}
                <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            {/* Avatar */}
                            <div className="w-20 h-20 bg-gradient-to-br from-beacon-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">{userData.avatar}</span>
                            </div>

                            {/* Información */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            defaultValue={userData.name}
                                            className="font-dm font-bold text-xl text-deep-navy bg-gray-50 border border-gray-300 rounded-lg px-3 py-1"
                                        />
                                    ) : (
                                        <h2 className="font-dm font-bold text-xl text-deep-navy">{userData.name}</h2>
                                    )}
                                    {getRoleBadge(userData.role)}
                                </div>

                                <div className="space-y-2">
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            defaultValue={userData.email}
                                            className="text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 w-full"
                                        />
                                    ) : (
                                        <p className="text-gray-600">{userData.email}</p>
                                    )}
                                    <p className="text-sm text-gray-500">Miembro desde {userData.joinDate}</p>
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-4 flex space-x-3">
                                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                                    <i className="fa-solid fa-check mr-2"></i>
                                    Guardar Cambios
                                </Button>
                                <Button onClick={handleCancel} variant="outline" className="border-gray-300">
                                    <i className="fa-solid fa-times mr-2"></i>
                                    Cancelar
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Información del Misionero (Solo para padres) */}
                {(userData.role === 'parent' || userData.role === 'mixed') && (
                    <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-book-open text-blue-600"></i>
                                </div>
                                <h3 className="font-dm font-semibold text-lg text-deep-navy">Mi Misionero</h3>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-deep-navy">{userData.missionary.name}</h4>
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                        {userData.missionary.monthsRemaining} meses restantes
                                    </Badge>
                                </div>
                                <p className="text-gray-600 mb-2">{userData.missionary.mission}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span><i className="fa-solid fa-calendar mr-1"></i> Inicio: {userData.missionary.startDate}</span>
                                    <span><i className="fa-solid fa-calendar-check mr-1"></i> Fin: {userData.missionary.endDate}</span>
                                </div>

                                {/* Progreso de la misión */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Progreso de la Misión</span>
                                        <span>50%</span>
                                    </div>
                                    <Progress value={50} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Estadísticas */}
                <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-chart-line text-green-600"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-lg text-deep-navy">Mis Estadísticas</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Donado</p>
                                        <p className="font-bold text-xl text-deep-navy">${userData.stats.totalDonated.toLocaleString()}</p>
                                    </div>
                                    <i className="fa-solid fa-dollar-sign text-green-600 text-2xl"></i>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Misioneros Patrocinados</p>
                                        <p className="font-bold text-xl text-deep-navy">{userData.stats.missionariesSponsored}</p>
                                    </div>
                                    <i className="fa-solid fa-users text-blue-600 text-2xl"></i>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Meses Activo</p>
                                        <p className="font-bold text-xl text-deep-navy">{userData.stats.monthsActive}</p>
                                    </div>
                                    <i className="fa-solid fa-calendar-days text-purple-600 text-2xl"></i>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Reportes Descargados</p>
                                        <p className="font-bold text-xl text-deep-navy">{userData.stats.reportsDownloaded}</p>
                                    </div>
                                    <i className="fa-solid fa-download text-orange-600 text-2xl"></i>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Configuración de Notificaciones */}
                <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-bell text-yellow-600"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-lg text-deep-navy">Configuración de Notificaciones</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Notificaciones por Email</p>
                                    <p className="text-sm text-gray-600">Recibe actualizaciones importantes por correo</p>
                                </div>
                                <Switch
                                    checked={notifications.email}
                                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Notificaciones Push</p>
                                    <p className="text-sm text-gray-600">Recibe notificaciones en tiempo real</p>
                                </div>
                                <Switch
                                    checked={notifications.push}
                                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Resumen Semanal</p>
                                    <p className="text-sm text-gray-600">Recibe un resumen cada semana</p>
                                </div>
                                <Switch
                                    checked={notifications.weekly}
                                    onCheckedChange={(checked) => setNotifications({ ...notifications, weekly: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Reporte Mensual</p>
                                    <p className="text-sm text-gray-600">Recibe el reporte mensual automáticamente</p>
                                </div>
                                <Switch
                                    checked={notifications.monthly}
                                    onCheckedChange={(checked) => setNotifications({ ...notifications, monthly: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Logros del Misionero</p>
                                    <p className="text-sm text-gray-600">Notificaciones cuando tu misionero logra algo</p>
                                </div>
                                <Switch
                                    checked={notifications.achievements}
                                    onCheckedChange={(checked) => setNotifications({ ...notifications, achievements: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Recordatorios de Donación</p>
                                    <p className="text-sm text-gray-600">Recibe recordatorios para mantener tu donación</p>
                                </div>
                                <Switch
                                    checked={notifications.donations}
                                    onCheckedChange={(checked) => setNotifications({ ...notifications, donations: checked })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Configuración de Privacidad */}
                <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-shield-halved text-red-600"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-lg text-deep-navy">Privacidad y Seguridad</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Perfil Público</p>
                                    <p className="text-sm text-gray-600">Permite que otros usuarios vean tu perfil</p>
                                </div>
                                <Switch defaultChecked={false} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Compartir Estadísticas</p>
                                    <p className="text-sm text-gray-600">Permite compartir tus estadísticas de donación</p>
                                </div>
                                <Switch defaultChecked={true} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-deep-navy">Datos de Análisis</p>
                                    <p className="text-sm text-gray-600">Permite el uso de datos para mejorar el servicio</p>
                                </div>
                                <Switch defaultChecked={true} />
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                <i className="fa-solid fa-key mr-2"></i>
                                Cambiar Contraseña
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Acciones de Cuenta */}
                <Card className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-cog text-gray-600"></i>
                            </div>
                            <h3 className="font-dm font-semibold text-lg text-deep-navy">Acciones de Cuenta</h3>
                        </div>

                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                                <i className="fa-solid fa-download mr-3"></i>
                                Exportar Mis Datos
                            </Button>

                            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                                <i className="fa-solid fa-file-export mr-3"></i>
                                Descargar Historial de Donaciones
                            </Button>

                            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                                <i className="fa-solid fa-question-circle mr-3"></i>
                                Centro de Ayuda
                            </Button>

                            <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                                <i className="fa-solid fa-headset mr-3"></i>
                                Contactar Soporte
                            </Button>

                            <Button variant="outline" className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50">
                                <i className="fa-solid fa-sign-out-alt mr-3"></i>
                                Cerrar Sesión
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    )
}
