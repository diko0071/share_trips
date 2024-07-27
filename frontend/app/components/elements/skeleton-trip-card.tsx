'use client'

import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonTripCard() {
    return (
        <div className="space-y-4"> 
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    )
}