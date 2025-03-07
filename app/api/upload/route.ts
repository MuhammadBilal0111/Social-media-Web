import { NextRequest, NextResponse } from "next/server";
import uploadImage from "@/lib/uploadthing";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const imageFile = formData.get("file") as unknown as File;
  const image = await uploadImage(imageFile, "threads");

  return NextResponse.json(image, { status: 201 });
};
