import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Register() {
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const handleNext = () => {
    setStep((prev) => prev + 1)
  }
  const handlePrev = () => {
    setStep((prev) => prev - 1)
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 2: Address</h2>
          <p className="text-gray-500 mb-4">Please provide your mailing address.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" placeholder="Enter your street address" />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Enter your city" />
            </div>
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" placeholder="Enter your state/province" />
            </div>
            <div>
              <Label htmlFor="zip">Zip/Postal Code</Label>
              <Input id="zip" placeholder="Enter your zip/postal code" />
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 3: Employment</h2>
          <p className="text-gray-500 mb-4">Please provide your employment details.</p>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Enter your company name" />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="Enter your job title" />
            </div>
            <div>
              <Label htmlFor="income">Annual Income</Label>
              <Input id="income" type="number" placeholder="Enter your annual income" />
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 4: Preferences</h2>
          <p className="text-gray-500 mb-4">Please select your preferences.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interests">Interests</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your interests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="cooking">Cooking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Step 5: Review and Submit</h2>
          <p className="text-gray-500 mb-4">Please review your information and submit the form.</p>
          <div className="space-y-4" />
          <Button type="submit">Submit</Button>
        </div>
      )}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {step < totalSteps && <Button onClick={handleNext}>Next</Button>}
        </div>
      </div>
  )
}