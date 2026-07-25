import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer for S3
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique file name
    const fileName = `archive-uploads/${Date.now()}-${file.name.replace(/\s/g, '_')}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || "mohamed-said-digital-archive",
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);

    return NextResponse.json({ 
      success: true, 
      message: "File uploaded successfully",
      path: fileName
    });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
