'use client'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import ListingCard from "../elements/trip-card"; 

export default function Component() {
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    status: 'draft',
    country: '',
    city: '',
    month: '',
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleStatusChange = (value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      status: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo</Label>
                <Input id="photo" type="file" onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" placeholder="Enter a title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} placeholder="Enter a description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" type="text" placeholder="Enter a country" value={formData.country} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" type="text" placeholder="Enter a city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="month">Month</Label>
                <Input id="month" type="text" placeholder="Enter a month" value={formData.month} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              url="#"
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