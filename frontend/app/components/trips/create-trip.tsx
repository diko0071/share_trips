'use client'
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ApiService from "../../services/apiService";
import { getUserId, getAccessToken } from "../../lib/actions"
import { useRouter } from 'next/navigation';
import {
  MessageSquareShare,
  BarChartHorizontal,
  Linkedin,
  Github,
  Instagram,
  Mail,
  Pencil,
  Trash2, 
  LoaderCircle
} from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import TripCard from "../elements/trip-card"; 

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
  username: string;
}

const months = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' }
];


export default function CreateTrip() {
  const [formData, setFormData] = useState({
    image1: null as File | null,
    name: '',
    description: '',
    country: '',
    city: '',
    month: '',
    cost: '',
    link: '',
    created_by: '',
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await ApiService.get(`/api/user/data/`);
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
            username: response.username,
          };
          setUserProfile(profileData);
          setFormData((prevData) => {
            const updatedData = {
              ...prevData,
              created_by: response.id,
            };
            return updatedData;
          });
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, []);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleMonthChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      month: value,
    }));
  };

  const handleParseData = () => {
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('month', formData.month);
      formDataToSend.append('cost', formData.cost);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('created_by', formData.created_by);
      if (formData.image1) {
        formDataToSend.append('image1', formData.image1);
      }

      const response = await ApiService.post_auth_form('/api/trip/create/', formDataToSend);
      console.log('Form data:', formData);
      console.log('Trip created successfully:', response);
      const tripId = response.id;
      router.push(`/trip/${tripId}`);
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image1: file,
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid gap-2">
                <Label htmlFor="name">Name of the you trip</Label>
                <Input id="name" type="text" placeholder="Enter a title" value={formData.name} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description of your trip</Label>
                <Textarea id="description" rows={4} placeholder="Enter a description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="month">Month</Label>
                <Select onValueChange={handleMonthChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cost">How much you ready to pay?</Label>
                <Input id="cost" type="text" placeholder="Enter a budget for this trip" value={formData.cost} onChange={handleChange} />
              </div>
              <Tabs defaultValue="manual">
                <TabsList>
                  <TabsTrigger value="airbnb">From Airbnb</TabsTrigger>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>
                <TabsContent value="airbnb" className='grid gap-5'>
                  <div className="grid gap-2">
                    <Label htmlFor="link">Link</Label>
                    <div className="flex items-center gap-2">
                      <Input id="link" type="text" placeholder="Enter the link" value={formData.link} onChange={handleChange} />
                      <Button onClick={handleParseData}>Retrieve Data</Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" type="text" placeholder="Enter a country" value={formData.country} onChange={handleChange} disabled />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" type="text" placeholder="Enter a city" value={formData.city} onChange={handleChange} disabled />
                  </div>
                </TabsContent>
                <TabsContent value="manual" className='grid gap-5'>
                  <div className="grid gap-2">
                    <Label htmlFor="image1">Photo</Label>
                    <Input id="image1" type="file" onChange={handleFileChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" type="text" placeholder="Enter a country" value={formData.country} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" type="text" placeholder="Enter a city" value={formData.city} onChange={handleChange} />
                  </div>
                </TabsContent>
              </Tabs>
              <Button 
              className="w-full" 
              disabled={isLoading} 
              type="submit" 
              onClick={handleSubmit}
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : 'Publish'}
            </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6 max-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <TripCard
              id={1}
              title={formData.name || "A Wonderful Blog Post"}
              imgSrc={formData.image1 ? URL.createObjectURL(formData.image1) : "/photo.png"}
              alt="Post Image"
              showUser={true}
              country={formData.country || "USA"}
              city={formData.city || "New York"}
              description={formData.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              minBudget={1000}
              url={formData.link || "#"}
              month={formData.month || "January"}
              createdBy={userProfile?.name || "John Doe"}
              createdByUsername={userProfile?.username || "john.doe"}
              photo={userProfile?.photo || "/photo.png"}
            />
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}