"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit2, Save, X, Plus, Trash2, Award } from 'lucide-react'

interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
}

interface Skill {
  id: string
  name: string
  proficiency: string
}

export default function QualificationsSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon', issueDate: '2023-06-15', expiryDate: '2026-06-15' },
    { id: '2', name: 'Kubernetes Certified Application Developer', issuer: 'Linux Foundation', issueDate: '2022-12-01' },
  ])
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'Python', proficiency: 'Expert' },
    { id: '2', name: 'TypeScript', proficiency: 'Expert' },
    { id: '3', name: 'Kubernetes', proficiency: 'Advanced' },
    { id: '4', name: 'AWS', proficiency: 'Advanced' },
  ])

  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', issueDate: '', expiryDate: '' })
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: 'Intermediate' })

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.issueDate) {
      setCertifications([...certifications, { id: Date.now().toString(), ...newCertification }])
      setNewCertification({ name: '', issuer: '', issueDate: '', expiryDate: '' })
    }
  }

  const handleRemoveCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const handleAddSkill = () => {
    if (newSkill.name) {
      setSkills([...skills, { id: Date.now().toString(), ...newSkill }])
      setNewSkill({ name: '', proficiency: 'Intermediate' })
    }
  }

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
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

      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Award className="w-5 h-5" />
          Certifications
        </h3>

        {certifications.map((cert) => (
          <Card key={cert.id} className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs">Certification</Label>
                  <Input value={cert.name} disabled className="mt-1" />
                </div>

                <div>
                  <Label className="text-xs">Issuer</Label>
                  <Input value={cert.issuer} disabled className="mt-1" />
                </div>

                <div>
                  <Label className="text-xs">Issue Date</Label>
                  <Input type="date" value={cert.issueDate} disabled className="mt-1" />
                </div>

                <div>
                  <Label className="text-xs">Expiry Date</Label>
                  <Input type="date" value={cert.expiryDate || ''} disabled className="mt-1" />
                </div>
              </div>

              {isEditing && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveCertification(cert.id)}
                  className="md:flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}

        {isEditing && (
          <Card className="p-4 md:p-6 border-dashed border-2">
            <h4 className="font-semibold mb-4">Add New Certification</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Certification Name"
                value={newCertification.name}
                onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
              />
              <Input
                placeholder="Issuer"
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
              />
              <Input
                type="date"
                value={newCertification.issueDate}
                onChange={(e) => setNewCertification({ ...newCertification, issueDate: e.target.value })}
              />
              <Input
                type="date"
                placeholder="Expiry Date"
                value={newCertification.expiryDate}
                onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })}
              />
            </div>
            <Button onClick={handleAddCertification} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </Card>
        )}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Skills</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <Card key={skill.id} className="p-3 md:p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{skill.name}</p>
                <p className="text-xs text-muted-foreground">{skill.proficiency}</p>
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSkill(skill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </Card>
          ))}
        </div>

        {isEditing && (
          <Card className="p-4 md:p-6 border-dashed border-2">
            <h4 className="font-semibold mb-4">Add New Skill</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Skill Name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
              <select
                value={newSkill.proficiency}
                onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                className="px-3 py-2 border border-input rounded-md text-sm bg-background"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
              <Button onClick={handleAddSkill} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
