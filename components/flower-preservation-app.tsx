"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, Upload, Flower2, CheckCircle, ArrowRight, Flower, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Frame types
type FrameType = {
  id: number
  name: string
  image: string
  description: string
}

// Available frames
const frames: FrameType[] = [
  {
    id: 1,
    name: "Classic Rectangle",
    image: "/frames/1.png",
    description: "Timeless wooden frame with a natural finish, perfect for any decor."
  },
  {
    id: 2,
    name: "Elegant Circle",
    image: "/frames/2.png",
    description: "Warm-toned circular frame that adds a unique touch to your preserved memories."
  }
]

export default function FlowerPreservationApp() {
  // Step tracking (1: Upload, 2: Select frame, 3: Preview result)
  const [currentStep, setCurrentStep] = useState(1)

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [preservedImage, setPreservedImage] = useState<string | null>(null)
  const [showPreserved, setShowPreserved] = useState(false)
  const [showOrderButton, setShowOrderButton] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        setShowPreserved(false)
        setShowOrderButton(false)
        setError(null)
        setSelectedFrame(1) // Default to first frame
        setCurrentStep(2) // Move to frame selection step
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePreserveClick = async () => {
    if (uploadedImage && selectedFrame) {
      setIsProcessing(true)
      setError(null)

      try {
        // Convert data URL to Blob
        const response = await fetch(uploadedImage)
        const imageBlob = await response.blob()

        // Get the correct file type from the blob
        const fileType = imageBlob.type

        // Ensure we have a supported file type
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(fileType)) {
          throw new Error(`Unsupported file type: ${fileType}. Please use JPEG, PNG, or WebP images.`)
        }

        // Get appropriate file extension
        const extension = fileType.split('/')[1]

        // Create FormData and append the blob with correct file type
        const formData = new FormData()
        formData.append("image", imageBlob, `flower.${extension}`)

        // Add selected frame as a parameter
        formData.append("frameType", selectedFrame.toString())

        // Call our API endpoint
        const apiResponse = await fetch("/api/preserve-flower", {
          method: "POST",
          body: formData,
        })

        const result = await apiResponse.json()

        if (!apiResponse.ok) {
          throw new Error(result.error || "Failed to process image")
        }

        if (result.imageData) {
          // Create a data URL from the base64 string
          const dataUrl = `data:image/png;base64,${result.imageData}`
          setPreservedImage(dataUrl)
          setShowPreserved(true)
          setShowOrderButton(true)
          setCurrentStep(3) // Move to result preview step
        } else {
          throw new Error("No image data returned")
        }
      } catch (err: any) {
        console.error("Error preserving flower:", err)
        setError(err.message || "Failed to preserve flower. Please try again.")
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleOrderNow = () => {
    alert("Thank you for your order! We'll contact you soon to complete your purchase.")
  }

  const selectFrame = (frameId: number) => {
    setSelectedFrame(frameId)
  }

  const resetApp = () => {
    setUploadedImage(null)
    setPreservedImage(null)
    setShowPreserved(false)
    setShowOrderButton(false)
    setError(null)
    setSelectedFrame(null)
    setCurrentStep(1)
  }

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`h-1 w-12 ${currentStep >= 2 ? 'bg-rose-500' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`h-1 w-12 ${currentStep >= 3 ? 'bg-rose-500' : 'bg-gray-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        </div>
        <div className="flex items-center justify-center text-sm text-gray-600">
          <div className="w-24 text-center">Upload</div>
          <div className="w-24 text-center">Choose Frame</div>
          <div className="w-24 text-center">Preview</div>
        </div>
      </div>
    )
  }

  // Step 1: Upload Photo Screen
  const renderUploadStep = () => {
    return (
      <Card className="border-dashed border-2 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div
            className="w-full py-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center mb-6 animate-pulse">
              <Upload className="h-10 w-10 text-rose-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">Upload Your Flower Photo</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Select a clear photo of your flowers to create a beautiful preserved keepsake
            </p>
            <Button className="bg-rose-500 hover:bg-rose-600">
              Select Photo
            </Button>
            <p className="text-gray-400 text-sm mt-4">Supported formats: JPG, PNG, WebP</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </CardContent>
      </Card>
    )
  }

  // Step 2: Frame Selection Screen
  const renderFrameSelectionStep = () => {
    if (!uploadedImage) return null

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Preview of uploaded image */}
          <div className="w-full md:w-1/2">
            <Card className="bg-white/90 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Your Uploaded Photo</h3>
                <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-lg shadow-sm border border-gray-100">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded flower"
                    fill
                    className="object-contain"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setCurrentStep(1)}
                >
                  Change Photo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Frame selection */}
          <div className="w-full md:w-1/2">
            <Card className="bg-white/90 shadow-sm h-full">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Choose Your Frame Style</h3>
                <div className="space-y-4">
                  {frames.map((frame) => (
                    <div
                      key={frame.id}
                      onClick={() => selectFrame(frame.id)}
                      className={`cursor-pointer transition-all p-4 rounded-lg ${selectedFrame === frame.id
                        ? 'bg-rose-50 border border-rose-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                        }`}
                    >
                      <div className="flex items-center">
                        <div className="relative h-20 w-20 mr-4 overflow-hidden">
                          <Image
                            src={frame.image}
                            alt={frame.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{frame.name}</h4>
                          <p className="text-sm text-gray-600">{frame.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 ${selectedFrame === frame.id
                          ? 'border-rose-500 bg-rose-500 text-white flex items-center justify-center'
                          : 'border-gray-300'
                          }`}>
                          {selectedFrame === frame.id && <CheckCircle className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handlePreserveClick}
                    className="w-full bg-rose-500 hover:bg-rose-600 shadow-sm"
                    disabled={isProcessing || !selectedFrame}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Preserve My Flower <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Result Preview Screen
  const renderResultPreviewStep = () => {
    if (!preservedImage) return null

    return (
      <div className="animate-fade-in">
        <Card className="border bg-white/90 backdrop-blur-sm overflow-hidden shadow-md">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Preserved Flower</h2>
              <p className="text-gray-600">Your flowers have been beautifully preserved in your chosen frame</p>
            </div>

            <div className="relative w-full h-80 sm:h-96 md:h-[500px] mb-8 overflow-hidden rounded-lg border border-gray-100 shadow-sm">
              <Image
                src={preservedImage}
                alt="Preserved flower"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Button
                variant="outline"
                onClick={resetApp}
                className="order-2 md:order-1 w-full md:w-auto"
              >
                Create Another
              </Button>

              <Button
                onClick={handleOrderNow}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all group order-1 md:order-2 w-full md:w-auto"
              >
                Order This Preserved Frame
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <p className="text-center text-gray-500 mt-6 text-sm">
              Your preserved flower frame will be handcrafted with care and delivered to your doorstep.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main content area */}
      <div className="space-y-8">
        {/* Step indicator */}
        {renderStepIndicator()}

        {/* Content based on current step */}
        {currentStep === 1 && renderUploadStep()}
        {currentStep === 2 && renderFrameSelectionStep()}
        {currentStep === 3 && renderResultPreviewStep()}
      </div>

      {/* Benefits section */}
      <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-center mb-10 text-gray-800">Why Choose Our Preservation Service?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 mx-auto">
              <Flower className="h-8 w-8 text-rose-500" />
            </div>
            <h4 className="font-medium text-lg mb-2 text-gray-800">Lasting Memories</h4>
            <p className="text-gray-600">
              Preserve special moments forever with our professionally framed flower preservation technique.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 mx-auto">
              <Flower className="h-8 w-8 text-rose-500" />
            </div>
            <h4 className="font-medium text-lg mb-2 text-gray-800">Elegant Decor</h4>
            <p className="text-gray-600">Transform your flowers into stunning art pieces that enhance your home's beauty.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4 mx-auto">
              <Flower className="h-8 w-8 text-rose-500" />
            </div>
            <h4 className="font-medium text-lg mb-2 text-gray-800">Perfect Gifts</h4>
            <p className="text-gray-600">Create meaningful keepsakes for weddings, anniversaries, or any special occasion.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
