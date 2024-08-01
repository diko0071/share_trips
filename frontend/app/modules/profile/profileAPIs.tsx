import ApiService from "../../services/apiService";
import { handleLogin, resetAuthCookies } from "../../lib/actions";


export type SocialMediaLink = {
  value: string;
  isPreferable: boolean;
};

export type UserProfileType = {
    id: string;
    name: string;
    email: string;
    photo: File | string | null;
    about: string;
    coliver_preferences: string;
    language: string;
    social_media_links: Record<string, SocialMediaLink>;
    travel_status: string;
    username: string | null;
  };

  export type UserProfileUpdateType = Omit<UserProfileType, 'photo'> & {
    photo?: File | string | null;
};

export const loginUser = async (formData: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; errors?: string[]; user?: any; access?: string; refresh?: string }> => {
    try {
      const response = await ApiService.post('/api/login/', JSON.stringify(formData));
  
      if (response.access) {
        await handleLogin(response.user.pk, response.access, response.refresh);
        return { success: true, user: response.user, access: response.access, refresh: response.refresh };
      } else {
        return { success: false, errors: response.non_field_errors || ['An unexpected error occurred'] };
      }
    } catch (error) {
      return { success: false, errors: ['An unexpected error occurred'] };
    }
  };

  export const logoutUser = async (): Promise<void> => {
    await resetAuthCookies();
    window.location.href = '/';
  };


  export const registerUser = async (formData: {
    email: string;
    password1: string;
    password2: string;
  }): Promise<{ success: boolean; errors?: string[] }> => {
    try {
      const response = await ApiService.post('/api/register/', JSON.stringify(formData));
  
      if (response.access) {
        await handleLogin(response.user.pk, response.access, response.refresh);
        return { success: true };
      } else {
        const errors: string[] = Object.values(response).map((error: any) => error);
        return { success: false, errors };
      }
    } catch (error) {
      return { success: false, errors: ['An unexpected error occurred'] };
    }
  };


export const FeatchPersonalProfile = async (): Promise<UserProfileType> => {
  const response = await ApiService.get('/api/user/data/');
  
  if (response) {
    return {
      photo: response.photo,
      id: response.id,
      username: response.username,
      name: response.name,
      email: response.email,
      about: response.about,
      coliver_preferences: response.coliver_preferences,
      language: response.language,
      social_media_links: response.social_media_links,
      travel_status: response.travel_status,
    };
  } else {
    throw new Error("No data in response");
  }
};

export const fetchUserProfile = async (userId: string): Promise<UserProfileType> => {
  const response = await ApiService.get(`/api/user/data/get/${userId}/`);
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    photo: response.photo,
    about: response.about,
    coliver_preferences: response.coliver_preferences,
    language: response.language,
    social_media_links: response.social_media_links,
    travel_status: response.travel_status,
    username: response.username,
  };
};

export const updateUserProfile = async (data: Partial<UserProfileUpdateType>): Promise<UserProfileType> => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'social_media_links') {
            formData.append(key, JSON.stringify(value));
        } else if (key === 'photo') {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === 'string' && value.startsWith('data:image')) {
                fetch(value)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "profile_photo.jpg", { type: "image/jpeg" });
                        formData.append(key, file);
                    });
            } else if (typeof value === 'string' && value.startsWith('http')) {
            } else if (value === null) {
                formData.append(key, '');
            }
        } else if (key === 'username') {
            if (value !== null) {
                formData.append(key, value.toString());
            }
        } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
        }
    });


    const response = await ApiService.put_form('/api/user/data/update/', formData);

    const responseData = response.data || response;

    const updatedProfile: UserProfileType = {
        id: responseData.id || data.id || '',
        name: responseData.name || data.name || '',
        email: responseData.email || data.email || '',
        photo: responseData.photo || (typeof data.photo === 'string' ? data.photo : ''),
        about: responseData.about || data.about || '',
        coliver_preferences: responseData.coliver_preferences || data.coliver_preferences || '',
        language: responseData.language || data.language || '',
        social_media_links: responseData.social_media_links || data.social_media_links || {},
        travel_status: responseData.travel_status || data.travel_status || '',
        username: responseData.username || data.username || null,
    };

    return updatedProfile;
};

export const sendOTP = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const response = await ApiService.post('/api/user/otp/send/', JSON.stringify({ email }));
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred while sending OTP' };
  }
};

export const verifyOTP = async (email: string, otp: string): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const response = await ApiService.post('/api/user/otp/verify/', JSON.stringify({ email, otp }));
    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred while verifying OTP' };
  }
};