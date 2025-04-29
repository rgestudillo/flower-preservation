import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import FlowerPreservationApp from "@/components/flower-preservation-app"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-green-50 to-rose-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Preserve Your Flowers
              <span className="block text-rose-600">For a Lifetime</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your precious flowers into beautiful preserved artwork that captures
              their beauty forever. Perfect for weddings, anniversaries, or any special occasion.
            </p>
          </div>

          <FlowerPreservationApp />
        </div>
      </main>
      <Footer />
    </div>
  )
}
