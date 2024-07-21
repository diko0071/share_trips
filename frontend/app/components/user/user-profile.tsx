'use client';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import React, { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import ListingCard from "../elements/trip-card"
import ListingCardExample from "../elements/trip-card-blur-example"
import ApiService from "../../services/apiService";
import {
    MessageSquareShare,
    BarChartHorizontal,
    Linkedin,
    Github,
    Instagram,
    Mail,
    Pencil
} from "lucide-react"

const initialListings = [
  {
    id: 1,
    title: "Cozy Studio in Downtown",
    imgSrc: "/photo.png",
    alt: "Apartment 1",
    dateRange: "May 1 - May 7",
    country: "USA",
    city: "New York",
    description: "A cozy studio in the heart of downtown.",
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

const userProfile = {
  photo: "/dima.jpeg",
  name: "Dmitry Korzhov",
  language: "English",
  description: "Software Engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
  coLiversPreferences: "Looking for a non-smoker, pet-friendly co-liver who values cleanliness and enjoys a quiet living environment. Prefer someone who is respectful of shared spaces and has a similar lifestyle.",
  socialLinks: {
    twitter: "https://twitter.com/dmitry",
    linkedin: "https://linkedin.com/in/dmitry",
    github: "https://github.com/dmitry",
    email: "dmitry@gmail.com"
  },
  status: "Ready to travel"
}

interface UserProfile {
  name: string;
  email: string;
  photo: string;
  id: string;
  about: string;
  coliver_preferences: string;
  language: string;
  social_media_links: Record<string, string>;
  travel_status: string;
}


function getSocialIcon(url: string) {
  if (url.includes("x.com") || url.includes("twitter.com")) {
    return <img src="/x.svg" className="h-3 w-3" alt="X Icon" />; 
  } else if (url.includes("linkedin.com")) {
    return <Linkedin className="h-4 w-4" />;
  } else if (url.includes("github.com")) {
    return <Github className="h-4 w-4" />;
  } else if (url.includes("instagram.com")) {
    return <Instagram className="h-4 w-4" />;
  } else if (url.includes("@gmail.com")) {
    return <Mail className="h-4 w-4" />;
  }
  return <MessageSquareShare className="h-4 w-4" />;
}

export default function UserProfile() {
  const [listings, setListings] = useState(initialListings.map(listing => ({ ...listing, isAvailable: false })))
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    setListings(listings.map(listing => ({
      ...listing,
      isAvailable: Math.random() > 0.5
    })))
  }, [])

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await ApiService.get('/api/user/data/');
        if (response) {
          const profileData: UserProfile = {
            name: response.name,
            email: response.email,
            photo: response.photo,
            id: response.id,
            about: response.about,
            coliver_preferences: response.coliver_preferences,
            language: response.language,
            social_media_links: response.social_media_links,
            travel_status: response.travel_status,
          };
          setUserProfile(profileData);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex flex-col items-left justify-left min-h-screen">
      <div className="flex flex-col lg:flex-row w-full max-w-full bg-white gap-10">
        <div className="w-full lg:w-3/4">
          <Card>
            <CardContent>
              <div className="flex flex-col items-start mt-4">
                <div className="flex items-start w-full">
                  <Avatar className="w-24 h-24 rounded-[10px]">
                    <AvatarImage src={userProfile.photo} />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{userProfile.name}</h2>
                <div className="mt-2 text-sm text-green-6000">
                  <Badge variant="outline">{userProfile.travel_status}</Badge>
                </div>
                
                <h3 className="mt-6 text-lg font-semibold">About</h3>
                <p className="mt-2 text-sm">{userProfile.about}</p>
                
                <h3 className="mt-6 text-lg font-semibold">Language</h3>
                <Badge variant="outline" className="mt-2">{userProfile.language}</Badge>
                
                <h3 className="mt-6 text-lg font-semibold">Co-livers Preferences</h3>
                <p className="mt-2 text-sm">{userProfile.coliver_preferences}</p>
                
                <h3 className="mt-6 text-lg font-semibold">Contacts</h3>
                <div className="mt-2 flex gap-4">
                  {Object.entries(userProfile.social_media_links).map(([platform, url]) => (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="inline-flex items-center">
                        {getSocialIcon(url)}
                        <span className="ml-2">{platform}</span>
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>       
          <div className="w-full lg:w-3/4">
            {listings.length === 0 ? (
              <div className="flex justify-center items-start h-full">
                <ListingCardExample />
              </div>
            ) : (
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="flex justify-end">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1">
                    {listings.map((listing) => (
                      <ListingCard 
                        key={listing.id} 
                        id={listing.id}
                        title={listing.title}
                        imgSrc={listing.imgSrc}
                        alt={listing.alt}
                        country={listing.country}
                        city={listing.city}
                        description={listing.description}
                        minBudget={listing.minBudget}
                        url={listing.url}
                        month={listing.month}
                        createdBy={listing.createdBy}
                        showUser={false}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
      </div>
    </div>
  )
}