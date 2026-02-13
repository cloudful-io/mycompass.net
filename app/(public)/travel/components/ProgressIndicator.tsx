"use client"

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = 'details' | 'relocation' | 'arrangements' | 'budget' | 'review'

interface ProgressIndicatorProps {
  steps: { id: Step; title: string }[]
  currentStep: Step
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="px-6 py-4 bg-background border-b">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Circle */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                index < currentIndex
                  ? 'bg-primary text-primary-foreground'
                  : index === currentIndex
                  ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {index < currentIndex ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-1 mx-2 transition-colors',
                  index < currentIndex ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-2 text-xs">
        {steps.map((step) => (
          <div key={step.id} className="flex-1">
            <p className="text-muted-foreground text-center">{step.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
