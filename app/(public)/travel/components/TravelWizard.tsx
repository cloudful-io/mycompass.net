"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import TravelDetailsStep from './steps/TravelDetailsStep'
import RelocationDetailsStep from './steps/RelocationDetailsStep'
import TravelArrangementsStep from './steps/TravelArrangementsStep'
import BudgetApprovalStep from './steps/BudgetApprovalStep'
import ReviewSubmitStep from './steps/ReviewSubmitStep'
import ProgressIndicator from './ProgressIndicator'

type Step = 'details' | 'relocation' | 'arrangements' | 'budget' | 'review'

interface WizardData {
  travelPurpose: string
  travelType: string
  departureDate: string
  returnDate: string
  currentLocation: string
  newLocation: string
  relocationType: string
  reason: string
  flightPreference: string
  accommodationType: string
  specialRequirements: string
  estimatedBudget: string
  needsApproval: boolean
  approvalManager: string
}

interface TravelWizardProps {
  isOpen: boolean
  onClose: () => void
}

const steps: { id: Step; title: string; description: string }[] = [
  { id: 'details', title: 'Travel Details', description: 'Basic travel information' },
  { id: 'relocation', title: 'Relocation Details', description: 'Relocation specifics' },
  { id: 'arrangements', title: 'Travel Arrangements', description: 'Flight & accommodation' },
  { id: 'budget', title: 'Budget & Approval', description: 'Cost and approvals' },
  { id: 'review', title: 'Review & Submit', description: 'Final review' },
]

export default function TravelWizard({ isOpen, onClose }: TravelWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('details')
  const [wizardData, setWizardData] = useState<WizardData>({
    travelPurpose: 'relocation',
    travelType: 'permanent',
    departureDate: '',
    returnDate: '',
    currentLocation: 'San Francisco, CA',
    newLocation: '',
    relocationType: 'permanent',
    reason: '',
    flightPreference: 'economy',
    accommodationType: 'hotel',
    specialRequirements: '',
    estimatedBudget: '',
    needsApproval: false,
    approvalManager: '',
  })

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id)
    }
  }

  const handleDataChange = (newData: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...newData }))
  }

  const handleSubmit = () => {
    console.log('Travel Request Submitted:', wizardData)
    onClose()
  }

  const handleClose = () => {
    setCurrentStep('details')
    onClose()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'details':
        return <TravelDetailsStep data={wizardData} onDataChange={handleDataChange} />
      case 'relocation':
        return <RelocationDetailsStep data={wizardData} onDataChange={handleDataChange} />
      case 'arrangements':
        return <TravelArrangementsStep data={wizardData} onDataChange={handleDataChange} />
      case 'budget':
        return <BudgetApprovalStep data={wizardData} onDataChange={handleDataChange} />
      case 'review':
        return <ReviewSubmitStep data={wizardData} />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-3xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl">{steps.find((s) => s.id === currentStep)?.title}</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {steps.find((s) => s.id === currentStep)?.description}
          </p>
        </DialogHeader>

        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 border-t border-b">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 py-4 bg-muted flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
          >
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </div>

          {currentStepIndex === steps.length - 1 ? (
            <Button onClick={handleSubmit}>
              Submit Request
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
