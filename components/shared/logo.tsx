"use client"

import { useTheme } from "next-themes"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function Logo({ size = "medium", className = "" }: LogoProps) {
  const { theme } = useTheme()

  const dimensions = {
    small: "h-6 w-6",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  }

  return (
    <img
      src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
      className={`${dimensions[size]} ${className}`}
      alt="Company Logo"
    />
  )
}
