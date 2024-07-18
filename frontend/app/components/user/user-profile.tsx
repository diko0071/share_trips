'use client';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import React, { useEffect, useState } from "react"
import {
    MessageSquareShare,
    BarChartHorizontal,
} from "lucide-react"

const initialListings = [
  {
    id: 1,
    title: "Cozy Studio in Downtown",
    imgSrc: "/photo.png",
    alt: "Apartment 1",
    dateRange: "May 1 - May 7",
  },
  {
    id: 2,
    title: "Modern Loft in Uptown",
    imgSrc: "/photo2.png",
    alt: "Apartment 2",
    dateRange: "Jun 15 - Jun 22",
  },
  {
    id: 3,
    title: "Beachfront Condo in Miami",
    imgSrc: "/photo3.png",
    alt: "Apartment 3",
    dateRange: "Jul 1 - Jul 8",
  },
  {
    id: 4,
    title: "Rustic Cabin in the Woods",
    imgSrc: "/photo4.png",
    alt: "Apartment 4",
    dateRange: "Aug 10 - Aug 17",
  },
]

export default function UserProfile() {
  const [listings, setListings] = useState(initialListings.map(listing => ({ ...listing, isAvailable: false })))

  useEffect(() => {
    setListings(listings.map(listing => ({
      ...listing,
      isAvailable: Math.random() > 0.5
    })))
  }, [])

  return (
    <div className="flex flex-col items-left justify-left min-h-screen p-4">
      <div className="flex flex-col md:flex-row w-full max-w-full bg-white">
        <div className="w-full md:w-1/4 p-4">
          <Card>
            <CardContent>
              <div className="flex flex-col items-start mt-4">
                <Avatar className="w-24 h-24 rounded-[10px]">
                  <AvatarImage src="/dima.jpeg" />
                  <AvatarFallback>D</AvatarFallback>
              </Avatar>
                <h2 className="mt-4 text-xl font-semibold">Dmitry Korzhov</h2>
                <Button variant="outline" className="mt-4">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="flex justify-end">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-1 lg:grid-cols-2">
                {listings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden rounded-lg bg-background shadow">
                    <div className="relative h-48">
                      <img
                        src={listing.imgSrc}
                        alt={listing.alt}
                        width={600}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{listing.title}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <Button variant="ghost" size="sm">
                          <MessageSquareShare className="mr-2 h-4 w-4" />
                          Contact Host
                        </Button>
                        <div className="flex items-center gap-2">
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              listing.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {listing.isAvailable ? "Available" : "Booked"}
                          </div>
                          <div className="text-sm text-muted-foreground">{listing.dateRange}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}