"use client"
import { Button } from "@/components/ui/button"
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

export default function Listings() {
  const [listings, setListings] = useState(initialListings.map(listing => ({ ...listing, isAvailable: false })))

  useEffect(() => {
    setListings(listings.map(listing => ({
      ...listing,
      isAvailable: Math.random() > 0.5
    })))
  }, [])

  return (
    <main className="w-full py-5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Unique Trips</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Participate. Meet. Split costs.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" className="px-4 py-2">
              All
            </Button>
            <Button variant="outline" size="sm" className="px-4 py-2">
              Electronics
            </Button>
            <Button variant="outline" size="sm" className="px-4 py-2">
              Home & Garden
            </Button>
            <Button variant="outline" size="sm" className="px-4 py-2">
              Fashion
            </Button>
          </div>
        </div>
      <section className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div key={listing.id} className="overflow-hidden rounded-lg bg-background shadow">
            <div className="relative h-48">
              <img
                src={listing.imgSrc}
                alt={listing.alt}
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
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
            </div>
          </div>
        ))}
      </section>
      </div>
    </main>
  )
}