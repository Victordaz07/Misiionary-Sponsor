import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export interface FeedPost {
    id: string
    title: string
    content: string
    imageUrl?: string
    author: string
    createdAt: Timestamp
    tags: string[]
}

export interface SponsorStats {
    id: string
    userId: string
    missionariesSponsored: number
    totalDonated: number
    tier: 'bronze' | 'silver' | 'gold' | 'platinum'
    lastDonationDate: Timestamp
    createdAt: Timestamp
}

export interface Donation {
    id: string
    userId: string
    amount: number
    currency: string
    status: 'pending' | 'completed' | 'failed'
    stripePaymentIntentId: string
    createdAt: Timestamp
    description?: string
}

export interface Report {
    id: string
    userId: string
    month: number
    year: number
    totalDonated: number
    missionariesSponsored: number
    feedPosts: number
    createdAt: Timestamp
}

// Feed Posts
export const getFeedPosts = async (limitCount: number = 10): Promise<FeedPost[]> => {
    try {
        const q = query(
            collection(db, 'feedPosts'),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as FeedPost[]
    } catch (error) {
        console.error('Error getting feed posts:', error)
        throw error
    }
}

export const addFeedPost = async (post: Omit<FeedPost, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, 'feedPosts'), {
            ...post,
            createdAt: Timestamp.now()
        })
        return docRef.id
    } catch (error) {
        console.error('Error adding feed post:', error)
        throw error
    }
}

// Sponsor Stats
export const getSponsorStats = async (userId: string): Promise<SponsorStats | null> => {
    try {
        const q = query(
            collection(db, 'sponsorStats'),
            where('userId', '==', userId)
        )
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            return null
        }

        const doc = querySnapshot.docs[0]
        return {
            id: doc.id,
            ...doc.data()
        } as SponsorStats
    } catch (error) {
        console.error('Error getting sponsor stats:', error)
        throw error
    }
}

export const updateSponsorStats = async (userId: string, updates: Partial<SponsorStats>): Promise<void> => {
    try {
        const q = query(
            collection(db, 'sponsorStats'),
            where('userId', '==', userId)
        )
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref
            await updateDoc(docRef, updates)
        } else {
            // Create new stats if they don't exist
            await addDoc(collection(db, 'sponsorStats'), {
                userId,
                missionariesSponsored: 0,
                totalDonated: 0,
                tier: 'bronze',
                lastDonationDate: Timestamp.now(),
                createdAt: Timestamp.now(),
                ...updates
            })
        }
    } catch (error) {
        console.error('Error updating sponsor stats:', error)
        throw error
    }
}

// Donations
export const addDonation = async (donation: Omit<Donation, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, 'donations'), {
            ...donation,
            createdAt: Timestamp.now()
        })
        return docRef.id
    } catch (error) {
        console.error('Error adding donation:', error)
        throw error
    }
}

export const getDonations = async (userId: string): Promise<Donation[]> => {
    try {
        const q = query(
            collection(db, 'donations'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Donation[]
    } catch (error) {
        console.error('Error getting donations:', error)
        throw error
    }
}

// Reports
export const generateReport = async (userId: string, month: number, year: number): Promise<Report> => {
    try {
        // Get donations for the month
        const donations = await getDonations(userId)
        const monthDonations = donations.filter(donation => {
            const donationDate = donation.createdAt.toDate()
            return donationDate.getMonth() + 1 === month && donationDate.getFullYear() === year
        })

        const totalDonated = monthDonations.reduce((sum, donation) => sum + donation.amount, 0)

        // Get feed posts count for the month
        const feedPosts = await getFeedPosts(1000) // Get all posts
        const monthFeedPosts = feedPosts.filter(post => {
            const postDate = post.createdAt.toDate()
            return postDate.getMonth() + 1 === month && postDate.getFullYear() === year
        })

        // Get sponsor stats
        const sponsorStats = await getSponsorStats(userId)
        const missionariesSponsored = sponsorStats?.missionariesSponsored || 0

        const report: Omit<Report, 'id' | 'createdAt'> = {
            userId,
            month,
            year,
            totalDonated,
            missionariesSponsored,
            feedPosts: monthFeedPosts.length
        }

        const docRef = await addDoc(collection(db, 'reports'), {
            ...report,
            createdAt: Timestamp.now()
        })

        return {
            id: docRef.id,
            ...report,
            createdAt: Timestamp.now()
        }
    } catch (error) {
        console.error('Error generating report:', error)
        throw error
    }
}
