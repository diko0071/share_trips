'use client'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import ListingCard from "../elements/trip-card"; 

export default function CreateListing() {
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    status: 'draft',
    country: '',
    city: '',
    month: '',
    cost: '',
    link: '',
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleParseData = () => {
    console.log("Parsing data from link:", formData.link);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="title">Name of the you trip</Label>
                <Input id="title" type="text" placeholder="Enter a title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description of your trip</Label>
                <Textarea id="description" rows={4} placeholder="Enter a description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="month">Month</Label>
                <Input id="month" type="text" placeholder="Enter a month" value={formData.month} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="month">How much you ready to pay?</Label>
                <Input id="month" type="text" placeholder="Enter a budget for this trip" value={formData.month} onChange={handleChange} />
              </div>
              <Tabs defaultValue="airbnb">
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
                    <Label htmlFor="photo">Photo</Label>
                    <Input id="photo" type="file" onChange={handleChange} />
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
            <ListingCard
              id={1}
              title={formData.title || "A Wonderful Blog Post"}
              imgSrc={formData.photo || "/photo.png"}
              alt="Post Image"
              showUser={true}
              country={formData.country || "USA"}
              city={formData.city || "New York"}
              description={formData.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              minBudget={1000}
              url={formData.link || "#"}
              month={formData.month || "January"}
              createdBy="John Doe"
            />
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Publish
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}