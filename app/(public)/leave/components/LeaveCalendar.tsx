"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LeaveEvent {
  date: Date
  type: 'approved' | 'pending' | 'holiday' | 'denied'
  title: string
}

interface LeaveCalendarProps {
  events: LeaveEvent[]
}

export default function LeaveCalendar({ events }: LeaveCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getColorForType = (type: string) => {
    switch (type) {
      case 'approved':
        return 'bg-red-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'holiday':
        return 'bg-blue-500'
      case 'denied':
        return 'bg-gray-500'
      default:
        return 'bg-gray-200'
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getEventsForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    )
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="text-lg md:text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          {/* Day names header */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-sm md:text-base py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {days.map((day, idx) => {
              const dayEvents = day ? getEventsForDate(day) : []
              const isToday = 
                day &&
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear()

              return (
                <div
                  key={idx}
                  className={`aspect-square p-1 md:p-2 rounded-lg border transition-colors ${
                    day
                      ? `cursor-pointer hover:bg-muted ${
                          isToday ? 'border-primary border-2' : 'border-border'
                        } bg-card`
                      : 'bg-transparent'
                  }`}
                >
                  {day ? (
                    <div className="h-full flex flex-col">
                      <span className="text-xs md:text-sm font-medium">{day}</span>
                      <div className="flex-1 flex gap-0.5 flex-wrap content-start">
                        {dayEvents.slice(0, 2).map((event, eventIdx) => (
                          <div
                            key={eventIdx}
                            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${getColorForType(
                              event.type
                            )} tooltip`}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{dayEvents.length - 2}</span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
