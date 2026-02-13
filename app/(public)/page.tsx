import Link from 'next/link'
import { Calendar, Briefcase, Plane, User } from 'lucide-react'
import { Card } from '@/components/ui/card'

const menuItems = [
  {
    id: 'my-leave',
    label: 'My Leave',
    description: 'Manage your leave requests and balance',
    href: '/leave',
    icon: Calendar,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'my-assignment',
    label: 'My Assignment',
    description: 'View and track your assignments',
    href: '/assignment',
    icon: Briefcase,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'my-travel',
    label: 'My Travel',
    description: 'Organize your travel itineraries',
    href: '/travel',
    icon: Plane,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'my-profile',
    label: 'My Profile',
    description: 'View and edit your profile information',
    href: '/profile',
    icon: User,
    color: 'from-orange-500 to-orange-600',
  },
]

export default function HomePage() {
  return (
    <div className="w-full h-full p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Welcome back, Willis Yarborough!</h1>
        <p className="text-muted-foreground mb-6">Select an option below to get started:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.id} href={item.href}>
                <Card className="h-full p-8 cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                  <div className={`bg-gradient-to-br ${item.color} rounded-lg p-8 mb-6 flex items-center justify-center h-32 w-full`}>
                    <Icon className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{item.label}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
