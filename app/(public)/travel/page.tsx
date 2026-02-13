"use client"

import { useState } from 'react'
import { Plane } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import RelocationOpportunities from './components/RelocationOpportunities'
import TravelWizard from './components/TravelWizard'

export default function MyTravelPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false)

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Plane className="w-8 h-8" />
            My Travel
          </h1>
          <p className="text-muted-foreground">Manage relocation opportunities and travel requests</p>
        </div>

        {/* Initiate Travel Request Button */}
        <div className="mb-8">
          <Button size="lg" onClick={() => setIsWizardOpen(true)}>
            <Plane className="w-5 h-5 mr-2" />
            Initiate Travel Request
          </Button>
        </div>

        {/* Relocation Opportunities */}
        <div className="mb-8">
          <RelocationOpportunities />
        </div>

       

        {/* Travel Wizard Modal */}
        <TravelWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
      </div>
    </div>
  )
}
