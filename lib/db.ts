import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from './firebase'

// Tipos para las entradas del diario
export interface DiaryEntry {
    id?: string
    userId: string
    content: string
    publicFlag: boolean
    createdAt: Timestamp
    updatedAt: Timestamp
    imageUrl?: string
    location?: string
    tags?: string[]
}

export interface PublicEntry extends DiaryEntry {
    authorName?: string
    authorEmail?: string
}

/**
 * Guarda una entrada en el diario del usuario
 * @param userId - ID del usuario
 * @param content - Contenido de la entrada
 * @param publicFlag - Si la entrada es pública
 * @param imageUrl - URL de imagen (opcional)
 * @param location - Ubicación (opcional)
 * @param tags - Tags (opcional)
 * @returns Promise<string> - ID del documento creado
 */
export async function saveSharedEntry(
    userId: string,
    content: string,
    publicFlag: boolean = false,
    imageUrl?: string,
    location?: string,
    tags?: string[]
): Promise<string> {
    try {
        const now = Timestamp.now()

        const entryData: Omit<DiaryEntry, 'id'> = {
            userId,
            content,
            publicFlag,
            createdAt: now,
            updatedAt: now,
            ...(imageUrl && { imageUrl }),
            ...(location && { location }),
            ...(tags && { tags })
        }

        const docRef = await addDoc(collection(db, 'diaryEntries'), entryData)

        console.log('✅ Entrada guardada con ID:', docRef.id)
        return docRef.id

    } catch (error) {
        console.error('❌ Error guardando entrada:', error)
        throw error
    }
}

/**
 * Obtiene todas las entradas públicas para el feed
 * @param limitCount - Número máximo de entradas a obtener (default: 20)
 * @returns Promise<PublicEntry[]> - Array de entradas públicas
 */
export async function getPublicEntries(limitCount: number = 20): Promise<PublicEntry[]> {
    try {
        const q = query(
            collection(db, 'diaryEntries'),
            where('publicFlag', '==', true),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        )

        const querySnapshot = await getDocs(q)
        const entries: PublicEntry[] = []

        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data()
            entries.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            } as PublicEntry)
        })

        console.log(`✅ ${entries.length} entradas públicas obtenidas`)
        return entries

    } catch (error) {
        console.error('❌ Error obteniendo entradas públicas:', error)
        throw error
    }
}

/**
 * Obtiene las entradas de un usuario específico
 * @param userId - ID del usuario
 * @param limitCount - Número máximo de entradas a obtener (default: 50)
 * @returns Promise<DiaryEntry[]> - Array de entradas del usuario
 */
export async function getUserEntries(userId: string, limitCount: number = 50): Promise<DiaryEntry[]> {
    try {
        const q = query(
            collection(db, 'diaryEntries'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        )

        const querySnapshot = await getDocs(q)
        const entries: DiaryEntry[] = []

        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data()
            entries.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            } as DiaryEntry)
        })

        console.log(`✅ ${entries.length} entradas del usuario obtenidas`)
        return entries

    } catch (error) {
        console.error('❌ Error obteniendo entradas del usuario:', error)
        throw error
    }
}

/**
 * Obtiene estadísticas básicas del usuario
 * @param userId - ID del usuario
 * @returns Promise<{totalEntries: number, publicEntries: number}>
 */
export async function getUserStats(userId: string): Promise<{ totalEntries: number, publicEntries: number }> {
    try {
        const [allEntries, publicEntries] = await Promise.all([
            getUserEntries(userId, 1000), // Obtener todas las entradas
            getPublicEntries(1000) // Obtener todas las públicas
        ])

        const userPublicEntries = publicEntries.filter(entry => entry.userId === userId)

        return {
            totalEntries: allEntries.length,
            publicEntries: userPublicEntries.length
        }

    } catch (error) {
        console.error('❌ Error obteniendo estadísticas:', error)
        throw error
    }
}