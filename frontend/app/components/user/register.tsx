import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getAccessToken } from "../../lib/actions";
import ApiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";
import { LoaderCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Trash2
} from "lucide-react"

export default function Register() {
  const [step, setStep] = useState(1)
  const [refuseBackStepOne, setRefuseBackStepOne] = useState(false);
  const router = useRouter();
  const totalSteps = 4
  const [links, setLinks] = useState([{ id: 1, value: "", platform: "" }]);
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [language, setLanguage] = useState("")
  const [travelStatus, setTravelStatus] = useState("")
  const [about, setAbout] = useState("")
  const [coliverPreferences, setColiverPreferences] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [AccessToken, setAccessToken] = useState<string | null>(null);
  

  useEffect(() => {
    async function fetchTokenAndSetStep() {
      const accessToken = await getAccessToken();
      setAccessToken(accessToken);
      if (accessToken !== null) {
        setStep(2);
        setRefuseBackStepOne(true);
      }
    }
    fetchTokenAndSetStep();
  }, []);

  const validateStep = (): boolean => {
    if (step === 1) return !email || !password || !repeatPassword || !!passwordError;
    if (step === 2) {
      return !name || !photo || !language || !travelStatus;
    }
    if (step === 3) return !about || !coliverPreferences;
    return false;
  };

  const handleNext = async () => {
    if (step === 1) {
      setIsLoading(true);
      try {
        await HandleRegister();
        setStep((prev) => prev + 1);
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (!validateStep() && step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const HandleRegister = async () => {
    const formData = {
      email: email,
      password1: password,
      password2: repeatPassword
    };

    const response = await ApiService.post('/api/register/', JSON.stringify(formData));

    if (response.access) {
      await handleLogin(response.user.pk, response.access, response.refresh);
      setRefuseBackStepOne(true);
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => error);
      setErrors(tmpErrors);
      throw new Error('Registration failed');
    }
  };

  const UpdateUserData = async () => {
    setIsLoading(true);
    try {
      const formattedLinks = links.reduce((acc: Record<string, string>, link) => {
        acc[link.platform] = link.value;
        return acc;
      }, {});
  
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('language', language);
      formData.append('travel_status', travelStatus);
      formData.append('about', about);
      formData.append('coliver_preferences', coliverPreferences);
      if (photo) {
        formData.append('photo', photo);
      }
      formData.append('social_media_links', JSON.stringify(formattedLinks));
  
      const response = await ApiService.put_form('/api/user/data/update/', formData);
      
      console.log(response);
  
      if (response.status === 200) {
        router.push('/');
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      setErrors(['Failed to update user data. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsNextDisabled(validateStep());
  }, [email, name, password, repeatPassword, passwordError, language, travelStatus, about, coliverPreferences, step, photo, links]);

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleLinkPlatformChange = (id: number, value: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, platform: value } : link))
  }

  const handleAddLink = () => {
    setLinks([...links, { id: links.length + 1, value: "", platform: "" }])
  }

  const handleLinkChange = (id: number, value: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, value } : link))
  }

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (repeatPassword && newPassword !== repeatPassword) {
      setPasswordError("Passwords do not match");
    } else if (newPassword.length < 8) {
      setPasswordError("This password is too short. It must contain at least 8 characters.");
    } else if (/^\d+$/.test(newPassword)) {
      setPasswordError("This password is entirely numeric.");
    } else if (["12345678", "password", "qwerty"].includes(newPassword)) {
      setPasswordError("This password is too common.");
    } else {
      setPasswordError("");
    }
  }

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);

    if (password && newRepeatPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-2 bg-gray-900 rounded-full dark:bg-gray-50"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((num) => (
            <div key={num} className="flex items-center">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  num <= step
                    ? "bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {num}
              </span>
              {num !== totalSteps && <span className="w-8 h-px bg-gray-200 dark:bg-gray-700 inline-flex mx-2" />}
            </div>
          ))}
        </div>
        </div>
        {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 1: Personal Information</h2>
          <p className="text-gray-500 mb-4">Please provide your personal details.</p>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
            <Label htmlFor="repeat-password">Repeat Password</Label>
            <Input
              id="repeat-password"
              type="password"
              placeholder="Repeat your password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
            />
            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 2: Additional Information</h2>
          <p className="text-gray-500 mb-4">Please provide additional details.</p>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
          <Label htmlFor="photo">Photo</Label>
          <div className="relative">
            <Input
              type="file"
              id="photo"
              onChange={handlePhotoChange}
              accept="image/*"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <div className="border rounded-md p-2 text-sm">
              {photo ? `Image name: ${photo.name}` : "Choose a file..."}
            </div>
          </div>
        </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Russian">Russian</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="travelStatus">Travel Status</Label>
              <Select value={travelStatus} onValueChange={setTravelStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your travel status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ready to travel">Ready to travel</SelectItem>
                  <SelectItem value="Not ready to travel">Not ready to travel</SelectItem>
                  <SelectItem value="Will be ready soon">Will be ready soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 3: About you and co-liver preferences</h2>
          <p className="text-gray-500 mb-4">Please add 3-5 senteces about yourself and your co-liver preferences</p>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="about">About you</Label>
              <Textarea id="about" placeholder="Who are you? Write 3-5 senteces about yourself!" value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="preferences">Co-liver preferences</Label>
              <Textarea id="preferences" placeholder="Why you would live to live with?" value={coliverPreferences} onChange={(e) => setColiverPreferences(e.target.value)} />
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 4: Links</h2>
          <p className="text-gray-500 mb-4">Please provide your links.</p>
          <div className="space-y-4">
            {links.map(link => (
              <div key={link.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <Select value={link.platform} onValueChange={(value) => handleLinkPlatformChange(link.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Github">Github</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    id={`link-${link.id}`}
                    placeholder="Enter a link"
                    value={link.value}
                    onChange={(e) => handleLinkChange(link.id, e.target.value)}
                    className="flex-grow"
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => handleRemoveLink(link.id)} className="ml-2 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="link" onClick={handleAddLink}>Add Link</Button>
          </div>
        </div>
      )}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={step === 1 || step === 2 || isLoading}>
              Previous
            </Button>
            {step < totalSteps ? (
              <Button onClick={handleNext} disabled={isNextDisabled || isLoading}>
                {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                Next
              </Button>
            ) : (
              <Button onClick={UpdateUserData} disabled={isNextDisabled || isLoading}>
                {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                Register
              </Button>
            )}
          </div>
          {errors.length > 0 && (
            <div className="mt-4 text-red-500">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          </div>
  );
}