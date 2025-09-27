'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Tag } from 'lucide-react'
import Image from 'next/image'

interface FeedCardProps {
    title: string
    content: string
    imageUrl?: string
    author: string
    createdAt: Date
    tags: string[]
}

export function FeedCard({
    title,
    content,
    imageUrl,
    author,
    createdAt,
    tags
}: FeedCardProps) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    return (
        <Card className="w-full hover:shadow-lg transition-shadow">
            {imageUrl && (
                <div className="relative h-48 w-full">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover rounded-t-lg"
                    />
                </div>
            )}

            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(createdAt)}
                    </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    {author}
                </div>
            </CardHeader>

            <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                    {content}
                </CardDescription>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
