import { CalendarDays, DollarSign, User, MapPin, Mail, Share, CircleHelp, MoveLeft, Pencil, Settings, LoaderCircle, Link as LinkIcon, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { toast } from "sonner"
import TripCard from "../elements/trip-card"
import { getUserId, getAccessToken } from "../../lib/actions"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ContactsPopup } from "../elements/contacts-popup";
import { usePopup } from "../user/popup-context";
import SkeletonTripCard from "../elements/skeleton-trip-card";
import { Skeleton } from "@/components/ui/skeleton";
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
  status: string;
  currency: string;
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
  status: string;
  photo: string;
  currency: string;
}

const USER_DETAILS = {
  preferencesTitle: "Co-Liver's preferences",
  preferencesDescription: `Looking for a non-smoker, pet-friendly co-liver who values cleanliness and enjoys a quiet living environment. Prefer someone who is respectful of shared spaces and has a similar lifestyle.`,
  splitOption: "$1000",
  contactName: "Dmitry Korzhov"
};

const currencies = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'KZT', label: 'KZT' },
  { value: 'RUB', label: 'RUB' },
];

export default function TripDetail({ tripId }: TripDetailProps) {
  const [tripDetails, setTripDetails] = useState<TripDetail | null>(null);
  const [trips, setTrips] = useState<TripData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState({ save: false, delete: false });
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState<TripDetail | null>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(tripDetails?.month || "");
  const [isContactsPopupOpen, setIsContactsPopupOpen] = useState(false);
  const { openLoginForm } = usePopup();
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);
  const [isLoadingTripDetails, setIsLoadingTripDetails] = useState(false);

  const months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
    { value: 'Flexible', label: 'Flexible' }
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

  const handleOpenContacts = () => {
    if (token) {
        setIsContactsPopupOpen(true);
    } else {
        openLoginForm(`/trip/${tripId}`);
    }
};


  const handleDeleteClick = async () => {
    if (!tripDetails) return;

    setIsLoading(prevState => ({ ...prevState, delete: true }));
    try {
        await ApiService.delete(`/api/trip/${tripDetails.id}/delete/`);
        toast("Trip deleted successfully", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        router.push('/');
    } catch (error) {
        toast(`Failed to delete trip: ${error}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
    } finally {
        setIsLoading(prevState => ({ ...prevState, delete: false }));
    }
};

  useEffect(() => {
    if (!tripId) return;

    async function fetchListingDetail() {
      try {
        setIsLoadingTripDetails(true);
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
            currency: response.currency,
            url: response.url,
            month: response.month.charAt(0).toUpperCase() + response.month.slice(1),
            isFlexible: response.is_flexible,
            createdBy: response.created_by_name,
            createdByPhoto: response.photo,
            createdByPreferences: response.user_coliver_preferences,
            created_by_user_id: response.created_by_user_id,
            created_by_username: response.created_by_username,
            status: response.status
          };
          setTripDetails(data);
        } else {
          toast.error("No data in response", {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
        }
      } catch (error) {
        toast.error(`Error fetching listings: ${error}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      } finally {
        setIsLoadingTripDetails(false);
      }
    }

    fetchListingDetail();
  }, [tripId]); 


  useEffect(() => {
    async function fetchTrips() {
      try {
        setIsLoadingTrips(true);
        const response = await ApiService.get('/api/trip/')
        if (Array.isArray(response)) {
          const data = response
            .filter((listing: any) => listing.id !== parseInt(tripId))
            .slice(0, 3)
            .map((listing: any) => ({
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
              created_by_username: listing.created_by_username,
              status: listing.status,
              photo: listing.photo,
              currency: listing.currency
            }));
          setTrips(data as TripData[]);
        } else {
          toast.error("No data in response", {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
        }
      } catch (error) {
        toast.error(`Error fetching listings: ${error}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      } finally {
        setIsLoadingTrips(false);
      }
    }

    fetchTrips();
  }, [tripId]);

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
      toast(`Failed to copy: ${err}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
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
        month: editedTrip.month,
        imgSrc: editedTrip.imgSrc,
        budget: editedTrip.minBudget,
        currency: editedTrip.currency,
        url: editedTrip.url
      }))
        .then(data => {
          setTripDetails(prevDetails => ({
            ...prevDetails,
            ...data
          }));
          setIsEditing(false);
          toast("Trip details updated successfully", {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
        })
        .catch(error => {
          toast(`Failed to update trip details: ${error}`, {
            action: {
              label: "Close",
              onClick: () => toast.dismiss(),
            },
          });
          try {
            const errorData = JSON.parse(error.message);
            setErrorMessages(errorData);
          } catch (e) {
            toast(`Failed to update trip details: ${error}`, {
              action: {
                label: "Close",
                onClick: () => toast.dismiss(),
              },
            });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => {
    if (editedTrip) {
      const value = e.target.name === 'minBudget' ? parseFloat(e.target.value) : e.target.value;
      setEditedTrip({
        ...editedTrip,
        [e.target.name]: value,
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

  const handleStatusChange = async (newStatus: 'Active' | 'Archived') => {
    if (!tripDetails) return;
  
    try {
      const response = await ApiService.put(`/api/trip/${tripDetails.id}/update/`, JSON.stringify({
        status: newStatus,
        description: tripDetails?.description,
        name: tripDetails?.title
      }));
  
      if (response) {
        setTripDetails(prevDetails => ({
          ...prevDetails!,
          status: newStatus
        }));
        toast(`Trip status updated to ${newStatus}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      }
    } catch (error) {
      toast(`Failed to update trip status: ${error}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <Link href="/">
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
                              <DotsHorizontalIcon className="w-4 h-4" />
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
                              {tripDetails.status === 'Active' && (
                                <DropdownMenuItem onClick={() => handleStatusChange('Archived')}>
                                  Archive
                                </DropdownMenuItem>
                              )}
                              {tripDetails.status === 'Archived' && (
                                <DropdownMenuItem onClick={() => handleStatusChange('Active')}>
                                  Make Active
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                </div>
            </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          {isLoadingTripDetails ? (
            <Skeleton className="w-full h-96 rounded-lg" />
          ) : (
            <img
              src={tripDetails?.imgSrc || "/photo2.png"}
              alt={tripDetails?.alt || "Trip Image"}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full aspect-[3/2]"
            />
          )}
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
                  <Select 
                    onValueChange={(value) => {
                      handleMonthChange(value);
                      setSelectedMonth(value);
                    }} 
                    value={selectedMonth}
                  >
                    <SelectTrigger className="mb-4">
                      <SelectValue placeholder={editedTrip?.month} />
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
              {isLoadingTripDetails ? (
                <Skeleton className="h-8 w-3/4 mb-4" />
              ) : (
                <h1 className="text-3xl font-bold tracking-tighter mb-4">{tripDetails?.title}</h1>
              )}
              <div className="flex gap-2">
                {isLoadingTripDetails ? (
                  <Skeleton className="h-6 w-1/4 mb-4" />
                ) : (
                  <>
                    <Badge variant="outline" className="mb-4">
                      {tripDetails?.country}, {tripDetails?.city}
                    </Badge>
                    <Badge variant="outline" className="mb-4">
                      {tripDetails?.month}
                    </Badge>
                  </>
                )}
              </div>
              {isLoadingTripDetails ? (
                <Skeleton className="h-20 w-full" />
              ) : (
                <div className="text-muted-foreground">
                  {tripDetails?.description}
                </div>
              )}
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
                      <div className="text-muted-foreground text-sm">
                        {isLoadingTripDetails ? (
                          <Skeleton className="h-4 w-3/4" />
                        ) : (
                          tripDetails?.createdByPreferences
                        )}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        <HoverCard>
                          <HoverCardTrigger className="hover:cursor-pointer">
                            <CircleHelp className="inline w-4 h-4 mr-1.5" />
                          </HoverCardTrigger>
                          <HoverCardContent>
                            The number that {tripDetails?.createdBy} is ready to pay for the trip.
                          </HoverCardContent>
                        </HoverCard>
                        Available Budget: 
                        {isEditing ? (
                              <div className="flex items-center gap-2 mt-3">
                                <Input
                                  type="number"
                                  name="minBudget"
                                  value={editedTrip?.minBudget || ""}
                                  onChange={handleChange}
                                  className="w-24 inline-block ml-2"
                                />
                                <Select
                                  onValueChange={(value) => handleChange({ target: { name: 'currency', value } })}
                                  value={editedTrip?.currency || ""}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a currency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {currencies.map((currency) => (
                                      <SelectItem key={currency.value} value={currency.value}>
                                        {currency.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : (
                              isLoadingTripDetails ? (
                                <Skeleton className="h-4 w-1/4" />
                              ) : (
                                <b> {tripDetails?.minBudget} {tripDetails?.currency} per person</b>
                              )
                            )}
                      </div>
                      {isEditing ? (
                          <Input
                            type="url"
                            name="url"
                            value={editedTrip?.url || ""}
                            onChange={handleChange}
                            placeholder="Trip URL"
                            className="w-full"
                          />
                        ) : tripDetails?.url && (
                          <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-muted-foreground" />
                            <a 
                              href={tripDetails.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-muted-foreground hover:underline flex items-center gap-1 text-sm"
                            >
                              Trip URL
                            </a>
                          </div>
                        )}
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleOpenContacts}>
                          Open Contacts
                        </Button>
                        <Link href={`/profile/${tripDetails?.created_by_username}`}>
                          <Button variant="link" size="sm" className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={tripDetails?.createdByPhoto} />
                              <AvatarFallback>D</AvatarFallback>
                            </Avatar>
                            <div className="text-xs font-medium">{tripDetails?.createdBy}</div>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSaveClick} disabled={isLoading.save}>
                    {isLoading.save ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading.save ? 'Saving...' : 'Save'}
                  </Button>
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
        {isLoadingTrips ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonTripCard key={index} />
          ))
        ) : trips.map((trip) => (
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
            photo={trip.photo}
          />
        ))}
        </div>
      </div>
      <ContactsPopup
        isOpen={isContactsPopupOpen}
        onClose={() => setIsContactsPopupOpen(false)}
        username={tripDetails?.created_by_username || ''}
      />
    </div>
  )
} 