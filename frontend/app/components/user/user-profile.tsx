'use client';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import ListingCard from "../elements/trip-card"
import ListingCardExample from "../elements/trip-card-blur-example"
import ApiService from "../../services/apiService";
import { getUserId, getAccessToken } from "../../lib/actions"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { DotsHorizontalIcon, DiscordLogoIcon,  } from '@radix-ui/react-icons'
import TripCard from "../elements/trip-card"
import { usePopup } from "../user/popup-context";
import { toast } from "sonner"
import {
    MessageSquareShare,
    BarChartHorizontal,
    Linkedin,
    Github,
    Instagram,
    Mail,
    Pencil,
    Trash2, 
    LoaderCircle, 
    LockOpen,
    Lock,
    Facebook,
    Phone, 
    BookUser
} from "lucide-react"


interface SocialMediaLink {
  value: string;
  isPreferable: boolean;
}

interface UserProfileProps {
  userId: string;
}

interface UserProfile {
  name: string;
  email: string;
  photo: string;
  id: string;
  about: string;
  coliver_preferences: string;
  language: string;
  social_media_links: Record<string, SocialMediaLink>;
  travel_status: string;
  username: string;
}

interface Trips {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  country: string;
  city: string;
  description: string;
  minBudget: number;
  url: string;
  month: string;
  isFlexible: boolean;
  createdBy: string;
  createdByUsername: string;
  photo: string;
  status: string; 
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "twitter":
      return <img src="/x.svg" className="h-3 w-3" alt="X Icon" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "github":
      return <Github className="h-4 w-4" />;
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "discord":
      return <DiscordLogoIcon className="h-4 w-4" />;
    case "phone":
      return <Phone className="h-4 w-4" />;
    default:
      return <BookUser className="h-4 w-4" />;
  }
}

const languages = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Korean', label: 'Korean' },
];

const travelStatuses = [
  { value: 'Ready to travel', label: 'Ready to travel' },
  { value: 'Not ready to travel', label: 'Not ready to travel' },
  { value: 'Will be ready soon', label: 'Will be ready soon' },
];

