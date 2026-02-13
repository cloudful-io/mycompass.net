"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface RelocationDetailsStepProps {
  data: any
  onDataChange: (data: any) => void
}

export default function RelocationDetailsStep({ data, onDataChange }: RelocationDetailsStepProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Tell us about your relocation destination and the reason for your move.
        </p>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentLocation" className="text-base font-semibold">
              Current Location
            </Label>
            <p className="text-sm text-muted-foreground mb-2">Where are you currently based?</p>
            <Input
              id="currentLocation"
              value={data.currentLocation}
              onChange={(e) => onDataChange({ currentLocation: e.target.value })}
              placeholder="City, State"
            />
          </div>

          <div>
            <Label htmlFor="newLocation" className="text-base font-semibold">
              New Location
            </Label>
            <p className="text-sm text-muted-foreground mb-2">Where will you be relocating to?</p>
            <Input
              id="newLocation"
              value={data.newLocation}
              onChange={(e) => onDataChange({ newLocation: e.target.value })}
              placeholder="City, State"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="relocationType" className="text-base font-semibold">
            Type of Relocation
          </Label>
          <p className="text-sm text-muted-foreground mb-2">What type of relocation is this?</p>
          <select
            id="relocationType"
            value={data.relocationType}
            onChange={(e) => onDataChange({ relocationType: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
          >
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary Assignment</option>
            <option value="seasonal">Seasonal</option>
          </select>
        </div>

        <div>
          <Label htmlFor="reason" className="text-base font-semibold">
            Reason for Relocation
          </Label>
          <p className="text-sm text-muted-foreground mb-2">Why are you relocating?</p>
          <textarea
            id="reason"
            value={data.reason}
            onChange={(e) => onDataChange({ reason: e.target.value })}
            placeholder="E.g., New job opportunity, personal reasons, company transfer, etc."
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}
