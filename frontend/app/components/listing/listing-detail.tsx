import { CalendarDays, DollarSign, User, MapPin, Mail, Share } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card" // Import the Card component

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
              <p className="text-muted-foreground">
                Join us on an unforgettable journey through the historic cities and breathtaking landscapes of Italy. From
                the canals of Venice to the rolling hills of Tuscany, this trip will immerse you in the rich culture and
                stunning beauty of this remarkable country.
              </p>
            </div>
            <div className="flex gap-4">
              <Card className="p-4 flex flex-col items-center">
                <CalendarDays className="w-4 h-4 mb-2" />
                <span className="text-sm text-muted-foreground">June, 2024</span>
              </Card>
              <Card className="p-4 flex flex-col items-center">
                <DollarSign className="w-4 h-4 mb-2" />
                <span className="text-sm text-muted-foreground">$200 per person</span>
              </Card>
              <Card className="p-4 flex flex-col items-center">
                <Link
                  href="#"
                  className="flex flex-col items-center text-sm text-primary hover:underline focus:underline"
                  prefetch={false}
                >
                  <MapPin className="w-4 h-4 mb-2" />
                  View trip details
                </Link>
              </Card>
            </div>
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