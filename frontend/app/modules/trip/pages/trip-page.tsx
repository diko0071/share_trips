import { CalendarDays, DollarSign, User, MapPin, Mail, Share, CircleHelp, MoveLeft, Pencil, Settings, LoaderCircle, Link as LinkIcon, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card" 
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { toast } from "sonner"
import TripCard from "../elements/trip-card"
import { getUserId, getAccessToken } from "../../../lib/actions"
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ContactsPopup } from "../elements/contacts-popup";
import { usePopup } from "../../profile/elements/popup-context";
import SkeletonTripCard from "../elements/skeleton-trip-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ApiService from "../../../services/apiService";
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
import { fetchTripDetails, updateTrip, fetchTrips, deleteTrip } from "../tripAPIs";
import type { TripDetail as TripDetailType, TripData } from "../tripAPIs";

type TripDetailProps = {
  tripId: string;
};

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
  const [tripDetails, setTripDetails] = useState<TripDetailType | null>(null);
  const [relevantTrips, setRelevantTrips] = useState<TripData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState({ save: false, delete: false });
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTrip, setEditedTrip] = useState<TripDetailType | null>(null);
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
      await deleteTrip(tripDetails.id);
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

  async function fetchAndSetTripDetails() {
    try {
      setIsLoadingTripDetails(true);
      const data = await fetchTripDetails(tripId);
      setTripDetails(data);
    } catch (error) {
      toast.error(`Error fetching trip details: ${error}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoadingTripDetails(false);
    }
  }

  fetchAndSetTripDetails();
}, [tripId]);


useEffect(() => {
  async function fetchRelevantTrips() {
    try {
      setIsLoadingTrips(true);
      const allTrips = await fetchTrips();
      const filtered = allTrips
        .filter(trip => trip.id !== parseInt(tripId))
        .slice(0, 3);
      setRelevantTrips(filtered);
    } catch (error) {
      toast.error(`Error fetching relevant trips: ${error}`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLoadingTrips(false);
    }
  }

  fetchRelevantTrips();
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

  const handleSaveClick = async () => {
    if (editedTrip) {
      setIsLoading(prevState => ({ ...prevState, save: true }));
      try {
        const updatedTripData = {
          name: editedTrip.title,
          description: editedTrip.description,
          country: editedTrip.country,
          city: editedTrip.city,
          month: editedTrip.month,
          budget: editedTrip.minBudget.toString(),
          currency: editedTrip.currency,
          url: editedTrip.url || ''
        };

        const updatedTrip = await updateTrip(editedTrip.id, updatedTripData);
        setTripDetails(updatedTrip);
        setIsEditing(false);
        toast("Trip details updated successfully", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
      } catch (error) {
        toast(`Failed to update trip details: ${error}`, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        if (error instanceof Error) {
          try {
            const errorData = JSON.parse(error.message);
            setErrorMessages(errorData);
          } catch (e) {
            console.error("Error parsing error message:", e);
          }
        }
      } finally {
        setIsLoading(prevState => ({ ...prevState, save: false }));
      }
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
      const updatedTripData = {
        status: newStatus,
        description: tripDetails.description,
        name: tripDetails.title
      };

      const updatedTrip = await updateTrip(tripDetails.id, updatedTripData);
  
      if (updatedTrip) {
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
                <div className="text-muted-foreground whitespace-pre-wrap">
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
                      <div className="text-muted-foreground text-sm whitespace-pre-wrap">
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
                                <b> 
                                  {tripDetails?.minBudget && !isNaN(tripDetails.minBudget) 
                                  ? ` ${tripDetails.minBudget} ${tripDetails.currency} per person`
                                  : " Budget not specified"}
                                </b>
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
        ) : relevantTrips.map((trip) => (
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