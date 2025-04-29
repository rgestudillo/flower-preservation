"use client"

import { useState } from "react"
import Link from "next/link"
import { Flower, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Flower className="h-6 w-6 text-rose-600" />
            <span className="text-2xl font-semibold text-rose-600">Sushi Flowers</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:inline-flex border-rose-600 text-rose-600 hover:bg-rose-50">
              Sign In
            </Button>
            <Button className="bg-rose-600 hover:bg-rose-700">
              Order Now
            </Button>
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
            href="/about"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/gallery"
            className="text-gray-700 hover:text-rose-500 transition-colors py-2 px-4 hover:bg-rose-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
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
