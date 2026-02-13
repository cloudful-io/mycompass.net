"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface TravelDetailsStepProps {
  data: any
  onDataChange: (data: any) => void
}

export default function TravelDetailsStep({ data, onDataChange }: TravelDetailsStepProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Please provide details about your travel request. This information helps us process your relocation smoothly.
        </p>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="travelPurpose" className="text-base font-semibold">
            Travel Purpose
          </Label>
          <p className="text-sm text-muted-foreground mb-2">What is the primary purpose of your travel?</p>
          <select
            id="travelPurpose"
            value={data.travelPurpose}
            onChange={(e) => onDataChange({ travelPurpose: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
          >
            <option value="relocation">Relocation</option>
            <option value="temporary">Temporary Assignment</option>
            <option value="business">Business Travel</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="travelType" className="text-base font-semibold">
            Type of Travel
          </Label>
          <p className="text-sm text-muted-foreground mb-2">How long do you expect this travel to last?</p>
          <select
            id="travelType"
            value={data.travelType}
            onChange={(e) => onDataChange({ travelType: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
          >
            <option value="permanent">Permanent Relocation</option>
            <option value="temporary">Temporary (Less than 1 year)</option>
            <option value="short">Short-term (Days/Weeks)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="departureDate" className="text-base font-semibold">
              Departure Date
            </Label>
            <p className="text-sm text-muted-foreground mb-2">When do you plan to depart?</p>
            <Input
              id="departureDate"
              type="date"
              value={data.departureDate}
              onChange={(e) => onDataChange({ departureDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="returnDate" className="text-base font-semibold">
              Return Date
            </Label>
            <p className="text-sm text-muted-foreground mb-2">When do you plan to return?</p>
            <Input
              id="returnDate"
              type="date"
              value={data.returnDate}
              onChange={(e) => onDataChange({ returnDate: e.target.value })}
              disabled={data.travelType === 'permanent'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
