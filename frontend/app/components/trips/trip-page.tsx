import { CalendarDays, DollarSign, User, MapPin, Mail, Share, CircleHelp, MoveLeft, Pencil, Settings, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { toast } from "sonner"
import TripCard from "../elements/trip-card"
import { getUserId, getAccessToken } from "../../lib/actions"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ApiService from "../../services/apiService";
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type TripDetail = {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  country: string;
  city: string;
  description: string;
  minBudget: number;
  url: string | null;
  month: string;
  isFlexible: boolean;
  createdBy: string;
  createdByPhoto: string;
  createdByPreferences: string;
  created_by_user_id: string;
  created_by_username: string;
};

type TripDetailProps = {
  tripId: string;
};

type TripData = {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  dateRange: string;
  country: string;
  city: string;
  description: string;
  minBudget: number;
  url: string | null;
  month: string;
  isFlexible: boolean;
  created_by_name: string;
  isAvailable: boolean;
  created_by_user_id: string;
  created_by_username: string;
}

const USER_DETAILS = {
  preferencesTitle: "Co-Liver's preferences",
  preferencesDescription: `Looking for a non-smoker, pet-friendly co-liver who values cleanliness and enjoys a quiet living environment. Prefer someone who is respectful of shared spaces and has a similar lifestyle.`,
  splitOption: "$1000",
  contactName: "Dmitry Korzhov"
};

export default function TripDetail({ tripId }: TripDetailProps) {
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [trips, setTrips] = useState<TripData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState({ save: false, delete: false });
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState<TripDetail | null>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({});

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

  useEffect(() => {
    async function fetchCurrentUserId() {
      const id = await getUserId();
      setCurrentUserId(id);
    }

    async function fetchToken() {
      const accessToken = await getAccessToken();
      setToken(accessToken);
    }

    fetchCurrentUserId();
    fetchToken();
  }, []);

  const handleDeleteClick = () => {
  };

  useEffect(() => {
    if (!tripId) return;

    async function fetchListingDetail() {
      try {
        const response = await ApiService.get(`/api/trip/${tripId}`);
        if (response) {
          const data: TripDetail = {
            id: response.id,
            title: response.name,
            imgSrc: response.image1,
            alt: response.name,
            country: response.country,
            city: response.city,
            description: response.description,
            minBudget: parseFloat(response.budget),
            url: response.url,
            month: response.month.charAt(0).toUpperCase() + response.month.slice(1),
            isFlexible: response.is_flexible,
            createdBy: response.created_by_name,
            createdByPhoto: response.photo,
            createdByPreferences: response.user_coliver_preferences,
            created_by_user_id: response.created_by_user_id,
            created_by_username: response.created_by_username,
          };
          setTripDetails(data);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }

    fetchListingDetail();
  }, [tripId]); 


  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await ApiService.get('/api/trip/')
        if (Array.isArray(response)) {
          const data = response.map((listing: any) => ({
            id: listing.id,
            title: listing.name,
            imgSrc: listing.image1,
            alt: listing.name,
            country: listing.country,
            city: listing.city,
            description: listing.description,
            minBudget: parseFloat(listing.budget),
            url: listing.url,
            month: listing.month.charAt(0).toUpperCase() + listing.month.slice(1),
            isFlexible: listing.is_flexible,
            created_by_name: listing.created_by_name,
            created_by_username: listing.created_by_username
          }))
          setTrips(data as TripData[])
        } else {
          console.error("No data in response")
        }
      } catch (error) {
        console.error("Error fetching listings:", error)
      }
    }

    fetchTrips()
  }, [])

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast("Link copied to clipboard", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTrip(tripDetails);
  };

  const handleSaveClick = () => {
    if (editedTrip) {
      setIsLoading(prevState => ({ ...prevState, save: true }));
      ApiService.put(`/api/trip/${editedTrip.id}/update/`, JSON.stringify({
        name: editedTrip.title,
        description: editedTrip.description,
        country: editedTrip.country,
        city: editedTrip.city,
        month: editedTrip.month.toLowerCase(),
        imgSrc: editedTrip.imgSrc
      }))
        .then(data => {
          setTripDetails(prevDetails => ({
            ...prevDetails,
            ...data
          }));
          setIsEditing(false);
          toast("Trip details updated successfully");
        })
        .catch(error => {
          console.error('Failed to update trip details:', error);
          try {
            const errorData = JSON.parse(error.message);
            setErrorMessages(errorData);
          } catch (e) {
            toast("Failed to update trip details");
          }
        })
        .finally(() => {
          setIsLoading(prevState => ({ ...prevState, save: false }));
        });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTrip(tripDetails);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedTrip) {
      setEditedTrip({
        ...editedTrip,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleMonthChange = (value: string) => {
    if (editedTrip) {
      setEditedTrip({
        ...editedTrip,
        month: value,
      });
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <Link href="/trips">
          <Button variant="ghost" size="icon" className="flex items-center gap-2">
            <MoveLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="flex items-center gap-2" onClick={handleShareClick}>
            <Share className="w-4 h-4" />
          </Button>
          {tripDetails?.created_by_user_id === currentUserId && token && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="flex items-center gap-2">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={handleEditClick}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDeleteClick}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          <img
            src={tripDetails?.imgSrc || "/photo2.png"}
            alt={tripDetails?.alt || "Trip Image"}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full aspect-[3/2]"
          />
        </div>
        <div>
        <div className="grid gap-2">
        <div>
          {isEditing ? (
            <div>
              <Input
                type="text"
                name="title"
                value={editedTrip?.title || ""}
                onChange={handleChange}
                className="mb-4"
              />
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="country"
                  value={editedTrip?.country || ""}
                  onChange={handleChange}
                  className="mb-4"
                />
                <Input
                  type="text"
                  name="city"
                  value={editedTrip?.city || ""}
                  onChange={handleChange}
                  className="mb-4"
                />
                <Select onValueChange={handleMonthChange} value={editedTrip?.month.toLowerCase() || ""}>
                  <SelectTrigger className="mb-4">
                    <SelectValue placeholder="Select a month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                name="description"
                value={editedTrip?.description || ""}
                onChange={handleChange}
                className="mb-4"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold tracking-tighter mb-4">{tripDetails?.title}</h1>
              <div className="flex gap-2">
                <Badge variant="outline" className="mb-4">
                  {tripDetails?.country}, {tripDetails?.city}
                </Badge>
                <Badge variant="outline" className="mb-4">
                  {tripDetails?.month}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {tripDetails?.description}
              </p>
            </div>
          )}
        </div>
            <div className="flex gap-4">
            </div>
            <Card className="flex items-center p-4 gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold">{USER_DETAILS.preferencesTitle}</h3>
                    <p className="text-muted-foreground text-sm">
                      {tripDetails?.createdByPreferences}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <HoverCard>
                        <HoverCardTrigger className="hover:cursor-pointer">
                          <CircleHelp className="inline w-4 h-4 mr-1.5" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p>The number that {tripDetails?.createdBy} is ready to pay for the trip.</p>
                        </HoverCardContent>
                      </HoverCard>
                      Available Budget: <b>{USER_DETAILS.splitOption}</b>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Open Contacts
                      </Button>
                      <Link href={`/profile/${tripDetails?.created_by_username}`}>
                        <Button variant="link" size="sm" className="flex items-center gap-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={tripDetails?.createdByPhoto} />
                            <AvatarFallback>D</AvatarFallback>
                          </Avatar>
                          <p className="text-xs font-medium">{tripDetails?.createdBy}</p>
                        </Button>
                      </Link>
                      </div>
                  </div>
                </div>
              </div>
            </Card>
            {isEditing && (
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSaveClick}>Save</Button>
                  <Button variant="outline" onClick={handleCancelClick}>Cancel</Button>
                </div>
              )}
            </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tighter">Other trips you might like</h2>
        <div className="border-t border-gray-200 my-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            title={trip.title}
            imgSrc={trip.imgSrc}
            alt={trip.alt}
            showUser={true}
            country={trip.country}
            city={trip.city}
            description={trip.description}
            minBudget={trip.minBudget}
            url={trip.url || ""}
            month={trip.month}
            createdBy={trip.created_by_name}
            createdByUsername={trip.created_by_username}
          />
        ))}
        </div>
      </div>
    </div>
  )
}