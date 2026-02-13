"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Briefcase, Star } from 'lucide-react'

interface Assignment {
  id: string
  title: string
  description: string
  location: string
  qualification: string
  startDate: string
  department: string
  addedDate: string
}

export default function AssignmentListings() {
  const [savedAssignments, setSavedAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Senior Manager, Engineering',
      description: 'Lead engineering team and oversee product development',
      location: 'San Francisco, CA',
      qualification: 'MBA or 7+ years management experience',
      startDate: '2026-09-01',
      department: 'Engineering',
      addedDate: '2026-02-10',
    },
    {
      id: '2',
      title: 'VP of Operations',
      description: 'Oversee operations and drive efficiency improvements',
      location: 'Austin, TX',
      qualification: 'COO experience or equivalent',
      startDate: '2026-08-01',
      department: 'Operations',
      addedDate: '2026-02-08',
    },
  ])

  const [rankings, setRankings] = useState<string[]>(savedAssignments.map((a) => a.id))

  const reorderAssignments = (fromIndex: number, toIndex: number) => {
    const newRankings = [...rankings]
    const [movedItem] = newRankings.splice(fromIndex, 1)
    newRankings.splice(toIndex, 0, movedItem)
    setRankings(newRankings)
  }

  const sortedAssignments = rankings.map((id) => savedAssignments.find((a) => a.id === id)).filter(Boolean) as Assignment[]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">My Saved Opportunities</h2>
          <p className="text-sm text-muted-foreground">Drag to reorder by preference</p>
        </div>
      </div>

      {sortedAssignments.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No saved opportunities yet</p>
          <p className="text-sm text-muted-foreground">Start exploring opportunities to add them to your list</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedAssignments.map((assignment, index) => (
            <Card key={assignment.id} className="p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Rank Badge */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex-shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-2">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                        <span>{assignment.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                        <span>{assignment.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                        <span>{new Date(assignment.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Qualification:</span> {assignment.qualification}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reorderAssignments(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="whitespace-nowrap"
                  >
                    ↑ Move Up
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reorderAssignments(index, Math.min(sortedAssignments.length - 1, index + 1))}
                    disabled={index === sortedAssignments.length - 1}
                    className="whitespace-nowrap"
                  >
                    ↓ Move Down
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setSavedAssignments(savedAssignments.filter((a) => a.id !== assignment.id))}
                    className="whitespace-nowrap"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
