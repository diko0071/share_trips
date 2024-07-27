import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Support() {
  return (
    <div className="flex flex-col max-h-screen">
      <main className="flex-1">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Submit a Support Request</h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below to report an issue or request assistance.
            </p>
          </div>
          <Card>
            <CardContent className="grid gap-6 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" className="w-full" /> 
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="w-full" /> 
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about your issue or request"
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-6">
              <Button type="submit">Submit Request</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}



