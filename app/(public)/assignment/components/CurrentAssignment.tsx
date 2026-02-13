"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar } from 'lucide-react'
import ExploreOpportunitiesModal from './ExploreOpportunitiesModal'

export default function CurrentAssignment() {
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  // Mock current assignment data
  const currentAssignment = {
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    startDate: '2024-01-15',
    endDate: '2026-06-30',
    description: 'Leading the development of cloud infrastructure solutions',
  }

  return (
    <>
      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentAssignment.title}</h3>
            <p className="text-muted-foreground mb-4">{currentAssignment.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span>{currentAssignment.department} • {currentAssignment.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span>
                  {new Date(currentAssignment.startDate).toLocaleDateString()} - {new Date(currentAssignment.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-shrink-0">
            <Button size="lg" onClick={() => setIsExploreOpen(true)}>
              Explore New Opportunities
            </Button>
          </div>
        </div>
      </Card>

      <ExploreOpportunitiesModal 
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
      />
    </>
  )
}
