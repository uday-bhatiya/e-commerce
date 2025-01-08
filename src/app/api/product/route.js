import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import connectDb from "../../../lib/mongoose";
import cloudinary from "../../../lib/cloudinary";
import fs from 'fs/promises';
import path from 'path';
import ProductModel from "../../../models/product.model";
import UserModel from "../../../models/user.model";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing
  },
};

// Helper function to convert Fetch `Request` to Node.js `IncomingMessage`
const convertNextJsRequestToNodeStream = async (request) => {
  const { Readable } = await import("stream");
  const body = await request.arrayBuffer(); // Read request body
  const stream = new Readable();
  stream.push(Buffer.from(body)); // Push the body into the stream
  stream.push(null); // End the stream
  return Object.assign(stream, {
    headers: Object.fromEntries(request.headers.entries()),
    method: request.method,
    url: request.url,
  });
};

// Parse the form using formidable
const parseForm = async (req) => {
  const form = new IncomingForm({
    keepExtensions: true,
    uploadDir: "./public/uploads",
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        // Parse JSON fields if needed
        Object.keys(fields).forEach((key) => {
          try {
            fields[key] = JSON.parse(fields[key]);
          } catch (error) {
            // If parsing fails, keep the original value
          }
        });
        resolve({ fields, files });
      }
    });
  });
};

export async function POST(req) {
  await connectDb();

  try {
    // Convert the Next.js request to a Node.js stream
    const nodeReq = await convertNextJsRequestToNodeStream(req);

    // Parse the form
    const { fields, files } = await parseForm(nodeReq);

    const uploadImage = {};

    // Upload image to Cloudinary
    if (files.image && files.image[0]) {
      const imagePath = path.join(process.cwd(), `public/uploads/${files.image[0].newFilename}`);
      const imageUploadResult = await cloudinary.uploader.upload(imagePath, {
        folder: 'ecommerce/products',
      });

      const user = await UserModel.findOne({ email: fields?.data?.userEmail});

      const newProduct = new ProductModel({
        title: fields?.data?.title,
        price: fields?.data?.price,
        desription: fields?.data?.description,
        about: fields?.data?.about || '',
        category: fields?.data?.category,
        imageUrl: imageUploadResult?.url,
        message: fields?.data?.message,
        createdBy: fields?.data?.userEmail,
        createdById: user?._id
      });

      await newProduct.save();

      // Delete the local file after upload
      await fs.unlink(imagePath);

      return NextResponse.json({
        success: true,
        message: 'Product added successfully!',
        data: newProduct,
      });

    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function GET(req) {
  const { searchParams } = new  URL(req.url);
  const email = searchParams.get('email');

  const response = await ProductModel.find({createdBy: email}).populate({
    path: 'createdById'
  })
  // const sortedResponse = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return NextResponse.json({ response });
}