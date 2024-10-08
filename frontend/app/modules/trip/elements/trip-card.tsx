import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface Action {
  label: string
  onClick: () => void
}

interface TripCardProps {
  id: number
  title: string
  imgSrc: string
  alt: string
  showUser: boolean
  country: string
  city: string
  description: string
  minBudget: number
  url: string
  month: string
  createdBy: string
  createdByUsername: string
  photo: string
  actions?: Action[]
  showDots?: boolean;
  blur?: boolean;
  lockview?: boolean;
}

export default function TripCard({
  id, title, imgSrc, alt, showUser = true, blur = false, lockview = false,
  country, city, description, minBudget, url, month, createdBy, createdByUsername, photo, actions = [], showDots = false
}: TripCardProps) {

  const router = useRouter();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const PushToDeitals = () => {
    router.push(`/trip/${id}`);
  };
  
  return (
    <Card 
      className={`w-full rounded-lg shadow-lg overflow-hidden ${!lockview ? 'cursor-pointer' : ''}`}
      onClick={!lockview ? PushToDeitals : undefined}
    >
      <div className="relative">
        <img  
          src={imgSrc}
          alt={alt}
          width={500}
          height={300}
          className={`w-full h-48 object-cover ${blur ? 'filter blur-sm' : ''}`}
        />
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white text-lg font-semibold flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> {city}, {country}
            </h3>
              <Badge variant="outline" className="bg-white text-black">{month}</Badge>
          </div>
        </div>
      </div>
      <div className="p-4 bg-background">
        <div className="flex items-center mb-2">
          <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
          {description}
        </p>
        <div className="flex items-center justify-between">
          {lockview ? (
            <Button variant="ghost" size="sm" disabled> 
              View
            </Button>
          ) : (
            <Link href={`/trip/${id}`}>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </Link>
          )}
          {showUser ? (
            <Link href={`/profile/${createdByUsername}`}>
            <Button variant="link" size="sm" className="flex items-center gap-2" onClick={handleProfileClick}>
              <Avatar className="w-5 h-5">
                <AvatarImage src={photo} />
                <AvatarFallback>{createdBy.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium">by {createdBy}</p>
            </Button>
          </Link>
          ) : (
            showDots && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" size="sm" className="flex items-center gap-2">
                  <DotsHorizontalIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {actions.map((action, index) => (
                  <DropdownMenuItem key={index} onSelect={action.onClick}>
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            )
          )}
        </div>
      </div>
    </Card>
  )
}