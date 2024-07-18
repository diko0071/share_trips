"use client"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
    MessageSquareShare,
    BarChartHorizontal,
    Calendar as CalendarIcon
  } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

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
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  useEffect(() => {
    setListings(listings.map(listing => ({
      ...listing,
      isAvailable: Math.random() > 0.5
    })))
  }, [])

  const FilterBar = (
    <Card>
      <CardContent className="flex justify-center items-center p-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="mexico">Mexico</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newyork">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="tokyo">Tokyo</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" onSelect={(day) => day && setStartDate(day)} />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" onSelect={(day) => day && setEndDate(day)} />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className="w-full">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Unique Trips</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Participate. Meet. Split costs.
          </p>
        </div>
        <div className="flex flex-col col-1 sm:col-2 gap-4 sm:flex-row sm:items-center sm:justify-between p-2">
          {FilterBar}
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
    </main>
  )
}