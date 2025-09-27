import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-soft-light font-inter">
            <div className="container mx-auto px-4 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="w-24 h-24 bg-beacon-blue rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <i className="fas fa-book-open text-white text-4xl"></i>
                    </div>
                    <h1 className="font-dm font-bold text-deep-navy text-4xl mb-4">
                        Diario Misional
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 font-dm">
                        Portal Familiar & Sponsors
                    </p>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Conecta con los misioneros que patrocinas y sigue su trabajo en tiempo real
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-beacon-blue/10 rounded-xl flex items-center justify-center mb-4">
                            <i className="fas fa-chart-line text-beacon-blue text-xl"></i>
                        </div>
                        <h3 className="font-dm font-semibold text-deep-navy text-lg mb-2">
                            Dashboard
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Ve las métricas de tus patrocinios y el impacto de tus donaciones
                        </p>
                        <Link href="/dashboard" className="inline-flex items-center text-beacon-blue font-medium text-sm hover:underline">
                            Ver Dashboard <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center mb-4">
                            <i className="fas fa-images text-accent-gold text-xl"></i>
                        </div>
                        <h3 className="font-dm font-semibold text-deep-navy text-lg mb-2">
                            Feed
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Fotos y testimonios de los misioneros que patrocinas
                        </p>
                        <Link href="/feed" className="inline-flex items-center text-beacon-blue font-medium text-sm hover:underline">
                            Ver Feed <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <i className="fas fa-credit-card text-green-600 text-xl"></i>
                        </div>
                        <h3 className="font-dm font-semibold text-deep-navy text-lg mb-2">
                            Donaciones
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Realiza donaciones seguras y gestiona tu suscripción
                        </p>
                        <Link href="/donations" className="inline-flex items-center text-beacon-blue font-medium text-sm hover:underline">
                            Donar <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <i className="fas fa-file-alt text-purple-600 text-xl"></i>
                        </div>
                        <h3 className="font-dm font-semibold text-deep-navy text-lg mb-2">
                            Reportes
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Descarga reportes mensuales de tus patrocinios
                        </p>
                        <Link href="/reports" className="inline-flex items-center text-beacon-blue font-medium text-sm hover:underline">
                            Ver Reportes <i className="fas fa-arrow-right ml-2"></i>
                        </Link>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <h2 className="font-dm font-semibold text-deep-navy text-2xl mb-4">
                            ¿Listo para comenzar?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Inicia sesión para acceder a todas las funcionalidades del portal
                        </p>
                        <Link href="/login">
                            <button className="bg-beacon-blue text-white px-8 py-4 rounded-2xl font-medium text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-beacon-blue focus:ring-offset-2 transition-all duration-200 shadow-lg">
                                <i className="fas fa-magic-wand-sparkles mr-2"></i>
                                Iniciar Sesión
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
