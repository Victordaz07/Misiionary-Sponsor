import { NextRequest, NextResponse } from 'next/server'
import { generateReport } from '@/lib/db'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const month = parseInt(searchParams.get('month') || '0')
        const year = parseInt(searchParams.get('year') || '0')

        if (!userId) {
            return NextResponse.json(
                { error: 'Usuario no autenticado' },
                { status: 401 }
            )
        }

        if (!month || !year) {
            return NextResponse.json(
                { error: 'Mes y año son requeridos' },
                { status: 400 }
            )
        }

        const report = await generateReport(userId, month, year)

        return NextResponse.json(report)

    } catch (error) {
        console.error('Error generating report:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId, month, year } = await request.json()

        if (!userId) {
            return NextResponse.json(
                { error: 'Usuario no autenticado' },
                { status: 401 }
            )
        }

        if (!month || !year) {
            return NextResponse.json(
                { error: 'Mes y año son requeridos' },
                { status: 400 }
            )
        }

        const report = await generateReport(userId, month, year)

        return NextResponse.json(report)

    } catch (error) {
        console.error('Error generating report:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
