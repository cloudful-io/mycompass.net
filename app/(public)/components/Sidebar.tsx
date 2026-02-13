"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, Briefcase, Plane, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    id: 'my-leave',
    label: 'My Leave',
    href: '/leave',
    icon: Calendar,
  },
  {
    id: 'my-assignment',
    label: 'My Assignment',
    href: '/assignment',
    icon: Briefcase,
  },
  {
    id: 'my-travel',
    label: 'My Travel',
    href: '/travel',
    icon: Plane,
  },
  {
    id: 'my-profile',
    label: 'My Profile',
    href: '/profile',
    icon: User,
  },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname.startsWith(href)
  }

  return (
    <div className={cn(
      'bg-background border-r transition-all duration-300 flex flex-col h-screen sticky top-0',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      {/* Toggle Button */}
      <div className="flex items-center justify-end p-4 border-b">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-accent rounded-md transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Section */}
      <div className="flex-1 p-4">
        {/* HOME Header */}
        {!isCollapsed && (
          <h2 className="text-sm font-bold text-foreground/70 mb-4 px-2">HOME</h2>
        )}

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.id}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
                  active && 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
