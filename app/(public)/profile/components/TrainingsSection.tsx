"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit2, Save, X, Plus, Trash2, CheckCircle, Clock } from 'lucide-react'

interface Training {
  id: string
  name: string
  provider: string
  status: 'completed' | 'required'
  completionDate?: string
  dueDate?: string
}

export default function TrainingsSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [trainings, setTrainings] = useState<Training[]>([
    { id: '1', name: 'Company Onboarding', provider: 'HR Department', status: 'completed', completionDate: '2024-01-20' },
    { id: '2', name: 'Compliance Training', provider: 'Legal Department', status: 'completed', completionDate: '2024-02-01' },
    { id: '3', name: 'Advanced TypeScript', provider: 'Coursera', status: 'required', dueDate: '2026-06-30' },
    { id: '4', name: 'Leadership Development', provider: 'LinkedIn Learning', status: 'required', dueDate: '2026-12-31' },
  ])
  const [newTraining, setNewTraining] = useState({ name: '', provider: '', status: 'required', completionDate: '', dueDate: '' })

  const handleAddTraining = () => {
    if (newTraining.name && newTraining.provider) {
      setTrainings([...trainings, { id: Date.now().toString(), name: newTraining.name, provider: newTraining.provider, status: newTraining.status as 'completed' | 'required', completionDate: newTraining.completionDate, dueDate: newTraining.dueDate }])
      setNewTraining({ name: '', provider: '', status: 'required', completionDate: '', dueDate: '' })
    }
  }

  const handleRemoveTraining = (id: string) => {
    setTrainings(trainings.filter((training) => training.id !== id))
  }

  const completedTrainings = trainings.filter((t) => t.status === 'completed')
  const requiredTrainings = trainings.filter((t) => t.status === 'required')

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} size="sm">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Completed Trainings */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Completed Trainings ({completedTrainings.length})
        </h3>

        {completedTrainings.length === 0 ? (
          <Card className="p-4 text-center text-muted-foreground">
            No completed trainings
          </Card>
        ) : (
          <div className="space-y-3">
            {completedTrainings.map((training) => (
              <Card key={training.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{training.name}</p>
                  <p className="text-sm text-muted-foreground">{training.provider}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Completed: {training.completionDate ? new Date(training.completionDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTraining(training.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Required Trainings */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          Required Trainings ({requiredTrainings.length})
        </h3>

        {requiredTrainings.length === 0 ? (
          <Card className="p-4 text-center text-muted-foreground">
            No required trainings
          </Card>
        ) : (
          <div className="space-y-3">
            {requiredTrainings.map((training) => (
              <Card key={training.id} className="p-4 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{training.name}</p>
                    <p className="text-sm text-muted-foreground">{training.provider}</p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Due: {training.dueDate ? new Date(training.dueDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTraining(training.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add New Training */}
      {isEditing && (
        <Card className="p-4 md:p-6 border-dashed border-2">
          <h3 className="font-semibold mb-4">Add New Training</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Training Name"
                value={newTraining.name}
                onChange={(e) => setNewTraining({ ...newTraining, name: e.target.value })}
              />
              <Input
                placeholder="Provider"
                value={newTraining.provider}
                onChange={(e) => setNewTraining({ ...newTraining, provider: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newTraining.status}
                onChange={(e) => setNewTraining({ ...newTraining, status: e.target.value as 'completed' | 'required' })}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                <option value="completed">Completed</option>
                <option value="required">Required</option>
              </select>

              <Input
                type="date"
                placeholder="Completion Date"
                value={newTraining.completionDate}
                onChange={(e) => setNewTraining({ ...newTraining, completionDate: e.target.value })}
              />

              <Input
                type="date"
                placeholder="Due Date"
                value={newTraining.dueDate}
                onChange={(e) => setNewTraining({ ...newTraining, dueDate: e.target.value })}
              />
            </div>

            <Button onClick={handleAddTraining} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Training
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
