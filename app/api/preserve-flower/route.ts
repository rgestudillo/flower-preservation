import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import fs from "fs";
import path from "path";
import os from "os";

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        // Get form data (multipart/form-data)
        const formData = await request.formData();
        const imageFile = formData.get("image") as File;
        const frameTypeStr = formData.get("frameType") as string || "1";
        const frameType = parseInt(frameTypeStr, 10);

        if (!imageFile) {
            return NextResponse.json(
                { error: "No image file provided" },
                { status: 400 }
            );
        }

        // Check if file has a valid mimetype
        const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validMimeTypes.includes(imageFile.type)) {
            return NextResponse.json(
                {
                    error: "Invalid file type",
                    details: `File type '${imageFile.type}' is not supported. Supported types are: ${validMimeTypes.join(', ')}`
                },
                { status: 400 }
            );
        }

        // Get the frame image path based on the selected frame type
        const frameFileName = `${frameType}.png`;
        const frameImagePath = path.join(process.cwd(), 'public', 'frames', frameFileName);

        // Check if the frame image exists
        if (!fs.existsSync(frameImagePath)) {
            return NextResponse.json(
                { error: `Selected frame image not found: ${frameFileName}` },
                { status: 404 }
            );
        }

        try {
            // Get image data
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Save the image temporarily
            const tempDir = os.tmpdir();
            const tempImagePath = path.join(tempDir, `flower-input-${Date.now()}.png`);
            fs.writeFileSync(tempImagePath, buffer);

            // Create an array of images as per documentation
            const images = await Promise.all([
                await toFile(fs.createReadStream(tempImagePath), null, {
                    type: imageFile.type,
                }),
                await toFile(fs.createReadStream(frameImagePath), null, {
                    type: "image/png",
                })
            ]);

            // Use the exact format from the documentation
            const response = await openai.images.edit({
                model: "gpt-image-1",
                image: images,
                prompt: `
Create a high-quality image of the actual flowers from the uploaded image, preserved in the provided frame. 
The preservation should resemble the flowers as closely as possible to their real-life appearance, capturing all the intricate details, colors, and textures of the flowers themselves. 
The frame provided should be used, showcasing its design, and the flowers should be encapsulated in a smooth resin finish. 
The final output should look like a polished, pressed flower artwork with perfect preservation, highlighting both the natural beauty of the flowers and the frame's features.
                `,
                size: "1024x1024",
                quality: "high",
            });

            // Clean up temp file
            if (fs.existsSync(tempImagePath)) {
                fs.unlinkSync(tempImagePath);
            }

            console.log(response);

            // Check for valid response
            if (!response.data || response.data.length === 0) {
                throw new Error("No valid image data returned from OpenAI");
            }

            // Get the base64 image data
            const imageBase64 = response.data[0].b64_json;

            if (!imageBase64) {
                throw new Error("No base64 image data returned from OpenAI");
            }

            // Return the generated image data
            return NextResponse.json({
                success: true,
                imageData: imageBase64,
                frameType: frameType
            });
        } catch (openaiError: any) {
            console.error("OpenAI API error:", openaiError);

            return NextResponse.json(
                {
                    error: "OpenAI processing error",
                    details: openaiError.message || "Unknown error",
                    status: openaiError.status
                },
                { status: openaiError.status || 500 }
            );
        }
    } catch (error: any) {
        console.error("Error processing image:", error);
        return NextResponse.json(
            {
                error: "Failed to process image",
                details: error.message || "Unknown error"
            },
            { status: 500 }
        );
    }
} 