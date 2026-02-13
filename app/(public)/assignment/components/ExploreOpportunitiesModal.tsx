"use client"

import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MapPin, Star, ChevronDown, Briefcase } from 'lucide-react'

interface JobListing {
  id: string
  title: string
  description: string
  location: string
  qualification: string
  startDate: string
  department: string
}

interface ExploreOpportunitiesModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockListings: JobListing[] = [
  {
    id: '1',
    title: 'Product Manager',
    description: 'Lead product strategy and development for our core platform',
    location: 'San Francisco, CA',
    qualification: 'MBA or 5+ years PM experience',
    startDate: '2026-06-01',
    department: 'Product',
  },
  {
    id: '2',
    title: 'Solutions Architect',
    description: 'Design and implement solutions for enterprise clients',
    location: 'New York, NY',
    qualification: 'AWS/Azure certification required',
    startDate: '2026-04-15',
    department: 'Solutions',
  },
  {
    id: '3',
    title: 'Data Scientist',
    description: 'Build ML models and analytics pipelines',
    location: 'Boston, MA',
    qualification: 'PhD in CS or 3+ years ML experience',
    startDate: '2026-05-01',
    department: 'Analytics',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    description: 'Manage infrastructure and CI/CD pipelines',
    location: 'Seattle, WA',
    qualification: 'Kubernetes and Docker experience',
    startDate: '2026-07-01',
    department: 'Engineering',
  },
  {
    id: '5',
    title: 'UX Designer',
    description: 'Design user experiences for mobile and web applications',
    location: 'Austin, TX',
    qualification: 'Portfolio of 3+ projects required',
    startDate: '2026-06-15',
    department: 'Design',
  },
  {
    id: '6',
    title: 'Sales Director',
    description: 'Lead enterprise sales team and drive revenue growth',
    location: 'Chicago, IL',
    qualification: '$5M+ ARR sales experience',
    startDate: '2026-08-01',
    department: 'Sales',
  },
]

export default function ExploreOpportunitiesModal({
  isOpen,
  onClose,
}: ExploreOpportunitiesModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'startDate' | 'title'>('startDate')
  const [addedOpportunities, setAddedOpportunities] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'explore' | 'saved'>('explore')

  const filteredAndSorted = useMemo(() => {
    let filtered = mockListings.filter((job) => {
      const query = searchQuery.toLowerCase()
      return (
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query)
      )
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'startDate') {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      }
      return a.title.localeCompare(b.title)
    })
  }, [searchQuery, sortBy])

  const savedJobs = mockListings.filter((job) => addedOpportunities.includes(job.id))

  const toggleJobAdded = (jobId: string) => {
    setAddedOpportunities((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }

  const reorderJobs = (fromIndex: number, toIndex: number) => {
    const newOrder = [...addedOpportunities]
    const [movedItem] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, movedItem)
    setAddedOpportunities(newOrder)
  }

  const JobCard = ({ job, isAdded = false, index }: { job: JobListing; isAdded?: boolean; index?: number }) => (
    <Card className={`p-4 md:p-6 transition-all ${isAdded ? 'border-primary/50 bg-primary/5' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{job.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Qualification:</span> {job.qualification}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Start Date:</span> {new Date(job.startDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-shrink-0">
          {!isAdded ? (
            <>
              <Button
                size="sm"
                onClick={() => toggleJobAdded(job.id)}
                className="whitespace-nowrap"
              >
                Add to List
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {}}
                className="whitespace-nowrap"
              >
                Ignore
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-1">
              {index !== undefined && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reorderJobs(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="whitespace-nowrap"
                  >
                    Move Up
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reorderJobs(index, Math.min(savedJobs.length - 1, index + 1))}
                    disabled={index === savedJobs.length - 1}
                    className="whitespace-nowrap"
                  >
                    Move Down
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => toggleJobAdded(job.id)}
                className="whitespace-nowrap"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">Opportunities</DialogTitle>
        </DialogHeader>

        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'explore' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('explore')}
          >
            Explore ({filteredAndSorted.length})
          </Button>
          <Button
            variant={viewMode === 'saved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('saved')}
          >
            My List ({addedOpportunities.length})
          </Button>
        </div>

        {viewMode === 'explore' ? (
          <>
            {/* Search and Sort */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, location, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Label className="flex items-center">Sort by:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {sortBy === 'startDate' ? 'Start Date' : 'Title'}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy('startDate')}>
                      Start Date
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('title')}>
                      Title
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Job Listings */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {filteredAndSorted.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isAdded={addedOpportunities.includes(job.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Saved Opportunities */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {savedJobs.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No opportunities added yet</p>
                </div>
              ) : (
                savedJobs.map((job, index) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isAdded={true}
                    index={index}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* Close Button */}
        <Button variant="outline" onClick={onClose} className="w-full">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
