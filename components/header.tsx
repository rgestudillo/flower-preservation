"use client"

import { useState } from "react"
import Link from "next/link"
import { Flower, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full py-4 bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Flower className="h-6 w-6 text-rose-500 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-xl font-bold text-gray-800">Bloom Forever</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-rose-500 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-rose-500 transition-colors relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-rose-500 transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-rose-500 transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-500 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex">
              Sign In
            </Button>
            <Button className="bg-rose-500 hover:bg-rose-600 shadow-sm hover:shadow-md transition-all">
              Get Started
            </Button>
            <button
              className="md:hidden text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-sm border-b shadow-lg transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none",
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
          <Link
            href="/"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="/how-it-works"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Button variant="outline" className="mt-2">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  )
}
