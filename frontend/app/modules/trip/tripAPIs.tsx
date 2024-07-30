import ApiService from "../../services/apiService";

export type TripDetail = {
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
    created_at: string;
  };

  export type TripData = {
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
    created_at: string;
  };

  export interface GalleryImage {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
    };
    liked: boolean;
    alt: string;
}

  export const fetchTripDetails = async (tripId: string): Promise<TripDetail> => {
    const response = await ApiService.get(`/api/trip/${tripId}`);
    return {
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
      status: response.status,
      created_at: response.created_at
    };
  };

  export const fetchTrips = async (): Promise<TripData[]> => {
    const response = await ApiService.get('/api/trip/');
    return response.map((listing: any) => ({
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
      currency: listing.currency,
      created_at: listing.created_at
    }));
  };

  export const fetchUserTrips = async (userId: string): Promise<any[]> => {
    const response = await ApiService.get(`/api/trip/user/${userId}/`);
    return response.map((listing: any) => ({
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
  };

  export const updateTrip = async (tripId: number, data: Partial<TripDetail>): Promise<TripDetail> => {
    const response = await ApiService.put(`/api/trip/${tripId}/update/`, JSON.stringify(data));
    
    return {
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
      status: response.status,
      created_at: response.created_at
    };
  };

  export const deleteTrip = async (tripId: number): Promise<void> => {
    await ApiService.delete(`/api/trip/${tripId}/delete/`);
  };

  export const createTrip = async (formData: FormData): Promise<TripDetail> => {
    const response = await ApiService.post_auth_form('/api/trip/create/', formData);
    return {
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
      status: response.status,
      created_at: response.created_at
    };
  };

  export const generateTripDescription = async (prompt: string, action: string): Promise<any> => {
    const formDataToSend = JSON.stringify({ prompt, action });
    return await ApiService.post_auth('/api/trip/generate/', formDataToSend);
  };

  export const searchImages = async (query: string): Promise<GalleryImage[]> => {
    const response = await ApiService.get(`/api/trip/image/search/?query=${encodeURIComponent(query)}`);
    return Array.isArray(response.photos) ? response.photos : [];
};