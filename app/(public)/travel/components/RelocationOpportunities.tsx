"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Briefcase } from 'lucide-react'

interface RelocationOp {
  id: string
  title: string
  currentLocation: string
  newLocation: string
  startDate: string
  department: string
  description: string
  status: 'available' | 'applied' | 'closed'
}

export default function RelocationOpportunities() {
  const opportunities: RelocationOp[] = [
    {
      id: '1',
      title: 'Tech Lead - Austin Office',
      currentLocation: 'San Francisco, CA',
      newLocation: 'Austin, TX',
      startDate: '2026-06-01',
      department: 'Engineering',
      description: 'Lead technical initiatives in our growing Austin office',
      status: 'available',
    },
    {
      id: '2',
      title: 'Senior Manager - New York Office',
      currentLocation: 'San Francisco, CA',
      newLocation: 'New York, NY',
      startDate: '2026-07-15',
      department: 'Operations',
      description: 'Manage operations team in our NYC headquarters',
      status: 'available',
    },
    {
      id: '3',
      title: 'Product Director - Boston Office',
      currentLocation: 'San Francisco, CA',
      newLocation: 'Boston, MA',
      startDate: '2026-05-01',
      department: 'Product',
      description: 'Direct product strategy for Northeast region',
      status: 'closed',
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available':
        return 'default'
      case 'applied':
        return 'secondary'
      case 'closed':
        return 'outline'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Relocation Opportunities</h2>
        <p className="text-muted-foreground mb-6">Explore available positions in different locations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <Card key={opp.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold">{opp.title}</h3>
              <Badge variant={getStatusBadgeVariant(opp.status)}>
                {opp.status.charAt(0).toUpperCase() + opp.status.slice(1)}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                <span>{opp.department}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                <span>{opp.currentLocation} → {opp.newLocation}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                <span>Start: {new Date(opp.startDate).toLocaleDateString()}</span>
              </div>
            </div>

            <Button
              className="w-full"
              variant={opp.status === 'available' ? 'default' : 'outline'}
              disabled={opp.status !== 'available'}
            >
              {opp.status === 'available' ? 'Apply Now' : opp.status === 'applied' ? 'Application Pending' : 'Position Closed'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
