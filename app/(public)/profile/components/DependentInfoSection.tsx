"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react'

interface Dependent {
  id: string
  name: string
  relation: string
  birthDate: string
}

export default function DependentInfoSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [dependents, setDependents] = useState<Dependent[]>([
    { id: '1', name: 'Jane Doe', relation: 'Spouse', birthDate: '1992-08-20' },
    { id: '2', name: 'Jack Doe', relation: 'Son', birthDate: '2015-03-10' },
    { id: '3', name: 'Jill Doe', relation: 'Daughter', birthDate: '2018-07-05' },
  ])
  const [newDependent, setNewDependent] = useState({ name: '', relation: '', birthDate: '' })

  const handleAddDependent = () => {
    if (newDependent.name && newDependent.relation && newDependent.birthDate) {
      setDependents([...dependents, { id: Date.now().toString(), ...newDependent }])
      setNewDependent({ name: '', relation: '', birthDate: '' })
    }
  }

  const handleRemoveDependent = (id: string) => {
    setDependents(dependents.filter((dep) => dep.id !== id))
  }

  const handleUpdateDependent = (id: string, field: string, value: string) => {
    setDependents(
      dependents.map((dep) => (dep.id === id ? { ...dep, [field]: value } : dep))
    )
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

      {/* Dependents List */}
      <div className="space-y-4">
        {dependents.map((dependent) => (
          <Card key={dependent.id} className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={dependent.name}
                    onChange={(e) => handleUpdateDependent(dependent.id, 'name', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs">Relation</Label>
                  <select
                    value={dependent.relation}
                    onChange={(e) => handleUpdateDependent(dependent.id, 'relation', e.target.value)}
                    disabled={!isEditing}
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm bg-background disabled:opacity-50"
                  >
                    <option>Spouse</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Parent</option>
                    <option>Sibling</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs">Birth Date</Label>
                  <Input
                    type="date"
                    value={dependent.birthDate}
                    onChange={(e) => handleUpdateDependent(dependent.id, 'birthDate', e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>

              {isEditing && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveDependent(dependent.id)}
                  className="md:flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Dependent */}
      {isEditing && (
        <Card className="p-4 md:p-6 border-dashed border-2">
          <h3 className="font-semibold mb-4">Add New Dependent</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="newName" className="text-sm">
                Name
              </Label>
              <Input
                id="newName"
                value={newDependent.name}
                onChange={(e) => setNewDependent({ ...newDependent, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="newRelation" className="text-sm">
                Relation
              </Label>
              <select
                id="newRelation"
                value={newDependent.relation}
                onChange={(e) => setNewDependent({ ...newDependent, relation: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                <option value="">Select relation</option>
                <option>Spouse</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Parent</option>
                <option>Sibling</option>
              </select>
            </div>

            <div>
              <Label htmlFor="newBirthDate" className="text-sm">
                Birth Date
              </Label>
              <Input
                id="newBirthDate"
                type="date"
                value={newDependent.birthDate}
                onChange={(e) => setNewDependent({ ...newDependent, birthDate: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={handleAddDependent} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Dependent
          </Button>
        </Card>
      )}
    </div>
  )
}
