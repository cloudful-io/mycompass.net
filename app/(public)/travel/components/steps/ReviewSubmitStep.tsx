"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

interface ReviewSubmitStepProps {
  data: any
}

export default function ReviewSubmitStep({ data }: ReviewSubmitStepProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900 dark:text-green-100">Review your travel request</p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              Please review all information carefully. Once submitted, you'll receive an email confirmation and your request will be routed for approval.
            </p>
          </div>
        </div>
      </Card>

      {/* Travel Details */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Travel Details</h3>
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Travel Purpose</p>
              <p className="font-semibold capitalize">{data.travelPurpose}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Travel Type</p>
              <p className="font-semibold capitalize">{data.travelType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Departure Date</p>
              <p className="font-semibold">{data.departureDate ? new Date(data.departureDate).toLocaleDateString() : 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Return Date</p>
              <p className="font-semibold">{data.returnDate ? new Date(data.returnDate).toLocaleDateString() : 'Permanent'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Relocation Details */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Relocation Details</h3>
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-semibold">{data.currentLocation}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">To</p>
              <p className="font-semibold">{data.newLocation}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">Relocation Type</p>
              <p className="font-semibold capitalize">{data.relocationType}</p>
            </div>
          </div>
          {data.reason && (
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-1">Reason</p>
              <p className="text-sm">{data.reason}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Travel Arrangements */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Travel Arrangements</h3>
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Flight Preference</p>
              <p className="font-semibold capitalize">{data.flightPreference.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Accommodation Type</p>
              <p className="font-semibold capitalize">{data.accommodationType}</p>
            </div>
          </div>
          {data.specialRequirements && (
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-1">Special Requirements</p>
              <p className="text-sm">{data.specialRequirements}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Budget & Approval */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Budget & Approval</h3>
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Estimated Budget</p>
              <p className="font-semibold text-lg text-primary">${parseFloat(data.estimatedBudget || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Requires Special Approval</p>
              <div className="mt-1">
                <Badge variant={data.needsApproval ? 'default' : 'outline'}>
                  {data.needsApproval ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>
          {data.needsApproval && data.approvalManager && (
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-1">Approval Manager</p>
              <p className="text-sm">{data.approvalManager}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Confirmation */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          By submitting this request, you confirm that all information is accurate and complete. You'll receive an email with next steps.
        </p>
      </Card>
    </div>
  )
}
