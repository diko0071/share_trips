import { CalendarDays, DollarSign, User, MapPin, Mail, Share } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <div className="grid gap-6">
          <img
            src="/photo2.png"
            alt="Trip Image"
            width={600}
            height={400}
            className="rounded-lg object-cover aspect-[3/2]"
          />
        </div>
      </div>
      <div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter mb-4">Explore the Wonders of Italy</h1>
            <div className="flex gap-2">
              <Badge variant="outline" className="mb-4">
                Italy, Milan
            </Badge>
            <Badge variant="outline" className="mb-4">
              June, 2024
            </Badge>
            </div>
            <p className="text-muted-foreground">
              Join us on an unforgettable journey through the historic cities and breathtaking landscapes of Italy. From
              the canals of Venice to the rolling hills of Tuscany, this trip will immerse you in the rich culture and
              stunning beauty of this remarkable country.
            </p>
          </div>
          <div className="flex gap-4">
          </div>
          <Card className="flex items-center p-4 gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/dima.jpeg" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold">Dmitry Korzhov</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      Software Engineer at Acme Corp. Passionate about building user-friendly applications.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        View Profile
                      </Button>
                      <Button variant="outline">
                        Open Contacts
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Mail className="w-4 h-4 mr-2" />
              Open contacts
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}