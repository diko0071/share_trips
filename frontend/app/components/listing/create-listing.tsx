'use client'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  const [formData, setFormData] = useState({
    photo: '',
    title: '',
    description: '',
    status: 'draft',
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
              <Button size="lg" className="w-full">
                Publish
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <img
              src={formData.photo || "/photo.png"}
              alt="Post Image"
              width={800}
              height={450}
              className="aspect-video rounded-md object-cover"
            />
            <div className="grid gap-2 max-w-full">
              <h2 className="text-2xl font-bold">{formData.title || "A Wonderful Blog Post"}</h2>
              <p className="text-muted-foreground">
                {formData.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">Updated 2 days ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}