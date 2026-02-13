"use client"

import { Card } from '@/components/ui/card'
import { MapPin, Calendar, Briefcase } from 'lucide-react'

interface PreviousAssignment {
  id: string
  title: string
  department: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
}

export default function TimelineView() {
  const previousAssignments: PreviousAssignment[] = [
    {
      id: '1',
      title: 'Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      startDate: '2022-06-01',
      endDate: '2024-01-14',
      description: 'Built and maintained core microservices',
      achievements: [
        'Improved API performance by 40%',
        'Led migration to Kubernetes',
        'Mentored 3 junior engineers',
      ],
    },
    {
      id: '2',
      title: 'Junior Software Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      startDate: '2020-08-15',
      endDate: '2022-05-31',
      description: 'Developed features for customer-facing platform',
      achievements: [
        'Shipped 5 major features',
        'Achieved 95% test coverage',
        'Reduced deployment time by 60%',
      ],
    },
    {
      id: '3',
      title: 'Intern - Software Engineering',
      department: 'Engineering',
      location: 'Boston, MA',
      startDate: '2020-05-01',
      endDate: '2020-08-14',
      description: 'Worked on bug fixes and internal tools',
      achievements: [
        'Fixed 30+ bugs',
        'Built internal analytics dashboard',
        'Received return offer',
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-border md:translate-x-[-50%]" />

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-12">
          {previousAssignments.map((assignment, index) => (
            <div key={assignment.id} className={`relative md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline Dot */}
              <div className="absolute left-0 md:absolute md:left-1/2 top-8 w-14 h-14 bg-background border-4 border-primary rounded-full flex items-center justify-center md:translate-x-[-50%]">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <div className={`ml-24 md:ml-0 md:w-[400px] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <Card className="p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
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
                      <span>
                        {new Date(assignment.startDate).toLocaleDateString()} - {new Date(assignment.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="pt-4 border-t">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Key Achievements:</p>
                    <ul className="space-y-1 text-sm">
                      {assignment.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
