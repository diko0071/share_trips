import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Trash2
} from "lucide-react"

export default function Register() {
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [links, setLinks] = useState([{ id: 1, value: "" }])
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [name, setName] = useState("")
  const [sex, setSex] = useState("")
  const [language, setLanguage] = useState("")
  const [travelStatus, setTravelStatus] = useState("")
  const [about, setAbout] = useState("")
  const [preferences, setPreferences] = useState("")
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const validateStep = (): boolean => {
    if (step === 1) return !email || !name || !password || !repeatPassword || !!passwordError;
    if (step === 2) return !sex || !language || !travelStatus;
    if (step === 3) return !about || !preferences;
    return false;
  };

  const handleNext = () => {
    if (!validateStep() && step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setIsNextDisabled(validateStep());
  }, [email, name, password, repeatPassword, passwordError, sex, language, travelStatus, about, preferences, step]);

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleAddLink = () => {
    setLinks([...links, { id: links.length + 1, value: "" }])
  }

  const handleLinkChange = (id: number, value: string) => {
    setLinks(links.map(link => link.id === id ? { ...link, value } : link))
  }

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (repeatPassword && e.target.value !== repeatPassword) {
      setPasswordError("Passwords do not match")
    } else {
      setPasswordError("")
    }
  }

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value)
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match")
    } else {
      setPasswordError("")
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
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
              <Label htmlFor="sex">Sex</Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
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
                  <SelectItem value="ready">Ready Now</SelectItem>
                  <SelectItem value="notReady">Not Ready</SelectItem>
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
              <Textarea id="preferences" placeholder="Why you would live to live with?" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
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
              <div key={link.id}>
                <Label htmlFor={`link-${link.id}`}>Link {link.id}</Label>
                <div className="flex items-center">
                  <Input
                    id={`link-${link.id}`}
                    placeholder="Enter a link"
                    value={link.value}
                    onChange={(e) => handleLinkChange(link.id, e.target.value)}
                    className="flex-grow"
                  />
                  <Button variant="outline" size="icon" onClick={() => handleRemoveLink(link.id)} className="ml-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="link" onClick={handleAddLink}>Add Link</Button>
          </div>
        </div>
      )}
    <div className="mt-8 flex justify-between">
      <Button variant="outline" onClick={handlePrev} disabled={step === 1}>
        Previous
      </Button>
      {step < totalSteps ? (
        <Button onClick={handleNext} disabled={isNextDisabled}>Next</Button>
        ) : (
          <Button type="submit" disabled={!!passwordError}>Register</Button>
        )}
      </div>
    </div>
  )
}