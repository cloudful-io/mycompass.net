"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit2, Save, X, Plus, Trash2, Trophy } from 'lucide-react'

interface Award {
  id: string
  name: string
  issuer: string
  awardDate: string
  description: string
}

export default function AwardsSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [awards, setAwards] = useState<Award[]>([
    {
      id: '1',
      name: 'Employee of the Quarter',
      issuer: 'Company Management',
      awardDate: '2024-03-31',
      description: 'Recognized for exceptional performance and leadership',
    },
    {
      id: '2',
      name: 'Innovation Award',
      issuer: 'Engineering Department',
      awardDate: '2023-12-15',
      description: 'Best process improvement initiative',
    },
  ])
  const [newAward, setNewAward] = useState({ name: '', issuer: '', awardDate: '', description: '' })

  const handleAddAward = () => {
    if (newAward.name && newAward.issuer && newAward.awardDate) {
      setAwards([...awards, { id: Date.now().toString(), ...newAward }])
      setNewAward({ name: '', issuer: '', awardDate: '', description: '' })
    }
  }

  const handleRemoveAward = (id: string) => {
    setAwards(awards.filter((award) => award.id !== id))
  }

  const handleUpdateAward = (id: string, field: string, value: string) => {
    setAwards(awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)))
  }

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

      {/* Awards List */}
      <div className="space-y-4">
        {awards.length === 0 ? (
          <Card className="p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No awards yet</p>
          </Card>
        ) : (
          awards.map((award) => (
            <Card key={award.id} className="p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <h3 className="text-lg font-bold">{award.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{award.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(award.awardDate).toLocaleDateString()}
                    </p>
                  </div>

                  {isEditing && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveAward(award.id)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {award.description && (
                  <p className="text-sm text-foreground">{award.description}</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add New Award */}
      {isEditing && (
        <Card className="p-4 md:p-6 border-dashed border-2">
          <h3 className="font-semibold mb-4">Add New Award</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="awardName" className="text-sm">
                  Award Name
                </Label>
                <Input
                  id="awardName"
                  placeholder="Award Name"
                  value={newAward.name}
                  onChange={(e) => setNewAward({ ...newAward, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="awardIssuer" className="text-sm">
                  Issuer
                </Label>
                <Input
                  id="awardIssuer"
                  placeholder="Issuer"
                  value={newAward.issuer}
                  onChange={(e) => setNewAward({ ...newAward, issuer: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="awardDate" className="text-sm">
                  Award Date
                </Label>
                <Input
                  id="awardDate"
                  type="date"
                  value={newAward.awardDate}
                  onChange={(e) => setNewAward({ ...newAward, awardDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="awardDescription" className="text-sm">
                Description
              </Label>
              <textarea
                id="awardDescription"
                placeholder="Award description"
                value={newAward.description}
                onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm bg-background"
                rows={3}
              />
            </div>

            <Button onClick={handleAddAward} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Award
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
