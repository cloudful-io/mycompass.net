"use client"

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/shared/logo'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { Menu, X, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function HeaderClient() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    cn(
      'inline-flex items-center h-8 leading-none text-primary hover:text-primary/90 transition-colors',
      isActive(href) && 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold px-3 rounded-md'
    )

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <div className="flex items-center">
          <Logo size="large" link image />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            <Link href="/" className={linkClass('/')} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
          </nav>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center justify-center cursor-pointer" aria-label="User menu">
                <span className="text-white font-semibold text-sm">JD</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">My Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-popover/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 bg-background p-4 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <Logo size="medium" link/>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setOpen(false)} className={cn('flex items-center h-10', linkClass('/'))} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
            </nav>

            <div className="mt-6">
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
