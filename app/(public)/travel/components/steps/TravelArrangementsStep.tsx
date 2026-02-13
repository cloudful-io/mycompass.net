"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface TravelArrangementsStepProps {
  data: any
  onDataChange: (data: any) => void
}

export default function TravelArrangementsStep({ data, onDataChange }: TravelArrangementsStepProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Select your preferred travel and accommodation arrangements. We'll work with our partners to provide the best options within your budget.
        </p>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="flightPreference" className="text-base font-semibold">
            Flight Preference
          </Label>
          <p className="text-sm text-muted-foreground mb-2">What class of flight do you prefer?</p>
          <select
            id="flightPreference"
            value={data.flightPreference}
            onChange={(e) => onDataChange({ flightPreference: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
          >
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business Class</option>
          </select>
        </div>

        <div>
          <Label htmlFor="accommodationType" className="text-base font-semibold">
            Accommodation Type
          </Label>
          <p className="text-sm text-muted-foreground mb-2">What type of accommodation would you prefer?</p>
          <select
            id="accommodationType"
            value={data.accommodationType}
            onChange={(e) => onDataChange({ accommodationType: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
          >
            <option value="hotel">Hotel</option>
            <option value="apartment">Short-term Apartment</option>
            <option value="corporate-housing">Corporate Housing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="specialRequirements" className="text-base font-semibold">
            Special Requirements
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Any special requests or requirements? (Optional)</p>
          <textarea
            id="specialRequirements"
            value={data.specialRequirements}
            onChange={(e) => onDataChange({ specialRequirements: e.target.value })}
            placeholder="E.g., wheelchair accessible, pet-friendly, proximity to office, etc."
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
            rows={4}
          />
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <p className="text-sm text-green-900 dark:text-green-100">
            <span className="font-semibold">💡 Tip:</span> Our team will book your travel arrangements within your budget. You'll receive confirmation once your request is approved.
          </p>
        </Card>
      </div>
    </div>
  )
}
