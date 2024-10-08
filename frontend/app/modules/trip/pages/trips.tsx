"use client"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "../../../lib/utils"
import { Calendar as CalendarIcon, X, Clover } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import TripCard from "../elements/trip-card"
import ApiService from "../../../services/apiService";
import { Skeleton } from "@/components/ui/skeleton"
import SkeletonTripCard from "../elements/skeleton-trip-card"
import { Label } from "@/components/ui/label"
import { fetchTrips, TripData } from "../tripAPIs";
import { toast } from "sonner"
import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


  interface Trips extends TripData {}

export default function Trips() {
  const [trips, setTrips] = useState<Trips[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [countries, setCountries] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [months, setMonths] = useState<string[]>([])    
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()


  useEffect(() => {
    async function fetchAndSetTrips() {
      try {
        setIsLoading(true)
        const data = await fetchTrips()
        
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        
        setTrips(data as Trips[])

        const uniqueCountries = Array.from(new Set(data.map((trip: Trips) => trip.country)))
        const uniqueCities = Array.from(new Set(data.map((trip: Trips) => trip.city)))
        const uniqueMonths = Array.from(new Set(data.map((trip: Trips) => trip.month)))

        setCountries(uniqueCountries)
        setCities(uniqueCities)
        setMonths(uniqueMonths)
      } catch (error) {
        toast(`Error fetching listings: ${error}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndSetTrips()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
        const filteredCities = trips
            .filter((trip) => trip.country === selectedCountry)
            .map((trip) => trip.city);
        setCities(Array.from(new Set(filteredCities)));

        if (selectedCity) {
            const filteredMonths = trips
                .filter((trip) => trip.country === selectedCountry && trip.city === selectedCity)
                .map((trip) => trip.month);
            setMonths(Array.from(new Set(filteredMonths)));
        } else {
            const filteredMonths = trips
                .filter((trip) => trip.country === selectedCountry)
                .map((trip) => trip.month);
            setMonths(Array.from(new Set(filteredMonths)));
        }
    } else {
        const allCities = trips.map((trip) => trip.city);
        setCities(Array.from(new Set(allCities)));

        const allMonths = trips.map((trip) => trip.month);
        setMonths(Array.from(new Set(allMonths)));
    }
}, [selectedCountry, selectedCity, trips]);

  const resetCountryFilter = () => {
    setSelectedCountry(null);
    setSelectedCity(null); 
    setSelectedMonth(null); 
  };


  const resetCityFilter = () => {
    setSelectedCity(null);
    setSelectedMonth(null); 
  };
  
  const resetMonthFilter = () => setSelectedMonth(null);

  const applyRandomFilters = () => {
    setSelectedCountry(null);
    setSelectedCity(null);
    setSelectedMonth(null);

    const filterChoice = Math.floor(Math.random() * 3);

    switch (filterChoice) {
      case 0:
        if (countries.length > 0) {
          const randomCountry = countries[Math.floor(Math.random() * countries.length)];
          setSelectedCountry(randomCountry);
        }
        break;
      case 1:
        if (cities.length > 0) {
          const randomCity = cities[Math.floor(Math.random() * cities.length)];
          setSelectedCity(randomCity);
        }
        break;
      case 2:
        if (months.length > 0) {
          const randomMonth = months[Math.floor(Math.random() * months.length)];
          setSelectedMonth(randomMonth);
        }
        break;
    }
  };
        
    const FilterBar = (
        <>
            <div className="hidden md:flex flex-wrap items-center justify-center gap-4">
                <div className="relative">
                    <Select onValueChange={setSelectedCountry} value={selectedCountry || ""}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedCountry && (
                        <Button
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-4 h-4 border-none"
                            onClick={resetCountryFilter}
                            variant="outline"
                            size="icon"
                        >
                            <X />
                        </Button>
                    )}
                </div>
                <div className="relative">
                    <Select onValueChange={setSelectedCity} value={selectedCity || ""}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedCity && (
                        <Button
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-4 h-4 border-none"
                            onClick={resetCityFilter}
                            variant="outline"
                            size="icon"
                        >
                            <X />
                        </Button>
                    )}
                </div>
                <div className="relative">
                    <Select onValueChange={setSelectedMonth} value={selectedMonth || ""}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedMonth && (
                        <Button
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-4 h-4 border-none"
                            onClick={resetMonthFilter}
                            variant="outline"
                            size="icon"
                        >
                            <X />
                        </Button>
                    )}
                </div>
            </div>
        <div className="md:hidden flex items-center justify-between gap-4">    
        <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline">Filters</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Trip Filters</h4>
              <p className="text-sm text-muted-foreground">
                Set your preferences for the trip.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="country">Country</Label>
                <div className="col-span-2 relative">
                  <Select onValueChange={setSelectedCountry} value={selectedCountry || ""}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCountry && (
                    <Button
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-4 h-4 border-none"
                      onClick={resetCountryFilter}
                      variant="outline"
                      size="icon"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="city">City</Label>
                <div className="col-span-2 relative">
                  <Select onValueChange={setSelectedCity} value={selectedCity || ""}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCity && (
                    <Button
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-4 h-4 border-none"
                      onClick={resetCityFilter}
                      variant="outline"
                      size="icon"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="month">When?</Label>
                <div className="col-span-2 relative">
                  <Select onValueChange={setSelectedMonth} value={selectedMonth || ""}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedMonth && (
                    <Button
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-4 h-4 border-none"
                      onClick={resetMonthFilter}
                      variant="outline"
                      size="icon"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
        </Popover>
        <Button 
          onClick={applyRandomFilters}
          className="flex items-center gap-2"
        >
          <Clover className="w-4 h-4" />
          Feeling Lucky
        </Button>
      </div>
    </>
  );

  const filteredListings: Trips[] = trips.filter((trip: Trips) => {
    return (
        (!selectedCountry || trip.country === selectedCountry) &&
        (!selectedCity || trip.city === selectedCity) &&
        (!selectedMonth || trip.month === selectedMonth)
    )
  })

  return (
    <main className="w-full">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Unique Trips</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Participate. Meet. Split bills.
                </p>
            </div>
            <div className="flex flex-col col-1 sm:col-2 gap-4 sm:flex-row sm:items-center sm:justify-between p-2">
                {FilterBar}
            </div>
        </div>
        <section className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" > 
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-4">
                        <SkeletonTripCard />
                    </div>
                ))
            ) : filteredListings.length > 0 ? (
                filteredListings.map((trip) => (
                    <TripCard
                        key={trip.id}
                        id={trip.id}
                        title={trip.title}
                        imgSrc={trip.imgSrc}
                        alt={trip.alt}
                        showUser={true}
                        country={trip.country}
                        city={trip.city}
                        description={trip.description}
                        minBudget={trip.minBudget}
                        url={trip.url || ''}
                        month={trip.month}
                        photo={trip.photo}
                        createdBy={trip.created_by_name}
                        createdByUsername={trip.created_by_username}
                    />
                ))
            ) : (
                <p>No listings available</p>
            )}
        </section>
    </main>
)
}