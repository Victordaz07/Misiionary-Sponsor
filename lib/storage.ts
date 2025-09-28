import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage'
import { storage } from './firebase'

/**
 * Sube una imagen al Storage de Firebase
 * @param file - Archivo de imagen
 * @param userId - ID del usuario
 * @param folder - Carpeta donde guardar (default: 'diary-images')
 * @returns Promise<string> - URL de descarga de la imagen
 */
export async function uploadPhoto(
    file: File,
    userId: string,
    folder: string = 'diary-images'
): Promise<string> {
    try {
        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            throw new Error('El archivo debe ser una imagen')
        }

        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            throw new Error('La imagen debe ser menor a 5MB')
        }

        // Crear referencia única para el archivo
        const timestamp = Date.now()
        const fileName = `${userId}_${timestamp}_${file.name}`
        const storageRef = ref(storage, `${folder}/${fileName}`)

        // Subir archivo
        const snapshot = await uploadBytes(storageRef, file)

        // Obtener URL de descarga
        const downloadURL = await getDownloadURL(snapshot.ref)

        console.log('✅ Imagen subida:', downloadURL)
        return downloadURL

    } catch (error) {
        console.error('❌ Error subiendo imagen:', error)
        throw error
    }
}

/**
 * Elimina una imagen del Storage
 * @param imageUrl - URL de la imagen a eliminar
 * @returns Promise<void>
 */
export async function deletePhoto(imageUrl: string): Promise<void> {
    try {
        // Crear referencia desde la URL
        const imageRef = ref(storage, imageUrl)

        // Eliminar archivo
        await deleteObject(imageRef)

        console.log('✅ Imagen eliminada:', imageUrl)

    } catch (error) {
        console.error('❌ Error eliminando imagen:', error)
        throw error
    }
}

/**
 * Obtiene la URL de descarga de una imagen
 * @param imagePath - Ruta de la imagen en Storage
 * @returns Promise<string> - URL de descarga
 */
export async function getImageUrl(imagePath: string): Promise<string> {
    try {
        const imageRef = ref(storage, imagePath)
        const downloadURL = await getDownloadURL(imageRef)

        return downloadURL

    } catch (error) {
        console.error('❌ Error obteniendo URL de imagen:', error)
        throw error
    }
}
