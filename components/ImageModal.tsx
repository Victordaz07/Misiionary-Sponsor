'use client'

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
    author: string
    location: string
    content: string
    timeAgo: string
}

export function ImageModal({
    isOpen,
    onClose,
    imageUrl,
    author,
    location,
    content,
    timeAgo
}: ImageModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full h-full max-w-6xl max-h-[95vh] mx-4 flex flex-col">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    <i className="fa-solid fa-times text-lg"></i>
                </button>

                {/* Image Container - Takes most of the space */}
                <div className="flex-1 bg-black rounded-2xl overflow-hidden mb-4">
                    <img
                        src={imageUrl}
                        alt={`Post by ${author}`}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Bottom Info Bar - Fixed height, doesn't overlap image */}
                <div className="flex-shrink-0">
                    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                        <CardContent className="p-4">
                            {/* Author Info */}
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-10 h-10 bg-beacon-blue rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-user text-white text-sm"></i>
                                </div>
                                <div>
                                    <h3 className="font-dm font-semibold text-deep-navy">{author}</h3>
                                    <p className="text-sm text-gray-600">{location}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-xs text-gray-500">{timeAgo}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {content}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end">
                                <Button
                                    onClick={onClose}
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    <i className="fa-solid fa-times mr-2"></i>
                                    Cerrar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
