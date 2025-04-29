import Link from "next/link"
import { Flower, Instagram, Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <Flower className="h-6 w-6 text-rose-500 transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-xl font-bold text-gray-800">Sushi Flowers</span>
            </div>
            <p className="text-gray-600 text-sm">Preserving your precious moments through beautiful flower frames.</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition-colors hover:scale-110 transform duration-200"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition-colors hover:scale-110 transform duration-200"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition-colors hover:scale-110 transform duration-200"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-rose-500 transition-colors hover:scale-110 transform duration-200"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-rose-500 transition-colors text-sm flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-2"></span>
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get updates on new frame designs and special offers.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-white" />
              <Button className="bg-rose-500 hover:bg-rose-600 shrink-0 shadow-sm hover:shadow-md transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sushi Flowers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
