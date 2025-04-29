import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import FlowerPreservationApp from "@/components/flower-preservation-app"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-green-50 to-rose-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Preserve Your Flowers Forever</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload a photo of your precious flowers and transform them into beautiful preserved frames that last a
              lifetime.
            </p>
          </div>

          <FlowerPreservationApp />
        </div>
      </main>
      <Footer />
    </div>
  )
}