export default function UserProfile({ userId }: UserProfileProps) {
  const router = useRouter();
  const [trips, setTrips] = useState<Trips[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string[] }>({});
  const { openLoginForm } = usePopup();


  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await ApiService.get(`/api/trip/user/${userId}/`);
        console.log("API response:", response);
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
            createdBy: listing.created_by_name,
            createdByUsername: listing.created_by_username,
            photo: listing.photo,
            status: listing.status
          }));
          console.log("Mapped data:", data);
          setTrips(data);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    }

    fetchTrips();
  }, [userId]);


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

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await ApiService.get(`/api/user/data/get/${userId}/`);
        
        if (response) {
          const profileData: UserProfile = {
            name: response.name,
            email: response.email,
            photo: response.photo,
            id: response.id,
            about: response.about,
            coliver_preferences: response.coliver_preferences,
            language: response.language,
            social_media_links: response.social_media_links,
            travel_status: response.travel_status,
            username: response.username,
          };
          setUserProfile(profileData);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }


  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(userProfile);
  };

  const handleSaveClick = async () => {
    if (editedUser) {
      setIsLoading(true);
      try {
        const formattedLinks = Object.entries(editedUser.social_media_links).reduce((acc: Record<string, SocialMediaLink>, [platform, link]) => {
          acc[platform] = link;
          return acc;
        }, {});
  
        const formData = new FormData();
        formData.append('name', editedUser.name);
        formData.append('language', editedUser.language);
        formData.append('travel_status', editedUser.travel_status);
        formData.append('about', editedUser.about);
        formData.append('coliver_preferences', editedUser.coliver_preferences);
        formData.append('social_media_links', JSON.stringify(formattedLinks));
        formData.append('username', editedUser.username);
  
        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
  
        const response = await ApiService.put_form('/api/user/data/update/', formData);
        
        if (response.status === 200) {
          setUserProfile(response.data);
          setIsEditing(false);
          toast("Profile updated successfully");
        } else {
          throw new Error(`Failed to update profile: ${response.statusText}`);
        }
      } catch (error: any) {
        console.error('Failed to update profile:', error);
        try {
          const errorData = JSON.parse(error.message);
          setErrorMessages(errorData);
        } catch (e) {
          toast("Failed to update profile");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(userProfile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSelectChange = (name: string, value: string) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  const handleLinkPlatformChange = (oldPlatform: string, newPlatform: string) => {
    if (editedUser) {
      const updatedLinks = { ...editedUser.social_media_links };
      const linkData = updatedLinks[oldPlatform];
      delete updatedLinks[oldPlatform];
      updatedLinks[newPlatform] = linkData;
  
      setEditedUser({
        ...editedUser,
        social_media_links: updatedLinks,
      });
    }
  };

  const handleLinkChange = (platform: string, field: 'value' | 'isPreferable', value: string | boolean) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        social_media_links: {
          ...editedUser.social_media_links,
          [platform]: {
            ...editedUser.social_media_links[platform],
            [field]: value,
          },
        },
      });
    }
  };

  const handleDeleteClick = async (tripId: number) => {
    try {
        await ApiService.delete(`/api/trip/${tripId}/delete/`);
        toast("Trip deleted successfully", {
            action: {
                label: "Close",
                onClick: () => toast.dismiss(),
            },
        });
        setTrips((prevTrips) => prevTrips.filter(trip => trip.id !== tripId));
    } catch (error) {
        console.error('Failed to delete trip:', error);
        toast("Failed to delete trip");
    }
};

const handleStatusChange = (tripId: number, newStatus: string, name: string, description: string) => {
  setIsLoading(true);
  ApiService.put(`/api/trip/${tripId}/update/`, JSON.stringify({
    status: newStatus,
    name: name,
    description: description
  }))
    .then(data => {
      setTrips(prevTrips => prevTrips.map(trip => 
        trip.id === tripId ? { ...trip, status: newStatus } : trip
      ));
      toast("Trip status updated successfully");
    })
    .catch(error => {
      console.error('Failed to update trip status:', error);
      try {
        const errorData = JSON.parse(error.message);
        setErrorMessages(errorData);
      } catch (e) {
        toast("Failed to update trip status");
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
};


const getActions = (status: string, trip: Trips) => {
  if (status === "Active") {
    return [
      {
        label: "Edit",
        onClick: () => {
          router.push(`/trip/${trip.id}/`);
        }
      },
      {
        label: "Archive",
        onClick: () => handleStatusChange(trip.id, "Archived", trip.title, trip.description)
      },
      {
        label: "Delete",
        onClick: () => handleDeleteClick(trip.id)
      }
    ];
  } else {
    return [
      {
        label: "Make Active",
        onClick: () => handleStatusChange(trip.id, "Active", trip.title, trip.description)
      },
      {
        label: "Edit",
        onClick: () => {
          router.push(`/trip/${trip.id}/`);
        }
      },
      {
        label: "Delete",
        onClick: () => handleDeleteClick(trip.id)
      }
    ];
  }
};

  const handleAddLink = () => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        social_media_links: {
          ...editedUser.social_media_links,
          [`new-${Date.now()}`]: { value: '', isPreferable: false },
        },
      });
    }
  };

  const handleRemoveLink = (platform: string) => {
    if (editedUser) {
      const updatedLinks = { ...editedUser.social_media_links };
      delete updatedLinks[platform];
      setEditedUser({
        ...editedUser,
        social_media_links: updatedLinks,
      });
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-left justify-left min-h-screen">
      <div className="flex flex-col lg:flex-row w-full max-w-full bg-white gap-10">
        <div className="w-full lg:w-3/4">
          <Card>
            <CardContent>
              <div className="flex flex-col items-start mt-4">
                <div className="flex items-start w-full">
                  <Avatar className="w-24 h-24 rounded-[10px]">
                    <AvatarImage src={userProfile.photo} />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  {currentUserId === userProfile.id && token && (
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={handleEditClick}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {isEditing ? (
                  <>
                    <Input
                      type="text"
                      name="name"
                      value={editedUser?.name || ""}
                      onChange={handleChange}
                      className="mt-4"
                    />
                    <Textarea
                      name="about"
                      value={editedUser?.about || ""}
                      onChange={handleChange}
                      className="mt-2"
                    />
                    <Select onValueChange={(value) => handleSelectChange('language', value)} value={editedUser?.language || ""}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(language => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      name="coliver_preferences"
                      value={editedUser?.coliver_preferences || ""}
                      onChange={handleChange}
                      className="mt-2"
                    />
                    <Select onValueChange={(value) => handleSelectChange('travel_status', value)} value={editedUser?.travel_status || ""}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select travel status" />
                      </SelectTrigger>
                      <SelectContent>
                        {travelStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <h3 className="mt-6 text-lg font-semibold">Contacts</h3>
                    <div className="mt-2 flex flex-col gap-3 w-full">
                      {editedUser?.social_media_links && Object.entries(editedUser.social_media_links).map(([platform, link]) => (
                        <div key={platform} className="flex items-center gap-2 w-full">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`preferable-${platform}`}
                              checked={link.isPreferable}
                              onCheckedChange={(checked) => handleLinkChange(platform, 'isPreferable', checked as boolean)}
                            />
                          </div>
                          <div className="flex-grow">
                            <Select value={platform} onValueChange={(value) => handleLinkPlatformChange(platform, value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Github">Github</SelectItem>
                                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                <SelectItem value="Facebook">Facebook</SelectItem>
                                <SelectItem value="Twitter">Twitter</SelectItem>
                                <SelectItem value="Instagram">Instagram</SelectItem>
                                <SelectItem value="Email">Email</SelectItem>
                                <SelectItem value="Discord">Discord</SelectItem>
                                <SelectItem value="Phone">Phone</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-grow">
                            <Input
                              id={`link-${platform}`}
                              placeholder="Enter a link"
                              value={link.value}
                              onChange={(e) => handleLinkChange(platform, 'value', e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveLink(platform)}
                            className="ml-2 flex items-center justify-center min-w-[40px] h-10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="link" className="justify-start" onClick={handleAddLink}>Add Link</Button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleSaveClick} disabled={isLoading}>
                        {isLoading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Save"}
                      </Button>
                      <Button variant="outline" onClick={handleCancelClick} disabled={isLoading}>Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mt-4 text-xl font-semibold">{userProfile.name}</h2>
                    <div className="mt-2 text-sm text-green-6000">
                      <Badge variant="outline">{userProfile.travel_status}</Badge>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">About</h3>
                    <p className="mt-2 text-sm">{userProfile.about}</p>
                    <h3 className="mt-6 text-lg font-semibold">Language</h3>
                    <Badge variant="outline" className="mt-2">{userProfile.language}</Badge>
                    <h3 className="mt-6 text-lg font-semibold">Co-livers Preferences</h3>
                    <p className="mt-2 text-sm">{userProfile.coliver_preferences}</p>
                    <h3 className="mt-6 text-lg font-semibold">Contacts</h3>
                    {token ? (
                      <div className="mt-2 flex gap-4">
                        {userProfile.social_media_links && Object.entries(userProfile.social_media_links).map(([platform, link]) => (
                          <a key={platform} href={link.value} target="_blank" rel="noopener noreferrer">
                            <Button variant="link" className="inline-flex items-center">
                              {getSocialIcon(platform)}
                              <span className="ml-2">{platform}</span>
                            </Button>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center mt-2">
                        <div className="mt-2 flex gap-4">
                        {userProfile.social_media_links && Object.entries(userProfile.social_media_links).map(([platform]) => (
                          <div key={platform} className="inline-flex items-center">
                            {getSocialIcon(platform)}
                            <span className="ml-2 blur-sm">********</span>                          
                          </div>
                        ))}
                         <Button 
                           variant="outline" 
                           size='icon' 
                           className="relative group" 
                           onClick={() => openLoginForm(`/profile/${userProfile.username}`)}
                         >
                          <Lock className="w-4 h-4 group-hover:hidden" />
                          <LockOpen className="w-4 h-4 hidden group-hover:block absolute" />
                         </Button>
                        </div>                
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-3/4">
            {trips.length === 0 ? (
              <div className="flex justify-center items-start h-full">
                <ListingCardExample />
              </div>
            ) : (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="flex justify-end">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1">
                  {trips.filter(trip => trip.status === "Active").map((trip) => (
                    <TripCard 
                      key={trip.id} 
                      id={trip.id}
                      title={trip.title}
                      imgSrc={trip.imgSrc}
                      alt={trip.alt}
                      country={trip.country}
                      city={trip.city}
                      description={trip.description}
                      minBudget={trip.minBudget}
                      url={trip.url}
                      month={trip.month}
                      createdBy={trip.createdBy}
                      showUser={false}
                      createdByUsername={trip.createdByUsername}
                      photo={trip.photo}
                      actions={getActions(trip.status, trip)} 
                      showDots={currentUserId === userProfile.id && token ? true : false}
                    />
                  ))}
                </div>
            </TabsContent>
            <TabsContent value="archived">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1">
                {trips.filter(trip => trip.status === "Archived").map((trip) => (
                  <TripCard 
                    key={trip.id} 
                    id={trip.id}
                    title={trip.title}
                    imgSrc={trip.imgSrc}
                    alt={trip.alt}
                    country={trip.country}
                    city={trip.city}
                    description={trip.description}
                    minBudget={trip.minBudget}
                    url={trip.url}
                    month={trip.month}
                    createdBy={trip.createdBy}
                    showUser={false}
                    createdByUsername={trip.createdByUsername}
                    photo={trip.photo}
                    actions={getActions(trip.status, trip)}
                    showDots={currentUserId === userProfile.id && token ? true : false}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
            )}
          </div>
      </div>
    </div>
  )
}