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
import ApiService from "../../services/apiService";

interface Listing {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  dateRange: string;
  country: string;
  city: string;
  description: string;
  minBudget: number;
  url: string | null;
  month: string;
  isFlexible: boolean;
  created_by_name: string;
  isAvailable: boolean;
}


export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await ApiService.get('/api/trip/')
        console.log("API response:", response)
        if (Array.isArray(response)) {
          const data = response.map((listing: any) => ({
            id: listing.id,
            title: listing.name,
            imgSrc: listing.image1,
            alt: listing.name,
            country: listing.country,
            city: listing.city,
            description: listing.description,
            minBudget: parseFloat(listing.budget),
            url: listing.url,
            month: listing.month.charAt(0).toUpperCase() + listing.month.slice(1),
            isFlexible: listing.is_flexible,
            created_by_name: listing.created_by_name,
          }))
          console.log("Mapped data:", data)
          setListings(data as Listing[])
        } else {
          console.error("No data in response")
        }
      } catch (error) {
        console.error("Error fetching listings:", error)
      }
    }

    fetchListings()
  }, [])

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
              <SelectItem value="Cancun">Cancun</SelectItem>
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
              <SelectItem value="September">September</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )

  const filteredListings: Listing[] = listings.filter((listing: Listing) => {
    return (
      (!selectedCountry || listing.country === selectedCountry) &&
      (!selectedCity || listing.city === selectedCity) &&
      (!selectedMonth || listing.month === selectedMonth)
    )
  })

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
        {listings.length > 0 ? (
          listings.map((listing) => (
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
              url={listing.url || ''}
              month={listing.month}
              createdBy={listing.created_by_name}
            />
          ))
        ) : (
          <p>No listings available</p>
        )}
      </section>
    </main>
  )
}