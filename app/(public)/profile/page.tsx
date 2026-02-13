"use client"

import { useState } from 'react'
import { User } from 'lucide-react'
import BasicInfoSection from './components/BasicInfoSection'
import ContactInfoSection from './components/ContactInfoSection'
import DependentInfoSection from './components/DependentInfoSection'
import QualificationsSection from './components/QualificationsSection'
import TrainingsSection from './components/TrainingsSection'
import AwardsSection from './components/AwardsSection'

type TabType = 'basic' | 'contact' | 'dependent' | 'qualifications' | 'trainings' | 'awards'

const tabs: { id: TabType; label: string }[] = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'contact', label: 'Contact' },
  { id: 'dependent', label: 'Dependents' },
  { id: 'qualifications', label: 'Qualifications' },
  { id: 'trainings', label: 'Trainings' },
  { id: 'awards', label: 'Awards' },
]

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('basic')

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoSection />
      case 'contact':
        return <ContactInfoSection />
      case 'dependent':
        return <DependentInfoSection />
      case 'qualifications':
        return <QualificationsSection />
      case 'trainings':
        return <TrainingsSection />
      case 'awards':
        return <AwardsSection />
      default:
        return null
    }
  }

  return (
    <div className="w-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <User className="w-8 h-8" />
            My Profile
          </h1>
          <p className="text-muted-foreground">Manage your personal and professional information</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b overflow-x-auto">
          <div className="flex gap-1 md:gap-2 min-w-min md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-3 md:px-4 font-medium text-sm md:text-base whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-96">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
