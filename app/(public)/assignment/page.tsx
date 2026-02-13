"use client"

import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CurrentAssignment from './components/CurrentAssignment'
import AssignmentListings from './components/AssignmentListings'
import TimelineView from './components/TimelineView'

export default function MyAssignmentPage() {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'timeline'>('opportunities')

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Briefcase className="w-8 h-8" />
            My Assignment
          </h1>
          <p className="text-muted-foreground">Manage your current assignment and explore new opportunities</p>
        </div>

        {/* Current Assignment Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Assignment</h2>
          <CurrentAssignment />
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTab === 'opportunities'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Opportunities
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`pb-2 px-1 font-medium transition-colors ${
                activeTab === 'timeline'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <AssignmentListings />
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <TimelineView />
        )}
      </div>
    </div>
  )
}
