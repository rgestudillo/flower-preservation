"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, Upload, Flower2, CheckCircle, ArrowRight, Flower } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Frame types
type FrameType = {
  id: number
  name: string
  image: string
}

// Available frames
const frames: FrameType[] = [
  {
    id: 1,
    name: "Rectangular Wood",
    image: "/frames/1.png"
  },
  {
    id: 2,
    name: "Circular Wood",
    image: "/frames/2.png"
  }
]

export default function FlowerPreservationApp() {
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

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="upload" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8 p-1">
          <TabsTrigger value="upload" className="text-sm sm:text-base">
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </TabsTrigger>
          <TabsTrigger value="camera" className="text-sm sm:text-base">
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-8">
          <Card className="border-dashed border-2 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              {!uploadedImage ? (
                <>
                  <div
                    className="w-full h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-4 animate-pulse">
                      <Upload className="h-8 w-8 text-rose-400" />
                    </div>
                    <p className="text-gray-700 mb-2 font-medium">Click to upload your flower photo</p>
                    <p className="text-gray-400 text-sm">JPG, PNG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              ) : (
                <div className="w-full">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded flower"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Frame Selection */}
                  {uploadedImage && !showPreserved && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Select a Frame Style</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {frames.map((frame) => (
                          <div
                            key={frame.id}
                            onClick={() => selectFrame(frame.id)}
                            className={`cursor-pointer transition-all p-2 rounded-lg border-2 ${selectedFrame === frame.id
                              ? 'border-rose-500 bg-rose-50'
                              : 'border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            <div className="relative h-32 mb-2 overflow-hidden">
                              <Image
                                src={frame.image}
                                alt={frame.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <p className="text-sm font-medium">{frame.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUploadedImage(null)
                        setPreservedImage(null)
                        setShowPreserved(false)
                        setShowOrderButton(false)
                        setError(null)
                        setSelectedFrame(null)
                      }}
                    >
                      Upload Different Photo
                    </Button>
                    {!showPreserved && (
                      <Button
                        onClick={handlePreserveClick}
                        className="bg-rose-500 hover:bg-rose-600 shadow-sm hover:shadow-md transition-all"
                        disabled={isProcessing || !selectedFrame}
                      >
                        {isProcessing ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Flower2 className="h-4 w-4 mr-2" />
                            Preserve This Flower
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {showPreserved && preservedImage && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                Your Preserved Flower
              </h2>
              <Card className="border bg-white/80 backdrop-blur-sm overflow-hidden shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="relative w-full h-80 sm:h-96 md:h-[400px] mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={preservedImage || "/placeholder.svg"}
                      alt="Preserved flower"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {showOrderButton && (
                    <div className="text-center">
                      <Button
                        onClick={handleOrderNow}
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 h-auto shadow-md hover:shadow-lg transition-all group"
                      >
                        Order Now
                        <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <p className="text-gray-500 mt-4 text-sm">
                        Your preserved flower will be carefully framed and shipped to your doorstep.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="camera" className="space-y-6">
          <Card className="border-dashed border-2 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-full h-64 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-700 mb-2 font-medium">Camera functionality coming soon</p>
                <p className="text-gray-400 text-sm">Please use the upload option for now</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-center mb-8">Why Preserve Your Flowers?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <Flower className="h-6 w-6 text-rose-500" />
              </div>
              <h4 className="font-medium text-lg mb-2">Lasting Memories</h4>
              <p className="text-gray-600 text-sm">
                Keep your special moments alive forever with beautifully preserved flowers.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <Flower className="h-6 w-6 text-rose-500" />
              </div>
              <h4 className="font-medium text-lg mb-2">Elegant Decor</h4>
              <p className="text-gray-600 text-sm">Transform your flowers into stunning art pieces for your home.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <Flower className="h-6 w-6 text-rose-500" />
              </div>
              <h4 className="font-medium text-lg mb-2">Perfect Gifts</h4>
              <p className="text-gray-600 text-sm">Create meaningful gifts that will be cherished for generations.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
