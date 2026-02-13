"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { ChevronDown } from 'lucide-react'

interface RequestLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  currentBalance: number
}

export default function RequestLeaveModal({
  isOpen,
  onClose,
  currentBalance,
}: RequestLeaveModalProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [leaveType, setLeaveType] = useState('vacation')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const leaveTypes = [
    { value: 'vacation', label: 'Vacation' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' },
  ]

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return 0
  }

  const requestedDays = calculateDays()

  const handleSubmit = () => {
    if (startDate && endDate && leaveType) {
      setShowConfirmation(true)
    }
  }

  const handleConfirm = () => {
    // Handle the actual leave request submission
    console.log({
      startDate,
      endDate,
      leaveType,
      days: requestedDays,
    })
    setShowConfirmation(false)
    onClose()
    // Reset form
    setStartDate('')
    setEndDate('')
    setLeaveType('vacation')
  }

  const handleClose = () => {
    onClose()
    setStartDate('')
    setEndDate('')
    setLeaveType('vacation')
  }

  const currentLeaveType = leaveTypes.find((type) => type.value === leaveType)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">Request Leave</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Current Leave Balance */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-muted-foreground">Current Leave Balance</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {currentBalance} days
              </p>
            </Card>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-base">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-base"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-base">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                className="text-base"
              />
            </div>

            {/* Leave Type */}
            <div className="space-y-2">
              <Label className="text-base">Leave Type</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-base"
                  >
                    {currentLeaveType?.label}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {leaveTypes.map((type) => (
                    <DropdownMenuItem
                      key={type.value}
                      onClick={() => setLeaveType(type.value)}
                    >
                      {type.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Days Summary */}
            {requestedDays > 0 && (
              <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                <p className="text-sm text-muted-foreground">Days Requested</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {requestedDays} {requestedDays === 1 ? 'day' : 'days'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {requestedDays <= currentBalance
                    ? `You will have ${currentBalance - requestedDays} days remaining`
                    : `You do not have enough leave balance (need ${requestedDays - currentBalance} more days)`}
                </p>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!startDate || !endDate || !leaveType}
                className="flex-1"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="w-full max-w-sm p-4 md:p-6">
          <AlertDialogTitle className="text-xl">Confirm Leave Request</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3 py-4">
            <div>
              <p className="font-semibold text-foreground">Request Summary:</p>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Leave Type:</span> {currentLeaveType?.label}
              </p>
              <p>
                <span className="font-medium">Start Date:</span> {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">End Date:</span> {new Date(endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Total Days:</span> {requestedDays}
              </p>
            </div>
          </AlertDialogDescription>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
