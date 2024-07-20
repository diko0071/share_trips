import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ListingCardExample() {
  const title = ""
  const imgSrc = "/photo.png"
  const alt = "Sample Image"
  const showUser = true
  const country = "Dream City"
  const description = "This is a sample description for the trip card. It should be truncated if it is too long."
  const minBudget = 1000
  const url = "#"
  const month = "Anytime"
  const createdBy = "User"

    return (
        <Card className="w-full h-64 rounded-lg shadow-lg overflow-hidden relative">
          <div className="relative w-full h-full">
            <img
              src={imgSrc}
              alt={alt}
              className="w-full h-full object-cover filter blur-sm absolute inset-0"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {country}
                </h3>
                <Badge variant="outline" className="bg-white text-black">{month}</Badge>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center"> 
              <Button variant="outline" size="sm">
                <a href={url}>Add First Trip</a>
              </Button>
            </div>
          </div>
          <div className="p-4 bg-background relative z-10">
            <div className="flex items-center mb-2">
              <h4 className="text-lg font-semibold">{title}</h4>
            </div>
          </div>
        </Card>
      )
    }