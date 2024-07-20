"use client"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import ListingCard from "../elements/trip-card"

const initialListings = [
  {
    id: 1,
    title: "Fun New York City Trip",
    imgSrc: "/photo.png",
    alt: "Apartment 1",
    dateRange: "May 1 - May 7",
    country: "USA",
    city: "New York",
    description: "You should join me on a trip to New York City because it offers a unique blend of culture, history, and excitement. We’ll explore iconic landmarks like the Statue of Liberty and Times Square, providing unforgettable experiences. Our journey will include diverse culinary adventures, from famous New York pizza to exquisite fine dining. Together, we’ll discover hidden gems and local secrets that only the most passionate travelers find. This trip promises not only sightseeing but also an opportunity to create lasting memories and deepen our friendship.",
    minBudget: 100,
    url: "https://example.com/listing/1",
    month: "May",
    isFlexible: true,
    createdBy: "John Doe"
  },
  {
    id: 2,
    title: "Modern Loft in Uptown",
    imgSrc: "/photo2.png",
    alt: "Apartment 2",
    dateRange: "Jun 15 - Jun 22",
    country: "USA",
    city: "Chicago",
    description: "A modern loft in the vibrant uptown area.",
    minBudget: 150,
    url: "https://example.com/listing/2",
    month: "June",
    isFlexible: false,
    createdBy: "Jane Smith"
  },
  {
    id: 3,
    title: "Beachfront Condo in Miami",
    imgSrc: "/photo3.png",
    alt: "Apartment 3",
    dateRange: "Jul 1 - Jul 8",
    country: "USA",
    city: "Miami",
    description: "A beautiful beachfront condo with stunning views.",
    minBudget: 200,
    url: "https://example.com/listing/3",
    month: "July",
    isFlexible: true,
    createdBy: "Alice Johnson"
  },
  {
    id: 4,
    title: "Rustic Cabin in the Woods",
    imgSrc: "/photo4.png",
    alt: "Apartment 4",
    dateRange: "Aug 10 - Aug 17",
    country: "USA",
    city: "Denver",
    description: "A rustic cabin surrounded by nature.",
    minBudget: 120,
    url: "https://example.com/listing/4",
    month: "August",
    isFlexible: false,
    createdBy: "Bob Brown"
  },
]

export default function Listings() {
  const [listings, setListings] = useState(initialListings.map(listing => ({ ...listing, isAvailable: false })))
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  useEffect(() => {
    setListings(listings.map(listing => ({
      ...listing,
      isAvailable: Math.random() > 0.5
    })))
  }, [])

  const filteredListings = listings.filter(listing => {
    return (
      (!selectedCountry || listing.country === selectedCountry) &&
      (!selectedCity || listing.city === selectedCity) &&
      (!selectedMonth || listing.month === selectedMonth)
    )
  })

  const FilterBar = (
    <Card>
      <CardContent className="flex justify-center items-center p-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Select onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Mexico">Mexico</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Miami">Miami</SelectItem>
              <SelectItem value="Denver">Denver</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="June">June</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
            </SelectContent>
          </Select>
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
      <section className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            imgSrc={listing.imgSrc}
            alt={listing.alt}
            showUser={true}
            country={listing.country}
            city={listing.city}
            description={listing.description}
            minBudget={listing.minBudget}
            url={listing.url}
            month={listing.month}
            createdBy={listing.createdBy}
          />
        ))}
      </section>
    </main>
  )
}