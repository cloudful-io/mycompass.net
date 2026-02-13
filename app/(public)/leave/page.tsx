"use client"

import { useState } from 'react'
import { Calendar, Plus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LeaveCalendar from './components/LeaveCalendar'
import RequestLeaveModal from './components/RequestLeaveModal'

// Mock data
const leaveStats = {
  totalBalance: 20,
  usedThisYear: 8,
  upcomingApproved: 3,
}

const leaveEvents: Array<{ date: Date; type: 'approved' | 'pending' | 'holiday' | 'denied'; title: string }> = [
  { date: new Date(2026, 1, 14), type: 'approved', title: 'Vacation' },
  { date: new Date(2026, 1, 15), type: 'approved', title: 'Vacation' },
  { date: new Date(2026, 1, 16), type: 'approved', title: 'Vacation' },
  { date: new Date(2026, 2, 5), type: 'pending', title: 'Sick Leave' },
  { date: new Date(2026, 2, 6), type: 'pending', title: 'Sick Leave' },
  { date: new Date(2026, 1, 17), type: 'holiday', title: 'Presidents Day' },
  { date: new Date(2026, 2, 1), type: 'denied', title: 'Unpaid Leave' },
]

export default function MyLeavePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="w-8 h-8" />
            My Leave
          </h1>
          <p className="text-muted-foreground">Manage your leave requests and view your leave balance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Leave Balance</p>
            <p className="text-3xl md:text-4xl font-bold text-blue-600">{leaveStats.totalBalance} days</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Leave Used This Year</p>
            <p className="text-3xl md:text-4xl font-bold text-orange-600">{leaveStats.usedThisYear} days</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Upcoming Approved Leaves</p>
            <p className="text-3xl md:text-4xl font-bold text-green-600">{leaveStats.upcomingApproved}</p>
          </Card>
        </div>

        {/* Request Leave Button */}
        <div className="mb-8">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="w-full md:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Request Leave
          </Button>
        </div>

        {/* Calendar Section */}
        <Card className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Leave Calendar</h2>
          
          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Approved Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Pending Request</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-sm">Denied</span>
            </div>
          </div>

          {/* Calendar */}
          <LeaveCalendar events={leaveEvents} />
        </Card>

        {/* Request Leave Modal */}
        <RequestLeaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentBalance={leaveStats.totalBalance}
        />
      </div>
    </div>
  )
}
